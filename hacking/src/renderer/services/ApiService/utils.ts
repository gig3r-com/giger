import { SubnetworkType } from '../../types';

export function getSavedSubnetworkData(
  subnetwork: SubnetworkType,
  scannerVersion: 1 | 2 | 3,
) {
  const { id } = subnetwork;
  const storageKey = `scanner-${scannerVersion}-subnetwork-${id}`;
  const storageData = localStorage.getItem(storageKey);

  if (storageData) {
    return JSON.parse(storageData);
  }

  const newStorageData = checkForUnknown(subnetwork, scannerVersion);
  localStorage.setItem(storageKey, JSON.stringify(newStorageData));
  return newStorageData;
}

function checkForUnknown(subnetwork: SubnetworkType, scannerLvl: number) {
  if (didScanFail(scannerLvl, subnetwork.operatingSystem)) {
    subnetwork.firewall = 'Unknown';
  }
  if (didScanFail(scannerLvl, subnetwork.operatingSystem)) {
    subnetwork.operatingSystem = 'Unknown';
  }
  if (didScanFail(scannerLvl, subnetwork.operatingSystem)) {
    subnetwork.ice = ['Unknown'];
  }
  return subnetwork;
}

function didScanFail(scannerLvl: number, subnetworkSystemName: string) {
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
