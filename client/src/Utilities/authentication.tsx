import { cookiesToken, cookiesRemove } from "./cookies";
import { LoggedInRemove } from "./loggedIn";

export const AuthToken = (): string => {
  const token = cookiesToken();
  return `Bearer ${token}`;
};

export const Unauthorize = () => {
  LoggedInRemove();
  cookiesRemove();
};
