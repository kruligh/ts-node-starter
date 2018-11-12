import * as fs from "fs-extra";
import { google } from 'googleapis';
import * as readline from "readline";
import { log } from "src/lib/log";
import { GoogleApisConfig } from "src/storage/spreadsheet/model";

import { Credentials, OAuth2Client } from "google-auth-library";
import { UserWithPassword } from "./model";

export * from "./model";

export const getUserWithPassword = async (login: string): Promise<UserWithPassword> => {
  const auth = await authorize(await getGoogleApisConfig());

  const rawData = await getData(auth, '1dk7dkJYbs7p9MlgWmYNNH4b12bzJQP7pSKbd-fCriv0', 'Class Data!A2:E');

  console.log(rawData);
  return {
    login,
    password: "asd",
  };
};

const TOKEN_PATH = './secrets/googleapis/token.json';
const CONFIG_PATH = './secrets/googleapis/credentials.json';
const accessType = 'offline';
const scope = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export const authorize = async (
  { installed: { client_id: clientId, client_secret: secret, redirect_uris: redirectUris } }: GoogleApisConfig,
): Promise<OAuth2Client> => {
  const oAuth2Client = new google.auth.OAuth2(clientId, secret, redirectUris[0]);
  let token = await fs.readJson(TOKEN_PATH, {throws: false}).catch(() =>  undefined);
  if (!token) {
    token = await getNewToken(oAuth2Client);
    await storeNewToken(token);
  }
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
};

const getNewToken = async (oAuth2Client: OAuth2Client): Promise<Credentials> => {
  const authUrl = oAuth2Client.generateAuthUrl({ access_type: accessType, scope });

  log.warn('--------------- Google Api Authorization -----------------');
  log.warn('--------------- Google Api Authorization -----------------');
  log.warn('--------------- Google Api Authorization -----------------');
  log.warn('--------------- Google Api Authorization -----------------');
  log.warn('--------------- Google Api Authorization -----------------');
  log.warn('Authorize this app by visiting this url: ' + authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          log.error('Error while trying to retrieve access token', err);
          reject(err);
        }
        oAuth2Client.setCredentials(token);
        resolve(token);
      });
    });
  });
};

const storeNewToken = async (token: Credentials): Promise<void> => {
  await fs.writeJson(TOKEN_PATH, token);
};

export const getGoogleApisConfig = async (): Promise<GoogleApisConfig> => {
  return fs.readJson(CONFIG_PATH, { throws: false });
};

export const getData = (auth, spreadsheetId: string, range: string) => {
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
