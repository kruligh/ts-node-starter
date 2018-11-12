import { credentialsError } from "src/api/errors";
import { LoginRequest } from "src/api/public/login";
import { createSession } from "src/core/session";
import { getUserWithPassword, Session, UserWithPassword } from "src/storage";


export const processLogin = async (loginRequest: LoginRequest): Promise<Session> => {
  const user = await getUserWithPassword(loginRequest.login);
  if (!user || !checkPassword(user, loginRequest.password)) {
    throw credentialsError();

  }
  const session = createSession(user);
  return session;
};

const checkPassword =
  (user: UserWithPassword, password: string): boolean => {
    return user.password === password; // heh
  };
