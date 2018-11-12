import {Session} from "src/storage";
import {LoginResponse} from "./dtos";

export const toLoginResponse = (session: Session): LoginResponse => {
    return {
        token: session.token,
    };
};
