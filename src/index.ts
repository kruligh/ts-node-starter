import * as bodyParser from "body-parser";
import * as express from "express";
import * as expressWinston from "express-winston";
import { ApiError, ApiErrorKind, handleUnknownException } from "src/api/errors";
import { expressLoggerOptions, log } from "src/lib/log";
import { publicRouter } from "./api/public";

// todo check google token

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.use(expressWinston.logger(expressLoggerOptions));

app.use('/public', publicRouter);

app.use((err, req, res, next) => {
  let apiError: ApiError;
  if (err.kind) {
    apiError = err;
  } else {
    apiError = handleUnknownException(err as Error);
  }

  if (apiError.kind === ApiErrorKind.CREDENTIALS) {
    res.status(403).send(apiError);
  } else {
    res.status(500).send(apiError);
  }
});

app.listen(port, () => log.info(`Example app listening on port ${port}!`));
