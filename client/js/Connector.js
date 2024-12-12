import { Connection } from './Connection.js';
export const Connector = {
  connector: null,
  getInstance: (url) => {
    if (Connector.connector === null) {
        Connector.connector = new Connection(url);
    }
    return Connector.connector;

  },
};