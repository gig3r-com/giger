import {ReactElement, useEffect, useState} from 'react';
import {getConnectedSubnetworkData, getLoginUserData} from "../utils/store";

type UsePrefixType = {
  isConnected: boolean;
  timeLeft: number;
  accessPoint: string;
  username: string;
  isLoggedIn: boolean;
  forceRefresh: boolean;
};
export function usePrefix(props: UsePrefixType) {
  const {
    isConnected,
    timeLeft,
    accessPoint,
    username,
    isLoggedIn,
    forceRefresh,
  } = props;
  const [prefix, setPrefix] = useState<ReactElement[] | null>(null);

  useEffect(() => {
    const pref = [<span className="input-prefix">~</span>];
    if (!isLoggedIn && username) {
      pref.push(
        <span className="input-prefix">
          Enter password for user:{' '}
          <span className="secondary-color">{username}</span>
        </span>,
      );
    } else if (!isLoggedIn) {
      pref.push(<span className="input-prefix">Enter username</span>);
    } else if (isConnected) {
      const connectedSubnetworkData = getConnectedSubnetworkData();
      const connectionTimer =
        timeLeft > 100
          ? Math.floor(timeLeft / 100)
          : `0,${Math.floor(timeLeft / 10)}`;
      pref.push(
        <span className="input-prefix">
          {accessPoint ? `${accessPoint}/` : ''}
          {connectedSubnetworkData.name}
        </span>,
      );
      pref.push(<span className="input-prefix">{connectionTimer}s</span>);
    } else {
      const userData = getLoginUserData();
      pref.push(
        <span className="input-prefix">
          {accessPoint ? `${accessPoint}/` : ''}
          {userData?.hackerName}
        </span>,
      );
    }

    pref.push(<span className="input-prefix">{'>'}</span>);

    setPrefix(pref);
  }, [isConnected, timeLeft, accessPoint, isLoggedIn, username, forceRefresh]);

  return { prefix };
}
