import type CommandsServiceType from '../CommandsService';
import { ExploitType } from '../../../types';
import {
  ApiService,
  ConfigService,
  ServerConnectionService,
  MonitorService,
  CommandsService,
} from '../../index';
import {
  getErrorMessage,
  programNotFound,
  subnetworkNotFound,
} from '../responseLines/errors';
import {
  connectingLines,
  decryptingLines,
} from '../../../Terminal/responseLines/runCommands';

export default class Run {
  private Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  async execute() {
    const {
      setInputDisabled,
      addLines,
      fireInitError,
      parsedCommand,
      getDirectLine,
    } = this.Service;
    if (!setInputDisabled || !addLines) {
      fireInitError();
      return;
    }
    let program = parsedCommand[0];
    let subnetworkId = parsedCommand[1];
    let subnetwork;
    if (!program) {
      program = await getDirectLine(`Enter program's name:`);
    }
    try {
      await ConfigService.checkHacking('run', subnetworkId);
      setInputDisabled(true);
      const exploit: ExploitType | undefined =
        await ConfigService.getExploit(program);
      if (!exploit) {
        addLines(programNotFound);
        setInputDisabled(false);
        return;
      }

      if (exploit.type === 'breacher') {
        await runBreacher(exploit);
      }
      if (exploit.type === 'decrypter') {
        await runDecrypter(exploit);
      }
      if (exploit.type === 'disabler') {
        await runDisabler(exploit);
      }
      if (exploit.type === 'scanner') {
        await runScanner();
      }
      if (exploit.type === 'other') {
        await runOther(exploit);
      }
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }

    async function checkSubnetwork() {
      if (!subnetworkId) {
        subnetworkId = await getDirectLine(`Enter subnetwork's id:`);
      }

      await Promise.any([
        ApiService.getSubnetworkById(subnetworkId),
        ApiService.getSubnetworkByName(subnetworkId),
      ])
        .then((response) => {
          subnetwork = response;
        })
        .catch((err) => {
          console.log({ err });
          addLines(subnetworkNotFound);
        });
    }

    async function checkConnectetion() {
      if (ServerConnectionService.isConnected) {
        subnetworkId = ServerConnectionService.connectedSubnetwork?.id;
      } else if (!ServerConnectionService.isConnected) {
        addLines([
          `<span class="secondary-color">Cannot</span> run this program, you are not connected to any subnetwork`,
        ]);
      }
      await checkSubnetwork();
    }

    async function runBreacher(exploit: ExploitType) {
      await checkSubnetwork();
      if (ServerConnectionService.isConnected) {
        throw new Error(
          'Cannot connect while still connected to a subnetwork. Use END command to disconnect.',
        );
      }
      addLines(connectingLines(subnetwork.name));
      if (subnetwork.accessPoint !== 'none') {
        const ac = ServerConnectionService.accessPoint;
        const network = ConfigService.getNetworks()[subnetwork.networkId];
        if (!ac || ac?.type !== network?.ac) {
          let where;
          switch (network?.ac) {
            case 'red': {
              where = `type RED access point in <span class="secondary-color">SynthPulse-AP</span>, <span class="secondary-color">OMG-AP</span>, <span class="secondary-color">DropoffService-AP</span>`;
              break;
            }
            case 'green': {
              where = `type GREEN access point in <span class="secondary-color">Motel-AP</span>, <span class="secondary-color">L0-Maint-AP</span>, <span class="secondary-color">L3-Maint-AP</span>`;
              break;
            }
            case 'blue':
            default: {
              where = `type BLUE access point witch are not available in Sector V`;
              break;
            }
          }
          throw new Error(
            `<span>Error:</span> You are not connected to required access point. You need to connect to ${where}.`,
          );
        }
      }
      await ServerConnectionService.breach(exploit, subnetwork);
    }

    async function runDecrypter(exploit: ExploitType) {
      await checkConnectetion();
      addLines(decryptingLines(subnetwork.name));
      await ServerConnectionService.decrypt(exploit, subnetwork);
    }

    async function runDisabler(exploit: ExploitType) {
      await checkConnectetion();
      await ServerConnectionService.disable(exploit);
    }

    async function runScanner() {
      CommandsService.parsedCommand.shift();
      await CommandsService.mainCommandsTable.scan.execute();
    }

    async function runOther(exploit: ExploitType) {
      if (exploit.name === 'Monitor') {
        if (MonitorService.monitorEnabled) {
          MonitorService.disableMonitor();
          addLines([`<span class="secondary-color">Monitor</span> disabled`]);
        } else {
          MonitorService.enableMonitor();
          addLines([`<span class="secondary-color">Monitor</span> enabled`]);
        }
      } else if (exploit.name === 'MindFLayer') {
        // Run MindFlayer
        await runMindFlayer();
        console.log('Not Implemented Yet', exploit);
      } else if (exploit.name === 'BlueScreen') {
        // Run BlueScreen
        console.log('Not Implemented Yet', exploit);
      } else if (exploit.name === 'GigerGate') {
        await CommandsService.mainCommandsTable.gig.execute;
      }
    }

    async function runMindFlayer() {
      setInputDisabled(false);
      let userHandle = parsedCommand[1];
      let masterHandle = parsedCommand[2];
      if (!userHandle) {
        userHandle = await getDirectLine('Enter subjects handle:');
      }
      if (!masterHandle) {
        masterHandle = await getDirectLine('Enter master handle:');
      }
      await ApiService.addMasterMind(userHandle, masterHandle);
      addLines([
        `Mind exploit of ${userHandle} was enabled for ${masterHandle}`,
      ]);
    }
  }
}
