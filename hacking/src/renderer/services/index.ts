import ServerConnectionServiceConstructor from './ServerConnectionService/ServerConnectionService';
import ApiServiceConstructor from './ApiService/ApiService';
import ConfigServiceConstructor from './ConfigService/ConfigService';
import MonitorServiceConstructor from './MonitorService/MonitorService';
import CommandsServiceConstructor from './CommandsService/CommandsService';
import OverlayServiceConstructor from './OverlayService/OverlayService';
import DebugServiceConstructor from './DebugService/DebugService';

export const ApiService = new ApiServiceConstructor();
export const ConfigService = new ConfigServiceConstructor(ApiService);

export const MonitorService = new MonitorServiceConstructor();

export const OverlayService = new OverlayServiceConstructor();

export const DebugService = new DebugServiceConstructor();
export const ServerConnectionService = new ServerConnectionServiceConstructor(
  ConfigService,
  ApiService,
  MonitorService,
);

export const CommandsService = new CommandsServiceConstructor(
  ConfigService,
  ApiService,
  MonitorService,
  ServerConnectionService,
);

window.debug = DebugService;
