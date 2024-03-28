import ApiService from '../../../apiService/apiService';
import {
  getUserDataLines,
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

      try {
        const userId = await ApiService.getUserIdByName(subcommand);
        addLines(getUserIdLines(userId));
      } catch (err) {
        console.error(err);
      }

      try {
        const usersubnetwork = await ApiService.getSubnetworkByName(subcommand);
        const userSubnetworkData = getSubnetworkData(usersubnetwork);
        addLines(getSubnetworkDataLines(userSubnetworkData));
      } catch (err) {
        console.error(err);
      }

      try {
        const user = await ApiService.getUserById(subcommand);
        addLines(getUserDataLines(user));
      } catch (err) {
        console.error(err);
      }

      setInputDisabled(false);
    } catch (error: any) {
      setInputDisabled(false);
      addErrors(error);
    }
  };

  return { executeScanCommand };
}

function getSubnetworkData(subnetwork) {
  const { id } = subnetwork;
  const scannerLvl = 1;
  const storageKey = `scanner-${scannerLvl}-subnetwork-${id}`;
  const storageData = localStorage.getItem(storageKey);

  if (storageData) {
    return JSON.parse(storageData);
  }

  const newStorageData = checkForUnknown(subnetwork, scannerLvl);
  localStorage.setItem(storageKey, JSON.stringify(newStorageData));
  return newStorageData;
}

function checkForUnknown(subnetwork, scannerLvl) {
  if (didScanFail(scannerLvl, subnetwork.system.name)) {
    subnetwork.firewall = 'Unknown';
  }
  if (didScanFail(scannerLvl, subnetwork.system.name)) {
    subnetwork.system = 'Unknown';
  }
  if (didScanFail(scannerLvl, subnetwork.system.name)) {
    subnetwork.ice = 'Unknown';
  }
  return subnetwork;
}

function didScanFail(scannerLvl, subnetworkSystemName) {
  const d100 = Math.floor(Math.random() * 100) + 1;
  return scannerProbabilities[scannerLvl][subnetworkSystemName] < d100;
}

const scannerProbabilities = {
  1: {
    ForceField: 50,
    EvilTwin: 25,
    JoanOfArc: 25,
  },
  2: {
    ForceField: 75,
    EvilTwin: 50,
    JoanOfArc: 50,
  },
  3: {
    ForceField: 100,
    EvilTwin: 75,
    JoanOfArc: 75,
  },
};
