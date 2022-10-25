import {CookiesToken} from "./cookies";

const AuthToken = () => {
  const token = CookiesToken();
  return `Bearer ${token}`;
};

export default AuthToken;