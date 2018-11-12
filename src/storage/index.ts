import { getData, getSheetsConfig } from "src/storage/spreadsheet";
import { UserWithPassword } from "./model";

export * from "./model";

const sheetsConfig = getSheetsConfig();

export const getUserWithPassword = async (login: string): Promise<UserWithPassword> => {

  const rawData = await getData(sheetsConfig.usersSheetId, 'A2:E');

  console.log(rawData);
  return {
    login,
    password: "asd",
  };
};

