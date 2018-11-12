import { google, sheets_v4 } from "googleapis";
import { UserWithPassword } from "src/storage/model";
import { getSheetsConfig, googleApisAuth } from "src/storage/spreadsheet/config";
import Schema$ValueRange = sheets_v4.Schema$ValueRange;

const sheetsConfig = getSheetsConfig();

export const getUserWithPassword = async (login: string): Promise<UserWithPassword> => {
  const rawData = await getData(sheetsConfig.usersSheetId, 'A1:C100');
  const users: UserWithPassword[] = rawData.values.map((rawUser: string[]) => {
    return {
      login: rawUser[0],
      password: rawUser[1],
    };
  });

  return users.find((user) => user.login === login);
};

export const getData = async (spreadsheetId: string, range: string): Promise<Schema$ValueRange> => {
  const auth = await googleApisAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(
      { spreadsheetId, range },
      (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.data);
        }
      },
    );
  });
};
