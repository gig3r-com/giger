type UseLogCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (line: string[] | string) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export function useLogCommands({
  addLines,
  addErrors,
  setInputDisabled,
}: UseLogCommandsType) {
  const executeLogCommand = async (parsedCommand: string[]) => {
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

  return { executeLogCommand };
}
