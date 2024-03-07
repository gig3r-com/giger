import ApiService from '../../../apiService/apiService';
import { connectingFailedLines, connectingLines, connectingSuccessLines, decryptingLines, decryptingSuccessLines, } from '../../responseLines/runCommands';
import { addTimeline, makeLoaderLine, } from "../../utils/timelines";
import * as EXPLOITS from '../../data/exploits';
import { ExploitType, } from '../../data/types';

export type UseRunCommandsType = {
  isConnected: boolean,
  addLines: ([string]) => void,
  addError: (string) => void,
  removeLastLine: () => void,
  connectToSubnetwork: ({}, number) => void,
  connectedSubnetwork: any,
  decryptSubnetwork: () => void,
};

export type RunBreacherType = {
  isConnected: boolean,
  addLines: ([string]) => void,
  removeLastLine: () => void,
  connectToSubnetwork: ({}, number) => void,
  exploit: ExploitType,
  subnetwork: any,
};

export type RunDecrypterType = {
  isConnected: boolean,
  addLines: ([string]) => void,
  removeLastLine: () => void,
  decryptSubnetwork: () => void,
  exploit: ExploitType,
  subnetwork: any,
};

export function useRunCommands({ addLines, addError, removeLastLine, connectToSubnetwork, isConnected, connectedSubnetwork, decryptSubnetwork, }: UseRunCommandsType) {
  const executeRunCommand = async (parsedCommand) => {
    try {
      const subnetworkName = getSubnetworkName(isConnected, parsedCommand[1], connectedSubnetwork);
      const subnetwork = await ApiService.getSubnetworkByName(subnetworkName);
      const exploit = getExploit(parsedCommand);

      if (!subnetwork) throw new Error('Subnetwork not found');
      if (!exploit) throw new Error('Program not found');

      switch (exploit.type) {
        case 'breacher': {
          runBreacher({ addLines, connectToSubnetwork, exploit, isConnected, removeLastLine, subnetwork, });
          break;
        }
        case 'decrypter': {
          runDecrypter({ addLines, decryptSubnetwork, exploit, isConnected, removeLastLine, subnetwork, });
          break;
        }
        default: {
          throw new Error('Not recognized type');
        }
      }
    }
    catch (error) {
      addError(error);
    }
  };

  return { executeRunCommand, };
}

function getSubnetworkName(isConnected, commandStatement, connectedSubnetwork) {
  if (isConnected && commandStatement === '.') return connectedSubnetwork.name;
  return commandStatement;
}

function getExploit(parsedCommand) {
  parsedCommand.shift();
  parsedCommand.shift();
  const programName = parsedCommand.join(' ').toLowerCase();
  return Object.values(EXPLOITS).find(p => p.name.toLowerCase() === programName);
}

function runBreacher({
                       isConnected,
                       addLines,
                       removeLastLine,
                       connectToSubnetwork,
                       exploit,
                       subnetwork,
                     }: RunBreacherType) {
  if (isConnected) throw new Error('Cannot connect while still connected to a subnetwork. Use END command to disconnect.');
  addLines(connectingLines(subnetwork.name));
  const breachTime = 200;
  const breachEffect = exploit.effect[subnetwork.firewall.name];
  const timeInSubnetwork = breachEffect.perfect? subnetwork.system.timeOnPerfectBreach : subnetwork.system.timeOnImperfectBreach;

  addTimeline(breachTime, stepBreach, endBreach);
  return;

  function endBreach() {
    if (!breachEffect.isConnected) {
      addLines(connectingFailedLines);
    } else {
      addLines(connectingSuccessLines);
      connectToSubnetwork(subnetwork, timeInSubnetwork);
    }
  }

  function stepBreach(time) {
    if (time !== breachTime) removeLastLine();
    addLines([makeLoaderLine(time, breachTime)]);
    if (time === 0) removeLastLine();
  }
}

function runDecrypter({
                        isConnected,
                        addLines,
                        removeLastLine,
                        decryptSubnetwork,
                        exploit,
                        subnetwork,
                      }: RunDecrypterType) {
  if (!isConnected) throw new Error('Cannot decrypt while not connected to a subnetwork.');

  addLines(decryptingLines(subnetwork.name));
  const decryptingEffect =  exploit.effect[subnetwork.system.name];

  addTimeline(decryptingEffect.decryptingTime, stepDecryption, endDecryption);
  return;

  function endDecryption() {
    addLines(decryptingSuccessLines);
    decryptSubnetwork();
  }

  function stepDecryption(time) {
    if (time !== decryptingEffect.decryptingTime) removeLastLine();
    addLines([makeLoaderLine(time, decryptingEffect.decryptingTime)]);
    if (time === 0) removeLastLine();
  }
}
