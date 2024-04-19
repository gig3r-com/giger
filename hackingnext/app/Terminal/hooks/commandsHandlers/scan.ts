import ApiService from '../../../apiService/apiService';
import {
  getUserDataLines,
  getNetworkDataLines,
  getSubnetworkDataLines,
  getUserIdLines,
} from '../../responseLines/scanCommands';

type UseScanCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (error: string[]) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export default function useScanCommands({
  addLines,
  addErrors,
  setInputDisabled,
}: UseScanCommandsType) {
  const executeScanCommand = async (parsedCommand: string[]) => {
    try {
      parsedCommand.shift();
      const subcommand = parsedCommand.join(' ');
      setInputDisabled(true);

      const scanData = await ApiService.scan(subcommand);
      console.log(scanData);
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
          throw new Error(`Unrecognized scan`);
        }
      }
      setInputDisabled(false);
    } catch (error: any) {
      setInputDisabled(false);
    }
  };

  return { executeScanCommand };
}
