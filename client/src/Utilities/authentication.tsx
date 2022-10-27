import { cookiesToken, cookiesRemove } from "./cookies";
import { loggedInRemove } from "./loggedIn";

export const authenticationToken = (): string => {
  const token = cookiesToken();
  return `Bearer ${token}`;
};

export const unauthorize = () => {
  loggedInRemove();
  cookiesRemove();
};
