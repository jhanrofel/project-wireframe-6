import { cookiesToken, cookiesRemove } from "./cookies";
import { loggedInRemove } from "./loggedIn";

export const AuthToken = (): string => {
  const token = cookiesToken();
  return `Bearer ${token}`;
};

export const Unauthorize = () => {
  loggedInRemove();
  cookiesRemove();
};
