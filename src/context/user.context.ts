import {createContext} from 'react';

const userContext = createContext({
  login: false,
  setLogin: (login: boolean) => {},
  userData: {},
  setUserData: (userData: object) => {}
});

export default userContext;
