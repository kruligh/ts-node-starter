import * as fs from "fs-extra";
import { Credentials } from "google-auth-library";
import { OAuth2Client } from "google-auth-library";
import { google } from 'googleapis';
import * as readline from "readline";
import { MILISECONDS_DAY, nowMili } from "src/lib/date";

import { log } from "src/lib/log";
import { GoogleApisConfig } from "src/storage/spreadsheet/model";

export type GoogleApisToken = Credentials;

const CONFIG_PATH = './secrets/googleapis/credentials.json';
const TOKEN_PATH = './secrets/googleapis/token.json';
const SHEETS_CONFIG_PATH = './secrets/googleapis/sheets.json';
const accessType = 'offline';
const scope = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export interface SheetsConfig {
  usersSheetId: string;
}

export const getSheetsConfig = () => fs.readJSONSync(SHEETS_CONFIG_PATH) as SheetsConfig;

let auth: OAuth2Client;
export const googleApisAuth = async () => {
  if (!auth) {
    log.info('Authorizing google auth');
    auth = await authorize(await getGoogleApisConfig());
  } else {
    log.info('Googleapis authorized');
  }

  return auth;
};

export const getGoogleApisConfig = async (): Promise<GoogleApisConfig> => {
  return fs.readJson(CONFIG_PATH, { throws: false });
};

export const getToken = async (): Promise<GoogleApisToken> => {
  return fs.readJson(TOKEN_PATH, { throws: false });
};

export const storeToken = async (token: GoogleApisToken): Promise<void> => {
  await fs.writeJson(TOKEN_PATH, token);
};

export const authorize = async (
  { installed: { client_id: clientId, client_secret: secret, redirect_uris: redirectUris } }: GoogleApisConfig,
): Promise<OAuth2Client> => {
  const oAuth2Client = new google.auth.OAuth2(clientId, secret, redirectUris[0]);
  let token = await getToken();
  if (!token || (token.expiry_date! * 1000) - nowMili() < MILISECONDS_DAY) {
    token = await getNewToken(oAuth2Client);
    await storeToken(token);
  }
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
};

const getNewToken = (oAuth2Client: OAuth2Client): Promise<GoogleApisToken> => {
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
        resolve(token);
      });
    });
  });
};


