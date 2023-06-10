import {createContext} from 'react';

const eventContext = createContext({
  events: {},
  setEvents: (event: object) => {},
});

export default eventContext
