import { google } from "googleapis";
import { googleApisAuth } from "src/storage/spreadsheet/config";

export const getData = async (spreadsheetId: string, range: string) => {
  const auth = await googleApisAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(
      { spreadsheetId, range },
      (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      },
    );
  });
};
