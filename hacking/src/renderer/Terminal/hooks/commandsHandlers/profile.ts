import { SubnetworkType } from '../../../apiService/types';

type UseProfileCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (lines: string[]) => void;
};

export function useProfileCommands({
  addLines,
  addErrors,
}: UseProfileCommandsType) {
  const executeProfileCommand = async (parsedCommand: string[]): void => {
    const subnetworkId = parsedCommand[1] === '.' ? '' : subnetworkId;
    const userId = parsedCommand[2];

    addLines(['Not Implemented Yet']);
  };

  return { executeProfileCommand };

  function getSubnetwork(subnetworkId: string): SubnetworkType | void {
    if (subnetworkId === '.') {

    } else {

    }
  }
}
