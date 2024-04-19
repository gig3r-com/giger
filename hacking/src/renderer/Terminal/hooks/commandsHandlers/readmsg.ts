type UseReadMsgCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (line: string[] | string) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export function useReadMsgCommands({
  addLines,
  addErrors,
  setInputDisabled,
}: UseReadMsgCommandsType) {
  const executeReadMsgCommand = async (parsedCommand: string[]) => {
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

  return { executeReadMsgCommand };
}
