import { useEffect, useState, } from 'react';

export function usePrefix(props) {
  const { isConnected, timeLeft, connectedSubnetwork, } = props;
  const [prefix, setPrefix] = useState(null);

  useEffect(() => {
    const pref = [<span className="input-prefix">~</span>];

    if (isConnected) {
      const connectionTimer = timeLeft > 100 ? Math.floor(timeLeft/100) : `0,${Math.floor(timeLeft/10)}`;
      pref.push(<span className="input-prefix">{connectedSubnetwork.name}</span>);
      pref.push(<span className="input-prefix">{connectionTimer}s</span>);
    } else {
      pref.push(<span className="input-prefix">admin</span>);
    }

    pref.push(<span className="input-prefix">{'>'}</span>);

    setPrefix(pref);
  }, [isConnected, timeLeft]);

  return { prefix };
}
