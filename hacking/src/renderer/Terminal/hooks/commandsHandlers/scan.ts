import ApiService from '../../../apiService/apiService';
import {
  getUserDataLines,
  getNetworkDataLines,
  getSubnetworkDataLines,
  getUserIdLines,
} from '../../responseLines/scanCommands';

type UseScanCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (error: string[] | string) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export default function useScanCommands({
  addLines,
  addErrors,
  setInputDisabled,
}: UseScanCommandsType) {
  const executeScanCommand = async (parsedCommand: string[]) => {
    try {
      setInputDisabled(true);
      parsedCommand.shift();
      const subcommand = parsedCommand.join(' ');
      const scanData = await ApiService.scan(subcommand);
      if (!scanData) throw 'No data was found'; // todo: error msg
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
          throw `Unrecognized scan`;
        }
      }
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      // @ts-ignore
      addErrors(err);
    }
  };

  return { executeScanCommand };
}
