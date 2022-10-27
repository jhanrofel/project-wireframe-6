import cookie from 'react-cookies';

export const cookiesCreate = (token:string):void => {
  cookie.save("projwftoken",token, {path:"/"});
};

export const cookiesToken = ():string => {
  return cookie.load('projwftoken');
};

export const cookiesRemove = ():void => {
  cookie.remove('projwftoken', { path: '/' })
};
