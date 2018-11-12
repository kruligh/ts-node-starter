import {IsoDate} from "src/lib/date";

export interface User {
    login: string;
}

export interface UserWithPassword extends User {
    password: string;
}

export interface Session {
    userId: string;
    token: string;
    created: IsoDate;
    expires: IsoDate;
}
