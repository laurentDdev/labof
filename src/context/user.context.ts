import {createContext} from 'react';

const userContext = createContext({
  login: false,
  setLogin: (login: boolean) => {},
});

export default userContext;
