export function useKeyHandler(props) {
  const { addUserLine, setInput, executeCommand, userLines, input, } = props;

  const keyMap = {
    13: () => {
      addUserLine(input);
      setInput('');
      executeCommand(input);
    },
    38: () => {
      setInput(userLines[userLines.length-1]);
    }
  }

  const handleKey = ({ keyCode }) => {
    const keyAction = keyMap[keyCode];
    if (!keyAction || typeof keyAction !== "function") return;
    keyAction();
  }

  return { handleKey, };
}
