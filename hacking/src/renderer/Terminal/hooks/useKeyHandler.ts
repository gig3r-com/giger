import {ApiService, CommandsService, OverlayService, ServerConnectionService} from '../../services';

export const canTabSelector = 'data-can-tab';
const selectedTabClass = 'selected-color';

type KeyHandlerType = {
  addUserLine: (value: string) => void;
  setInput: (value: string) => void;
  userLines: string[];
  input: string;
  username: string;
  isLoggedIn: boolean;
  setUsername: (value: string) => void;
  enterPassword: (value: string) => void;

  addLines: any;
};

export default function useKeyHandler({
  username,
  isLoggedIn,
  setUsername,
  enterPassword,
  addUserLine,
  setInput,
  userLines,
  input,
  addLines,
}: KeyHandlerType) {
  const clear = () => {
    const elements = document.querySelectorAll(`[${canTabSelector}]`);
    elements.forEach((element) => element.classList.remove(selectedTabClass));
  };
  const selectTab = (element: HTMLElement, prevText: string) => {
    if (!element) return;
    element.classList.add(selectedTabClass);
    if (prevText) {
      // @ts-ignore
      setInput(input.replaceLast(prevText, '') + element.textContent);
    } else if (
      element &&
      element.textContent &&
      element.textContent.includes(element.textContent)
    ) {
      setInput(
        // @ts-ignore
        input.replaceLast(element.textContent, '') + element.textContent,
      );
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
          // @ts-ignore
          selectTab(elements[i], foundElement);
          foundElement = '';
          noSelected = false;
        } else if (elements[i].classList.contains(selectedTabClass)) {
          // @ts-ignore
          unselectTab(elements[i]);
          foundElement = elements[i].textContent || '';
        }
      }

      if (noSelected) {
        // @ts-ignore
        selectTab(elements[0], elements[elements.length - 1].textContent);
      }
    } else {
      for (let i = elements.length - 1; i >= 0; i--) {
        if (foundElement) {
          // @ts-ignore
          selectTab(elements[i], foundElement);
          foundElement = '';
          noSelected = false;
        } else if (elements[i].classList.contains(selectedTabClass)) {
          // @ts-ignore
          unselectTab(elements[i]);
          foundElement = elements[i].textContent || '';
        }
      }

      if (noSelected) {
        // @ts-ignore
        selectTab(elements[elements.length - 1], elements[0].textContent);
      }
    }
  };

  const enter = () => {
    if (isLoggedIn) {
      addUserLine(input);
      CommandsService.executeCommand(input);
      // executeCommand(input);
    } else if (username) {
      enterPassword(input);
    } else {
      setUsername(input);
    }
    setInput('');
    clear();
  };

  const space = () => {
    clear();
  };

  const upArrow = (event: KeyboardEvent) => {
    setInput(userLines[userLines.length - 1]);
    event.preventDefault();
  };

  const c = (event: KeyboardEvent) => {
    if (!isLoggedIn && username && event.ctrlKey) {
      setUsername('');
      event.preventDefault();
      setInput('');
    }
  };

  const f9 = async (event: KeyboardEvent) => {
    addLines([``]);
    addLines([`Ping v.3.12 ICE targeting successfully!`]);
    // addLines([`We have found you <span class="secondary-color">hackerman</span>!`]);
    // OverlayService.iceModal('Warning: ICE deployed');
    console.log('test');
    const subnet = await ApiService.getSubnetworkById('0fa73ad8-1b59-4c54-8fe2-55c473f36fc0');
    console.log('test2');
    ServerConnectionService.setupConnectedSubnetwork(subnet);
    console.log('test3');
    await ApiService.sendPingMsg();
    console.log('test4');
  };

  const keyMap: { [key: number]: (event: KeyboardEvent) => void } = {
    9: tab,
    13: enter,
    32: space,
    38: upArrow,
    67: c,
    // 120: f9,
  };

  const handleKey = (event: KeyboardEvent) => {
    const keyAction = keyMap[event.keyCode];
    if (!keyAction || typeof keyAction !== 'function') return;
    keyAction(event);
  };

  return { handleKey };
}
