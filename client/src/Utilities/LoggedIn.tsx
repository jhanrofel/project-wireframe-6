import { CookiesToken } from "./cookies";

interface userLoggedIn {
  userId: string;
  fullname: string;
  email: string;
}

export const LoggedInCreate = (user: userLoggedIn): void => {
  localStorage.setItem(
    "loggedIn",
    JSON.stringify({
      userId: user.userId,
      fullname: user.fullname,
      email: user.email,
    })
  );
};

export const IsLogged = (): number => {
  const token = CookiesToken();
  return localStorage.getItem("loggedIn") && token ? 1 : 0;
};

export const LoggedIn = (): userLoggedIn => {
  const loggedIn: string = localStorage.getItem("loggedIn") || "";
  const parseLoggedIn:userLoggedIn = JSON.parse(loggedIn)
  return parseLoggedIn;
};

export const LoggedInRemove = (): void => {
  localStorage.removeItem("loggedIn");
};
