import { CookiesToken, CookiesRemove } from "./cookies";
import { LoggedInRemove } from "./loggedIn";

export const AuthToken = (): string => {
  const token = CookiesToken();
  return `Bearer ${token}`;
};

export const Unauthorize = () => {
  LoggedInRemove();
  CookiesRemove();
};
