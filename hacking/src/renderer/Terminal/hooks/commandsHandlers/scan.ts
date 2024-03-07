import ApiService from '../../../apiService/apiService';
import { getUserDataLines, getSubnetworkDataLines } from '../../responseLines/scanCommands';

type UseScanCommandsType = {
  addLines: ([string]) => void,
  addError: (string) => void,
}

export function useScanCommands({ addLines, addError, }: UseScanCommandsType) {
  const executeScanCommand = async (parsedCommand) => {
    try {
      parsedCommand.shift();
      const subcommand = parsedCommand.join(' ');

      try {
        const userId = await ApiService.getUserIdByName(subcommand);
        addLines([userId]);
      } catch (err) {
        console.error(err);
      }

      try {
        const usersubnetwork = await ApiService.getSubnetworkByName(subcommand);
        addLines(getSubnetworkDataLines(usersubnetwork));
      } catch (err) {
        console.error(err);
      }

      try {
        const user = await ApiService.getUserById(subcommand);
        addLines(getUserDataLines(user));
      } catch (err) {
        console.error(err);
      }
    } catch (error) {
      addError(error);
    }
  };

  return { executeScanCommand, };
}
