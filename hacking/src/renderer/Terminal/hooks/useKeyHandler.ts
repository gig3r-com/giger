import {
  ApiService,
  CommandsService,
  OverlayService,
  ServerConnectionService,
} from '../../services';

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
    // getOwned
    const id = '5e25cc44-2278-4050-b59d-006f2bcaf8a6';
    // await ApiService.addFirewallToSubnetwork(id, 'ENCRYPT_GUARD');
    await ApiService.addFirewallToSubnetwork(id, 'FIREWALL_X');
    // await ApiService.addFirewallToSubnetwork(id, 'VIRTUAL_VAULT');

    // await ApiService.addSystemToSubnetwork(id, 'FORCE_FIELD');
    await ApiService.addSystemToSubnetwork(id, 'EVIL_TWIN');
    // await ApiService.addSystemToSubnetwork(id, 'JOAN_OF_ARC');

    // await ApiService.addICEToSubnetwork(id, 'CLEANER');
    // await ApiService.addICEToSubnetwork(id, 'PING1');
    await ApiService.addICEToSubnetwork(id, 'PING2');
    // await ApiService.addICEToSubnetwork(id, 'PING3');
    // await ApiService.addICEToSubnetwork(id, 'BOOST');
    // await ApiService.addICEToSubnetwork(id, 'KICKER');
    // await ApiService.addICEToSubnetwork(id, 'BLOCKER');
    await ApiService.addICEToSubnetwork(id, 'LOCKER');
    // await ApiService.addICEToSubnetwork(id, 'KILLER');
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
