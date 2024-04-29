type UseTransferCommandsType = {
  addLines: (lines: string[]) => void;
  addErrors: (line: string[] | string) => void;
  setInputDisabled: (inputDisabled: boolean) => void;
};

export function useTransferCommands({
  addLines,
  addErrors,
  setInputDisabled,
}: UseTransferCommandsType) {
  const executeTransferCommand = async (parsedCommand: string[]) => {
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

  return { executeTransferCommand };
}
