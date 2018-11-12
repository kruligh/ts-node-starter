import * as express from "express";
import { asyncMiddleware } from "src/api/utils";
import { processLogin } from "src/core/account/login";
import { getValidLoginRequest } from "./login";
import { toLoginResponse } from "./login/transformers";

export const publicRouter = express.Router()
  .post("/login", asyncMiddleware(async (req, res) => {
    const loginRequest = getValidLoginRequest(req.body);
    const loginResponse = toLoginResponse(await processLogin(loginRequest));
    res.send(loginResponse);
  }));

