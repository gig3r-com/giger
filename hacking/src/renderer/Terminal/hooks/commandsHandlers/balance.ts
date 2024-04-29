type UseBalanceCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (line: string[] | string) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export function useBalanceCommands({
  addLines,
  addErrors,
  setInputDisabled,
}: UseBalanceCommandsType) {
  const executeBalanceCommand = async (parsedCommand: string[]) => {
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

  return { executeBalanceCommand };
}
