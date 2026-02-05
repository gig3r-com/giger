export * from './user';
export * from './records';
export * from './mui';
export * from './conversations';

export type Option<T> = {
  label: string;
  value: T;
}

export type Options<T> = Option<T>[];

export interface SubnetworkType {
  id: string;
  name: string;
  network: string;
  users: string[];
  accessPoint: string;
  firewall: string;
}

export interface NetworkType {
  id: string;
  name: string;
  subnetworks: SubnetworkType[];
}

export interface LogType {
  id: string;
}

export type OPTIONS<V extends Record<string, string>, L extends Record<string, string>> = {
    value: V[keyof V];
    label: L[keyof L];
}[];

export type Message = {
  id: string
// data may come under different keys depending on backend
  senderId?: string
  senderHandle?: string
  authorId?: string
  content?: string
  timestamp?: string
}