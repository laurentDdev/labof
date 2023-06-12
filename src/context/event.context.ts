import {createContext} from 'react';

const eventContext = createContext({
  events: [],
  setEvents: (events: any) => {},
});

export default eventContext;
