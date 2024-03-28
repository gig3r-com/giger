export const canTabSelector = 'data-can-tab';
const selectedTabClass = 'selected-color';

type KeyHandlerType = {
  addUserLine: (value: string) => void;
  setInput: (value: string) => void;
  executeCommand: (command: string) => void;
  userLines: string[];
  input: string;
};

export default function useKeyHandler({
  addUserLine,
  setInput,
  executeCommand,
  userLines,
  input,
}: KeyHandlerType) {
  const clear = () => {
    const elements = document.querySelectorAll(`[${canTabSelector}]`);
    elements.forEach((element) => element.classList.remove(selectedTabClass));
  };
  const selectTab = (element: HTMLElement, prevText: string) => {
    if (!element) return;
    element.classList.add(selectedTabClass);
    if (prevText) {
      setInput(input.replace(prevText, '') + element.textContent);
    } else if (element.textContent.includes(element.textContent)) {
      setInput(input.replace(element.textContent, '') + element.textContent);
    }
  };

  const unselectTab = (element: HTMLElement) => {
    element.classList.remove(selectedTabClass);
  };

  const tab = (event: KeyboardEvent) => {
    const elements = document.querySelectorAll(`[${canTabSelector}]`);
    if (!elements.length) return;
    let foundElement = '';
    let noSelected = true;

    if (event.ctrlKey) {
      for (let i = 0; i < elements.length; i++) {
        if (foundElement) {
          selectTab(elements[i], foundElement);
          foundElement = '';
          noSelected = false;
        } else if (elements[i].classList.contains(selectedTabClass)) {
          unselectTab(elements[i]);
          foundElement = elements[i].textContent || '';
        }
      }

      if (noSelected) {
        selectTab(elements[0], elements[elements.length - 1].textContent);
      }
    } else {
      for (let i = elements.length - 1; i >= 0; i--) {
        if (foundElement) {
          selectTab(elements[i], foundElement);
          foundElement = '';
          noSelected = false;
        } else if (elements[i].classList.contains(selectedTabClass)) {
          unselectTab(elements[i]);
          foundElement = elements[i].textContent || '';
        }
      }

      if (noSelected) {
        selectTab(elements[elements.length - 1], elements[0].textContent);
      }
    }
  };

  const enter = () => {
    addUserLine(input);
    setInput('');
    clear();
    executeCommand(input);
  };

  const space = () => {
    clear();
  };

  const upArrow = (event: KeyboardEvent) => {
    setInput(userLines[userLines.length - 1]);
    event.preventDefault();
  };

  const keyMap: { [key: number]: (event: KeyboardEvent) => void } = {
    9: tab,
    13: enter,
    32: space,
    38: upArrow,
  };

  const handleKey = (event: KeyboardEvent) => {
    const keyAction = keyMap[event.keyCode];
    if (!keyAction || typeof keyAction !== 'function') return;
    keyAction(event);
  };

  return { handleKey };
}
