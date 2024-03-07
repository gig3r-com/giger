import { useState, } from "react";
import { usePrefix } from './hooks/usePrefix';
import onCommandHandler from './hooks/onCommandHandler';
import {keyHandler} from "./hooks/keyHandler";
import {lineStateHandler} from "./hooks/lineStateHandler";
import {systemHandler} from "./hooks/systemHandler";

export default function Terminal() {
  const [input, setInput] = useState('');
  const [prefixType, setPrefixType] = useState('admin');
  const changeInput = (e) => setInput(e.target.value);
  const stayFocused = (e) => e.target.focus();
  const { lines, setLines, userLines, addLines, addUserLine, addError, removeLastLine, } = lineStateHandler({ prefixType, });
  const { isConnected, connectedSubnetwork, timeLeft, connectToSubnetwork, isDecrypted, decryptSubnetwork, disconnectFromSubnetwork, } = systemHandler({ addLines, setPrefixType });
  const { executeCommand, } = onCommandHandler(
    { setLines, addLines, addError, removeLastLine, connectToSubnetwork, disconnectFromSubnetwork, isConnected, connectedSubnetwork, isDecrypted, decryptSubnetwork }
    );
  const { handleKey, } = keyHandler({ addUserLine, setInput, executeCommand, userLines, input, });
  const { prefix, } = usePrefix({ isConnected, timeLeft, connectedSubnetwork, });

  return (
    <>
      {lines.map((line) => {
        if (!line.length) return <br />
        return <p className="line" dangerouslySetInnerHTML={{__html: line}} />;
      })}
      <div className="line input-line">
        { prefix }
        <input
          autoFocus
          value={input}
          onBlur={stayFocused}
          onChange={changeInput}
          onKeyDown={handleKey}
        />
      </div>
    </>
  )
}
