import { APP_MODE_OPTIONS } from '../constants';

export type AppModes = (typeof APP_MODE_OPTIONS)[string];

export interface EpsilonContextType {
  appMode: AppModes;
  setAppMode: (mode: AppModes) => void;
  locked: boolean;
  setLock: (value: boolean) => void;
}