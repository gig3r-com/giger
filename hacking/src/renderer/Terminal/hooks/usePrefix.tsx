import { ReactElement, useEffect, useState } from 'react';
import { getLoginUserData } from '../utils/store';
import { ServerConnectionService } from '../../services';

type UsePrefixType = {
  isConnected: boolean;
  inputTimer: number;
  accessPoint: string;
  username: string;
  isLoggedIn: boolean;
  forceRefresh: boolean;
};
export default function usePrefix(props: UsePrefixType) {
  const { inputTimer, accessPoint, username, isLoggedIn, forceRefresh } = props;
  const [prefix, setPrefix] = useState<ReactElement[] | null>(null);
  const { isConnected, connectedSubnetwork } = ServerConnectionService;

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
      const connectionTimer =
        inputTimer > 10
          ? Math.floor(inputTimer / 10)
          : `0,${Math.floor(inputTimer / 1)}`;
      pref.push(
        <span className="input-prefix">
          {accessPoint ? `${accessPoint}/` : ''}
          {connectedSubnetwork?.name}
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
  }, [
    isConnected,
    inputTimer,
    accessPoint,
    isLoggedIn,
    username,
    forceRefresh,
  ]);

  return { prefix };
}
