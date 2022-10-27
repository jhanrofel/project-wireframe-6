import { cookiesToken } from "./cookies";

interface userLoggedIn {
  id: string;
  fullname: string;
  email: string;
}

export const loggedInCreate = (user: userLoggedIn): void => {
  localStorage.setItem(
    "loggedIn",
    JSON.stringify({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    })
  );
};

export const isLogged = (): number => {
  const token = cookiesToken();
  return localStorage.getItem("loggedIn") && token ? 1 : 0;
};

export const loggedInData = (): userLoggedIn => {
  const loggedIn: string = localStorage.getItem("loggedIn") || "";
  const parseLoggedIn: userLoggedIn = JSON.parse(loggedIn);
  return parseLoggedIn;
};

export const loggedInRemove = (): void => {
  localStorage.removeItem("loggedIn");
};
