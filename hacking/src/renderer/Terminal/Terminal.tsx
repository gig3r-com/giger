import {useState} from "react";
import {useCommandRunner} from './hooks/useCommandRunner';
import {useKeyHandler} from "./hooks/useKeyHandler";
import {useLineStates} from "./hooks/useLineStates";

export default function Terminal() {
  const [input, setInput] = useState('');
  const changeInput = (e) => setInput(e.target.value);
  const stayFocused = (e) => e.target.focus();
  const { lines, setLines, userLines, setUserLines, addLine, addLines, addUserLine, } = useLineStates();
  const { executeCommand, } = useCommandRunner({ setLines, addLine, addLines, });
  const { handleKey, } = useKeyHandler({ addUserLine, setInput, executeCommand, userLines, input, });

  return (
    <>
      {lines.map((line) => {
        if (!line.length) return <br />
        return <p className="line" dangerouslySetInnerHTML={{__html: line}} />;
      })}
      <input
        autoFocus
        value={input}
        onBlur={stayFocused}
        onChange={changeInput}
        onKeyDown={handleKey}
      />
    </>
  )
}
