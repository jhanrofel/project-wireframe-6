import cookie from 'react-cookies';

export const CookiesCreate = (token:string):void => {
  cookie.save("projwftoken",token, {path:"/"});
};

export const CookiesToken = ():string => {
  return cookie.load('projwftoken');
};

export const CookiesRemove = ():void => {
  cookie.remove('projwftoken', { path: '/' })
};
