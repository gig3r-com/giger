import type CommandsServiceType from '../CommandsService';
import {
  getErrorMessage,
  noProgramKeyError,
  noProgramError,
  programAlreadyAvailableError,
  programKeyAlreadyUsedError,
  wrongCommandOptionError,
} from '../responseLines/errors';
import {
  getProgramAvailableMessage,
  getProgramAddedMessage,
} from '../responseLines/install';
import * as EXLOITS from '../../../Terminal/data/exploits';

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

      const program = this.getProgramByCode(programCode);
      if (!program) {
        addLines(noProgramError);
        setInputDisabled(false);
        return;
      }

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

      const programCodeInfo = await ApiService.getProgramCodeInfo(programCode);
      if (!programCodeInfo || programCodeInfo.isUsed) {
        addLines(programKeyAlreadyUsedError);
        setInputDisabled(false);
        return;
      }

      if (commandOptions === '-check') {
        addLines(getProgramAvailableMessage(program.name, programCode));
        setInputDisabled(false);
        return;
      }

      // todo double-check installation in terminal

      // todo add timer to install

      // await ApiService.useProgramCode({ ...programCodeInfo, isUsed: true });
      await ApiService.addExploitToProfile(program.name);
      addLines(getProgramAddedMessage(program.name));
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
  }

  /*
   * Example: LKJHG-DCR1T-9643-1ER45
   *      LKJHG      -        DCR1T        -   9643   -      1ER45
   * <non-important> - <this.programTypes> - <number> - <non-important>
   *
   */
  getProgramByCode(code: string): any {
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
    return this.modulosByType[programType][programModulo];
  }

  programTypes: { [key: string]: string } = {
    '3scnr': 'scanners',
    b2rch: 'breachers',
    dcr1t: 'decrypter',
    ds7br: 'disabler',
    or8pr: 'other',
  };

  modulosByType: { [key: string]: { [modulo: number]: any } } = {
    scanners: {
      1: EXLOITS.Scanner_v1, // ZXCVB-3scnr-4458-4POI9
      2: EXLOITS.Scanner_v2,
      3: EXLOITS.Scanner_v3,
    },
    breachers: {
      3: EXLOITS.Worm,
      6: EXLOITS.Sledgehammer, // LKJHG-B2RCH-9647-1ER45
      9: EXLOITS.Termite,
    },
  };
}
