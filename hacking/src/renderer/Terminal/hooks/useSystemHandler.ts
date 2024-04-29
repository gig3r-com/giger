import { useState } from 'react';
import { addTimeline } from '../utils/timelines';
import { disconnected } from '../responseLines/subnetwork';
import { SubnetworkType } from '../../types';
import {
  getConnectedSubnetworkData,
  setConnectedSubnetworkData,
} from '../utils/store';

type SystemHandlerProps = {
  addLines: (lines: string[]) => void;
  setPrefixType: (type: string) => void;
  setLines: (lines: string[]) => void;
};

export default function useSystemHandler({
  addLines,
  setPrefixType,
  setLines,
}: SystemHandlerProps) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isDecrypted, setIsDecrypted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const disconnectFromSubnetwork = () => {
    addLines(disconnected);
    setPrefixType('admin');
    setIsConnected(false);
    setConnectedSubnetworkData(null);
  };
  const connectToSubnetwork = (
    subnetwork: SubnetworkType,
    timeInSubnetwork: number,
  ) => {
    setIsConnected(true);
    // setConnectedSubnetworkData(subnetwork);
    setConnectedSubnetworkData({ ...subnetwork, ice: ['ping', 'cleaner'] });
    setPrefixType(subnetwork.name);
    setTimeLeft(timeInSubnetwork);
    addTimeline(timeInSubnetwork, step, disconnectFromSubnetwork);
  };
  const step = (newTimeLeft: number) => {
    setTimeLeft(newTimeLeft);
    checkICE();
  };
  const decryptSubnetwork = () => {
    setIsDecrypted(true);
  };

  const checkICE = () => {
    const subnetworkData = getConnectedSubnetworkData();
    if (!subnetworkData || !subnetworkData.ice.length) {
      return;
    }

    subnetworkData.ice.forEach((ICEName) => {
      runICE(ICEName);
    });
  };

  const runICE = (ICEName: string) => {
    // eslint-disable-next-line default-case
    switch (ICEName) {
      case 'cleaner': {
        runCleanerICE();
        resolveICE('cleaner');
        break;
      }
      case 'ping': {
        runPingICE();
        resolveICE('ping');
        break;
      }
      case 'kicker': {
        runPingICE();
        resolveICE('kicker');
        break;
      }
      case 'blocker': {
        runPingICE();
        resolveICE('blocker');
        break;
      }
      case 'killer': {
        runPingICE();
        resolveICE('killer');
        break;
      }
    }
  };

  const runCleanerICE = () => {
    setLines([]);
  };

  const runPingICE = () => {
    console.log('PING');
  };

  const resolveICE = (ICEName: string) => {
    const subnetworkData = getConnectedSubnetworkData();
    const newICE = subnetworkData.ice.filter((ICE) => ICEName !== ICE);
    setConnectedSubnetworkData({ ...subnetworkData, ice: newICE });
  };

  return {
    timeLeft,
    connectToSubnetwork,
    disconnectFromSubnetwork,
    isDecrypted,
    decryptSubnetwork,
    isConnected,
  };
}
