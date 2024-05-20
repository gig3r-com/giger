import { useEffect, useMemo, useState } from 'react';
import usePrefix from './hooks/usePrefix';
import useKeyHandler from './hooks/useKeyHandler';
import useLineStateHandler from './hooks/useLineStateHandler';
import useAccessPointHandler from './hooks/useAccessPointHandler';
import useLogin from './hooks/useLogin';
import Loader from '../components/Loader';
import {
  ApiService,
  CommandsService,
  ConfigService,
  ServerConnectionService,
  LineStateService,
} from '../services';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [accessPoint, setAccessPoint] = useState(null);
  const [prefixType, setPrefixType] = useState('admin');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [inputTimer, setInputTimer] = useState<number | null>(null);
  const [enableDirectInput, setEnableDirectInput] = useState(false);
  const [directInput, setDirectInput] = useState('');
  const refreshPrefix = () => setForceRefresh(true);
  useEffect(() => {
    if (forceRefresh) setForceRefresh(false);
  }, [forceRefresh]);
  const changeInput = (e: Event) => setInput(e.target.value);

  const changeDirrectInput = (e: Event) => setDirectInput(e.target.value);
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
    useLogin({ setInputDisabled, addLines, setPrefixType, removeLastLine });
  const { handleKey } = useKeyHandler({
    username,
    isLoggedIn,
    setUsername,
    enterPassword,
    addUserLine,
    setInput,
    userLines,
    input,
    enableDirectInput,
    addLines,
  });
  const { prefix } = usePrefix({
    inputTimer,
    accessPoint,
    username,
    isLoggedIn,
    userData,
    forceRefresh,
  });
  useAccessPointHandler({ setAccessPoint });

  const renderedLines = useMemo(() => {
    return lines.map((line) => {
      if (!line.length) return <br />;
      return <p className="line" dangerouslySetInnerHTML={{ __html: line }} />;
    });
  }, [lines]);

  useEffect(() => {
    ServerConnectionService.init(
      addLines,
      removeLastLine,
      setPrefixType,
      setInputTimer,
      setLines,
      setInputDisabled,
      lines,
    );
    CommandsService.init({
      addLines,
      setLines,
      addErrors,
      setInputDisabled,
      logout,
      refreshPrefix,
      removeLastLine,
    });
    LineStateService.init({
      addLines,
      directInput,
      setDirectInput,
      enableDirectInput,
      setEnableDirectInput,
      handleKey,
    });
    window.config.services = {
      ApiService,
      ConfigService,
      ServerConnectionService,
    };
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.keyCode === 19 || event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) {
        return;
      }
      const inputRef = document.getElementById('terminal-input');
      if (!inputRef) return;
      inputRef.focus();
    });
    ConfigService.init();
  }, []);

  const inputElement = enableDirectInput ? (
    <input
      id="terminal-input"
      autoFocus
      type="text"
      value={directInput}
      onChange={changeDirrectInput}
      onKeyDown={LineStateService.handleDirectKey}
    />
  ) : (
    <input
      id="terminal-input"
      autoFocus
      type={!isLoggedIn && username ? 'password' : 'text'}
      value={input}
      onChange={changeInput}
      onKeyDown={handleKey}
    />
  );

  return (
    <>
      {renderedLines}
      <div className="line input-line">
        {enableDirectInput ? '' : prefix}
        {inputDisabled ? <Loader /> : inputElement}
      </div>
    </>
  );
}
