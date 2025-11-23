export * from './user';

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

export interface ConversationType {
  id: string;
  gigConversation: boolean;
  anonymizedUsers: string[];
  participants: string[];
  messages: MessageType[];
}

export interface MessageType {
  id: string;
  date: string;
  sender: string;
  text: string;
}

export interface EnhancedConversationType extends ConversationType {
  title: string;
  hackers?: string[];
  messages: EnhancedMessageType[];
}

export interface EnhancedMessageType extends MessageType {
  note: string;
  hacker?: string;
}

export type OPTIONS<V extends Record<string, string>, L extends Record<string, string>> = {
    value: V[keyof V];
    label: L[keyof L];
}[];