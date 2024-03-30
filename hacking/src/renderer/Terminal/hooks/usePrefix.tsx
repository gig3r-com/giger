import { useEffect, useState } from 'react';

export function usePrefix(props) {
  const {
    isConnected,
    timeLeft,
    connectedSubnetwork,
    accessPoint,
    username,
    isLoggedIn,
    userData,
  } = props;
  const [prefix, setPrefix] = useState(null);

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
        timeLeft > 100
          ? Math.floor(timeLeft / 100)
          : `0,${Math.floor(timeLeft / 10)}`;
      pref.push(
        <span className="input-prefix">
          {accessPoint ? `${accessPoint}/` : ''}
          {connectedSubnetwork.name}
        </span>,
      );
      pref.push(<span className="input-prefix">{connectionTimer}s</span>);
    } else {
      pref.push(
        <span className="input-prefix">
          {accessPoint ? `${accessPoint}/` : ''}
          {userData?.hackerName}
        </span>,
      );
    }

    pref.push(<span className="input-prefix">{'>'}</span>);

    setPrefix(pref);
  }, [isConnected, timeLeft, accessPoint, isLoggedIn, username, userData?.hackerName]);

  return { prefix };
}
