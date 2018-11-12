import {validationError} from "./errors";

export const validStrings = (fields: string[], requestBody: any) => {
    fields.forEach((field) => {
        if (!requestBody[field]) {
            throw validationError(field);
        }
    });
};

