import { validStrings } from "../../validators";
import { LoginRequest } from "./dtos";

export const getValidLoginRequest = (requestBody: any): LoginRequest => {
  validStrings(["login", "password"], requestBody);
  return requestBody as LoginRequest;
};
