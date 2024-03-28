import { useEffect, useMemo, useState } from 'react';
import { usePrefix } from './hooks/usePrefix';
import useCommandHandler from './hooks/useCommandHandler';
import useKeyHandler from './hooks/useKeyHandler';
import useLineStateHandler from './hooks/useLineStateHandler';
import useSystemHandler from './hooks/useSystemHandler';
import useAccessPointHandler from './hooks/useAccessPointHandler';
import Loader from '../Loader';
import apiService from '../apiService/apiService';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [accessPoint, setAccessPoint] = useState(null);
  const [prefixType, setPrefixType] = useState('admin');
  const [inputDisabled, setInputDisabled] = useState(false);
  const changeInput = (e) => setInput(e.target.value);
  const stayFocused = (e) => e.target.focus();
  const {
    lines,
    setLines,
    userLines,
    addLines,
    addUserLine,
    removeLastLine,
    addErrors,
  } = useLineStateHandler({ prefixType });
  const {
    isConnected,
    connectedSubnetwork,
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
    connectedSubnetwork,
    isDecrypted,
    decryptSubnetwork,
    setInputDisabled,
  });
  const { handleKey } = useKeyHandler({
    addUserLine,
    setInput,
    executeCommand,
    userLines,
    input,
  });
  const { prefix } = usePrefix({
    isConnected,
    timeLeft,
    connectedSubnetwork,
    accessPoint,
  });
  useAccessPointHandler({ setAccessPoint });

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
      <button
        onClick={() => {
          apiService.getGigs();
        }}
      >
        CLICK ME
      </button>
      {renderedLines}
      <div className="line input-line">
        {prefix}
        {inputDisabled ? (
          <Loader/>
        ) : (
          <input
            autoFocus
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
