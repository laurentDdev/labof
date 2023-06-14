import {createContext} from 'react';

const eventContext = createContext({
  events: [],
  setEvents: (events: any) => {},
  eventTrack: [],
  setEventTrack: (events: any) => {},
});

export default eventContext;
