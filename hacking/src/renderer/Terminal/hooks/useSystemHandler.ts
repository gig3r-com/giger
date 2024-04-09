import { useState } from 'react';
import { addTimeline } from '../utils/timelines';
import { disconnected } from '../responseLines/subnetwork';
import { SubnetworkType } from '../../apiService/types';
import { setConnectedSubnetworkData } from '../utils/store';

type SystemHandlerProps = {
  addLines: (lines: string[]) => void;
  setPrefixType: (type: string) => void;
};

export default function useSystemHandler({
  addLines,
  setPrefixType,
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
    setConnectedSubnetworkData(subnetwork);
    setPrefixType(subnetwork.name);
    setTimeLeft(timeInSubnetwork);
    addTimeline(timeInSubnetwork, step, disconnectFromSubnetwork);
  };
  const step = (timeLeft: number) => setTimeLeft(timeLeft);
  const decryptSubnetwork = () => {
    setIsDecrypted(true);
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
