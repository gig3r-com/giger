type KeyHandlerType = {
  addUserLine: (value: string) => void;
  setInput: (value: string) => void;
  executeCommand: (command: string) => void;
  userLines: string[];
  input: string;
};

export default function keyHandler({
  addUserLine,
  setInput,
  executeCommand,
  userLines,
  input,
}: KeyHandlerType) {
  const keyMap = {
    13: () => {
      addUserLine(input);
      setInput('');
      executeCommand(input);
    },
    38: () => {
      setInput(userLines[userLines.length - 1]);
    },
  };

  const handleKey = ({ keyCode }: { keyCode: number }) => {
    const keyAction = keyMap[keyCode];
    if (!keyAction || typeof keyAction !== 'function') return;
    keyAction();
  };

  return { handleKey };
}
