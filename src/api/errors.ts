import { logStackTrace } from "src/lib/log";

export enum ApiErrorKind {
  UNKNOWN = "UKNOWN_ERROR",
  VALIDATION = "VALIDATION_ERROR",
  CREDENTIALS = "CREDENTIALS_ERROR",
}

export interface ApiError {
  kind: ApiErrorKind;
  message: string;
}

export const unknownError =
  (): ApiError => ({
    kind: ApiErrorKind.UNKNOWN,
    message: ``,
  });

export const validationError =
  (field: string, value?: any): ApiError => ({
    kind: ApiErrorKind.VALIDATION,
    message: `Field ${field} has invalid value ${value}`,
  });

export const credentialsError =
  (): ApiError => ({
    kind: ApiErrorKind.CREDENTIALS,
    message: ``,
  });

export const handleUnknownException = (err: Error): ApiError => {
  logStackTrace.error(err.stack);
  return unknownError();
};
