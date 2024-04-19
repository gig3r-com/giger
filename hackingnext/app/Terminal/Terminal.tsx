import {useEffect, useMemo, useState} from 'react';
import { usePrefix } from './hooks/usePrefix';
import useCommandHandler from './hooks/useCommandHandler';
import useKeyHandler from './hooks/useKeyHandler';
import useLineStateHandler from './hooks/useLineStateHandler';
import useSystemHandler from './hooks/useSystemHandler';
import useAccessPointHandler from './hooks/useAccessPointHandler';
import useLogin from './hooks/useLogin';
import useDebugMode from './hooks/useDebugMode';
import Loader from '../Loader';
import apiService from '../apiService/apiService';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [accessPoint, setAccessPoint] = useState(null);
  const [prefixType, setPrefixType] = useState('admin');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(false);
  const refreshPrefix = () => setForceRefresh(true);
  useEffect(() => {
    if (forceRefresh) setForceRefresh(false);
  }, [forceRefresh]);
  const changeInput = (e: Event) => setInput(e.target.value);
  const stayFocused = (e: Event) => e.target.focus();
  const { toggleDebugMode } = useDebugMode();
  const {
    lines,
    setLines,
    userLines,
    addLines,
    addUserLine,
    removeLastLine,
    addErrors,
  } = useLineStateHandler({ prefixType });
  const { enterPassword, isLoggedIn, logout, username, setUsername, userData } =
    useLogin({ setInputDisabled, addLines, setPrefixType });
  const {
    isConnected,
    timeLeft,
    connectToSubnetwork,
    isDecrypted,
    decryptSubnetwork,
    disconnectFromSubnetwork,
  } = useSystemHandler({ addLines, setPrefixType });
  const { executeCommand } = useCommandHandler({
    setLines,
    addLines,
    addErrors,
    removeLastLine,
    connectToSubnetwork,
    disconnectFromSubnetwork,
    isConnected,
    isDecrypted,
    decryptSubnetwork,
    setInputDisabled,
    logout,
    toggleDebugMode,
    refreshPrefix,
    isLoggedIn,
  });
  const { handleKey } = useKeyHandler({
    username,
    isLoggedIn,
    setUsername,
    enterPassword,
    addUserLine,
    setInput,
    executeCommand,
    userLines,
    input,
  });
  const { prefix } = usePrefix({
    isConnected,
    timeLeft,
    accessPoint,
    username,
    isLoggedIn,
    userData,
    forceRefresh,
  });
  if (window.electron) useAccessPointHandler({ setAccessPoint });

  const renderedLines = useMemo(() => {
    return lines.map((line) => {
      if (!line.length) return <br />;
      return <p className="line" dangerouslySetInnerHTML={{ __html: line }} />;
    });
  }, [lines]);

  return (
    <>
      <button
        onClick={() => {
          apiService.disableAuth();
        }}
      >
        disableAuth
      </button>
      {renderedLines}
      <div className="line input-line">
        {prefix}
        {inputDisabled ? (
          <Loader />
        ) : (
          <input
            autoFocus
            type={!isLoggedIn && username ? 'password' : 'text'}
            value={input}
            onBlur={stayFocused}
            onChange={changeInput}
            onKeyDown={handleKey}
          />
        )}
      </div>
    </>
  );
}
