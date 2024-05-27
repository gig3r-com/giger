import type CommandsServiceType from '../CommandsService';
import {
  getErrorMessage,
  noProgramKeyError,
  noProgramError,
  programAlreadyAvailableError,
  programKeyAlreadyUsedError,
  wrongCommandOptionError,
  subnetworkNotFound,
} from '../responseLines/errors';
import {
  getProgramAvailableMessage,
  getProgramAddedMessage,
} from '../responseLines/install';
import { ExploitType, ProgramType } from '../../../types';
import { ConfigService } from '../../index';
import { getLoginUserData } from '../../../Terminal/utils/store';

export default class Install {
  private Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  async execute() {
    const {
      setInputDisabled,
      fireInitError,
      addLines,
      parsedCommand,
      ApiService,
      getDirectLine,
    } = this.Service;
    const programCode = parsedCommand[0];
    const commandOptions = parsedCommand[1];
    if (!setInputDisabled || !addLines) {
      fireInitError();
      return;
    }
    try {
      setInputDisabled(true);

      if (!programCode || programCode[0] === '-') {
        addLines(noProgramKeyError);
        setInputDisabled(false);
        return;
      }

      if (commandOptions && commandOptions !== '-check') {
        addLines(wrongCommandOptionError);
        setInputDisabled(false);
        return;
      }

      const { program, isDefence } = await this.getProgramByCode(programCode);
      console.log({ program })
      if (!program) {
        addLines(noProgramError);
        setInputDisabled(false);
        return;
      }

      const programCodeInfo = await ApiService.getProgramCodeInfo(programCode);
      if (!programCodeInfo || programCodeInfo.isUsed) {
        addLines(programKeyAlreadyUsedError);
        setInputDisabled(false);
        return;
      }

      if (commandOptions === '-check') {
        addLines(getProgramAvailableMessage(program, programCode));
        setInputDisabled(false);
        return;
      }

      if (isDefence) {
        // Add defence program path
        addLines(getProgramAvailableMessage(program, programCode));
        setInputDisabled(false);
        const subnetworkId = await getDirectLine(
          'To install this defensive program enter subnetwork ID: ',
        );
        setInputDisabled(true);
        const subnetwork = await ApiService.getSubnetworkById(subnetworkId);

        if (!subnetwork) {
          addLines(subnetworkNotFound);
        }

        const networkResponse = await ApiService.scanForNetworkById(
          subnetwork.networkId,
        );
        if (!networkResponse?.data) {
          addLines([
            '<span class="error-title">ERROR</span>: Network not found.',
          ]);
        }

        const admin = networkResponse.data.adminId;
        const loginUserHandle = getLoginUserData()?.handle;

        if (admin !== loginUserHandle) {
          addLines([
            '<span class="error-title">ERROR</span>: You dont have access to this network.',
          ]);
          setInputDisabled(false);
          return;
        }

        if (program.type === 'firewall') {
          const subnetworkFirewall = await ConfigService.getDefenceProgram(
            subnetwork.firewall,
          );
          if (program.name === subnetworkFirewall?.name) {
            throw new Error(
              `<span class="secondary-color">ERROR</span>: this defensive program is already installed in this subnetwork`,
            );
          }
          setInputDisabled(false);
          const confirmation = await getDirectLine(
            `Do you wont to replace firewall ${subnetworkFirewall?.name} for new <span class="secondary-color">${program.name}</span> in ${subnetwork.name}? (Y/N)`,
          );
          setInputDisabled(true);
          const confirmationTrimmed = confirmation.trim().toLowerCase();
          if (confirmationTrimmed === 'y' || confirmationTrimmed === 'yes') {
            const programs = await ConfigService.getDefencePrograms();
            let programToInstall = '';
            Object.keys(programs).forEach((key) => {
              if (programs[key].name === program.name) {
                programToInstall = key;
              }
            });
            wait(5000);
            await ApiService.addFirewallToSubnetwork(
              subnetwork.id,
              programToInstall,
            );
            await ApiService.useProgramCode({
              ...programCodeInfo,
              isUsed: true,
            });
            addLines(getProgramAddedMessage(program.name));
          }
        } else if (program.type === 'encrypter') {
          const subnetworkSystem = await ConfigService.getDefenceProgram(
            subnetwork.operatingSystem,
          );
          if (program.name === subnetworkSystem?.name) {
            throw new Error(
              `<span class="secondary-color">ERROR</span>: this defensive program is already installed in this subnetwork`,
            );
          }
          setInputDisabled(false);
          const confirmation = await getDirectLine(
            `Do you wont to replace encrypter ${subnetworkSystem?.name} for new <span class="secondary-color">${program.name}</span> in ${subnetwork.name}? (Y/N)`,
          );
          setInputDisabled(true);
          const confirmationTrimmed = confirmation.trim().toLowerCase();
          if (confirmationTrimmed === 'y' || confirmationTrimmed === 'yes') {
            const programs = await ConfigService.getDefencePrograms();
            let programToInstall = '';
            Object.keys(programs).forEach((key) => {
              if (programs[key].name === program.name) {
                programToInstall = key;
              }
            });
            wait(5000);
            await ApiService.addSystemToSubnetwork(
              subnetwork.id,
              programToInstall,
            );
            await ApiService.useProgramCode({
              ...programCodeInfo,
              isUsed: true,
            });
            addLines(getProgramAddedMessage(program.name));
          }
        } else if (program.type === 'ice') {
          const programs = await ConfigService.getDefencePrograms();
          let iceToInstall = '';
          Object.keys(programs).forEach((key) => {
            if (programs[key].name === program.name) {
              iceToInstall = key;
            }
          });
          if (subnetwork.ice?.includes(iceToInstall)) {
            throw new Error(
              `<span class="secondary-color">ERROR</span>: this defensive program is already installed in this subnetwork`,
            );
          }
          setInputDisabled(false);
          const confirmation = await getDirectLine(
            `Do you wont to add ice <span class="secondary-color">${program.name}</span> in ${subnetwork.name}? (Y/N)`,
          );
          setInputDisabled(true);
          const confirmationTrimmed = confirmation.trim().toLowerCase();
          if (confirmationTrimmed === 'y' || confirmationTrimmed === 'yes') {
            wait(5000);
            await ApiService.addICEToSubnetwork(subnetwork.id, iceToInstall);
            await ApiService.useProgramCode({
              ...programCodeInfo,
              isUsed: true,
            });
            addLines(getProgramAddedMessage(program.name));
          }
        }
      } else {
        // Add exploit path

        const availablePrograms = await ApiService.getAvailablePrograms();
        if (
          availablePrograms.filter(
            (availableProgram) => availableProgram.name === program.name,
          ).length > 0
        ) {
          addLines(programAlreadyAvailableError);
          setInputDisabled(false);
          return;
        }

        addLines(getProgramAvailableMessage(program, programCode));
        setInputDisabled(false);
        const confirmation = await getDirectLine(
          'Do you wont to install this exploit? (Y/N)',
        );
        setInputDisabled(true);
        const confirmationTrimmed = confirmation.trim().toLowerCase();
        if (confirmationTrimmed === 'y' || confirmationTrimmed === 'yes') {
          const exploits = await ConfigService.getExploits();
          let programToInstall = '';
          Object.keys(exploits).forEach((key) => {
            if (exploits[key].name === program.name) {
              programToInstall = key;
            }
          });
          await ApiService.addExploitToProfile(programToInstall);
          await ApiService.useProgramCode({ ...programCodeInfo, isUsed: true });
          addLines(getProgramAddedMessage(program.name));
        }
        wait(5000);
      }
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }

    async function wait(time: number) {
      setInputDisabled(true);
      await new Promise((resolve) => setTimeout(resolve, time)).then(() => {
        setInputDisabled(false);
      });
    }
  }

  /*
   * Example: LKJHG-DCR1T-9643-1ER45
   *      LKJHG      -        DCR1T        -   9643   -      1ER45
   * <non-important> - <this.programTypes> - <number> - <non-important>
   *
   */
  async getProgramByCode(code: string): {
    program: ExploitType | ProgramType | null;
    isDefence: boolean;
  } {
    const parsedCode = code.split('-') || [];
    const programType = this.programTypes[parsedCode[1]];

    const programModuloInsert = Number(
      parsedCode[2]
        .split('')
        // @ts-ignore
        .reduce((prev, curr) => Number(prev) + Number(curr), 0),
    );
    const programModulo = programModuloInsert % 10;

    if (!this.modulosByType[programType]) {
      return;
    }
    if (!this.modulosByType[programType][programModulo]) {
      return;
    }
    const programName = this.modulosByType[programType][programModulo];
    let exploit;
    let program;

    try {
      exploit = await ConfigService.getInstallExploit(programName);
    } catch (e) {
      console.log(e);
    }

    if (exploit) {
      return { program: exploit, isDefence: false };
    }

    try {
      program = await ConfigService.getDefenceProgram(programName);
    } catch (e) {
      console.log(e);
    }

    if (program) {
      return { program, isDefence: true };
    }

    return { program: null, isDefence: false };
  }

  programTypes: { [key: string]: string } = {
    '3scnr': 'scanner',
    b2rch: 'breacher',
    dcr1t: 'decrypter',
    ds7br: 'disabler',
    or8pr: 'other',
    f1w4l: 'firewall',
    '0s3y3': 'encrypter',
    '01ce0': 'ice',
  };

  modulosByType: { [key: string]: { [modulo: number]: any } } = {
    scanner: {
      1: 'SCANNER1',
      2: 'SCANNER2',
      3: 'SCANNER3',
    },
    breacher: {
      3: 'WORM',
      6: 'TERMITE',
      9: 'SLEDGEHAMMER',
    },
    decrypter: {
      3: 'CYBERCRACKER',
      6: 'WIZARDS_BOOK',
      9: 'TIN_WEASEL',
    },
    other: {
      0: 'MIND_FLAYER',
      1: 'MONITOR',
      2: 'GIGER_GATE',
      3: 'BLUE_MIRROR',
    },
    disabler: {
      0: 'REFLECTOR',
      9: 'WITCH_DOCTOR',
      8: 'HOTWIRE',
      7: 'REPLICATOR',
      6: 'INVISIBILITY_SPELL',
    },
    firewall: {
      2: 'ENCRYPT_GUARD',
      4: 'FIREWALL_X',
      8: 'VIRTUAL_VAULT',
    },
    encrypter: {
      6: 'FORCE_FIELD',
      8: 'EVIL_TWIN',
      0: 'JOAN_OF_ARC',
    },
    ice: {
      1: 'PING1',
      2: 'PING2',
      3: 'PING3',
      4: 'CLEANER',
      5: 'BOOST',
      6: 'KICKER',
      7: 'LOCKER',
      8: 'BLOCKER',
      9: 'KILLER',
    },
  };
}
