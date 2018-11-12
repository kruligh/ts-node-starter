import { nowIso, nowPlusHours } from "src/lib/date";
import { Session, UserWithPassword } from "src/storage";

let sessions: { [token: string]: Session } = {}; // rotfl, dont try this at home

export const createSession = (user: UserWithPassword): Session => {
  const session: Session = {
    userId: user.login,
    created: nowIso(),
    expires: nowPlusHours(24),
    token: generateToken(),
  };

  storeSession(session);

  return session;
};
const storeSession = (session: Session) => {
  sessions = {
    ...sessions,
    [session.token]: session,
  };
  console.log(sessions);
};

const generateToken = () => {
  // http://byronsalau.com/blog/how-to-create-a-guid-uuid-in-javascript
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
