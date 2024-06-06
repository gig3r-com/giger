// eslint-disable-next-line import/no-cycle
import Console from '../index';

export const canTabSelector = 'data-can-tab';
const selectedTabClass = 'selected-color';

export const clearTab = () => {
  const elements = document.querySelectorAll(`[${canTabSelector}]`);
  elements.forEach((element) => element.classList.remove(selectedTabClass));
};
const selectTab = (element: HTMLElement, prevText: string) => {
  if (!element) return;
  element.classList.add(selectedTabClass);
  if (prevText) {
    Console.setInputValue(
      // @ts-ignore
      Console.inputValue.replaceLast(prevText, '') + element.textContent,
    );
  } else if (
    element &&
    element.textContent &&
    element.textContent.includes(element.textContent)
  ) {
    Console.setInputValue(
      // @ts-ignore
      Console.inputValue.replaceLast(element.textContent, '') +
        element.textContent,
    );
  }
};

const unselectTab = (element: HTMLElement) => {
  element.classList.remove(selectedTabClass);
};

export const tab = (event: KeyboardEvent) => {
  const elements = document.querySelectorAll(`[${canTabSelector}]`);
  if (!elements.length) return;
  let foundElement = '';
  let noSelected = true;

  if (event.ctrlKey) {
    // eslint-disable-next-line no-plusplus
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
    // eslint-disable-next-line no-plusplus
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
