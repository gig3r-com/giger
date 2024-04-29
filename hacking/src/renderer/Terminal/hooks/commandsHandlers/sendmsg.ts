type UseSendMsgCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (line: string[] | string) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export function useSendMsgCommands({
  addLines,
  addErrors,
  setInputDisabled,
}: UseSendMsgCommandsType) {
  const executeSendMsgCommand = async (parsedCommand: string[]) => {
    try {
      setInputDisabled(true);
      addLines(['NOT IMPLEMENTED']);
      setInputDisabled(false);
    } catch (err) {
      setInputDisabled(false);
      // @ts-ignore
      addErrors(err);
    }
  };

  return { executeSendMsgCommand };
}
