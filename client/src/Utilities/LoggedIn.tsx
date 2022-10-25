import { CookiesToken } from "./Cookies";

interface userLoggedIn {
  _id: string;
  fullname: string;
  email: string;
}

export const LoggedInCreate = (user: userLoggedIn): void => {
  localStorage.setItem(
    "loggedIn",
    JSON.stringify({
      userId: user._id,
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
  return JSON.parse(loggedIn);
};

export const LoggedInRemove = (): void => {
  localStorage.removeItem("loggedIn");
};