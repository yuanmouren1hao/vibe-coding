import {Server} from '@types/index';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Servers: undefined;
  Subscriptions: undefined;
  Profile: undefined;
};

export type ServerStackParamList = {
  ServerList: undefined;
  ServerDetail: {server: Server};
};
