import type CommandsServiceType from '../CommandsService';
import {
  getNetworkDataLines,
  getSubnetworkDataLines,
  getUserDataLines,
  getUserIdLines,
} from '../responseLines/scan';
import {
  getErrorMessage,
  noScannerError,
  unrecognizedScanError,
  noScanId,
} from '../responseLines/errors';
import { NetworkType, SubnetworkType, UserType } from '../../../types';
import * as EXPLOITS from '../../../Terminal/data/exploits';

export type ScanType = {
  type: string;
  data: NetworkType | SubnetworkType | UserType | string;
};

export default class Scan {
  private Service: CommandsServiceType;

  private scannerVersion: 0 | 1 | 2 | 3 = 0;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  async execute() {
    const { parsedCommand, setInputDisabled, addLines, ApiService } =
      this.Service;

    if (!setInputDisabled || !addLines) {
      this.Service.fireInitError();
      return;
    }

    try {
      setInputDisabled(true);
      await this.checkScannerVersion();

      if (!parsedCommand.length) {
        setInputDisabled(false);
        addLines(noScanId);
        return;
      }

      if (this.scannerVersion === 0) {
        setInputDisabled(false);
        addLines(noScannerError);
        return;
      }

      const subcommand = parsedCommand.join(' ');
      console.log('TEST')
      const scanData: ScanType = await ApiService.scan(
        subcommand,
        this.scannerVersion,
      );
      switch (scanData.type) {
        case 'subnetwork': {
          addLines(getSubnetworkDataLines(scanData.data));
          break;
        }
        case 'network': {
          addLines(getNetworkDataLines(scanData.data));
          break;
        }
        case 'user': {
          addLines(getUserDataLines(scanData.data));
          break;
        }
        case 'userId': {
          addLines(getUserIdLines(scanData.data));
          break;
        }
        default: {
          addLines(unrecognizedScanError);
        }
      }
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      addLines(getErrorMessage(err));
    }
  }

  async checkScannerVersion() {
    const { ApiService } = this.Service;
    const programs = await ApiService.getAvailablePrograms();
    if (
      programs.filter((program) => program.name === EXPLOITS.Scanner_v1.name)
        .length
    ) {
      this.scannerVersion = 1;
    }
    if (
      programs.filter((program) => program.name === EXPLOITS.Scanner_v2.name)
        .length
    ) {
      this.scannerVersion = 1;
    }
    if (
      programs.filter((program) => program.name === EXPLOITS.Scanner_v3.name)
        .length
    ) {
      this.scannerVersion = 1;
    }
  }
}
