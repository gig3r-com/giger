import { INPUT_ID } from '../constants';

export const setupWindowListener = () => {
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (
      event.keyCode === 19 ||
      event.ctrlKey ||
      event.altKey ||
      event.metaKey ||
      event.shiftKey
    ) {
      return;
    }
    const inputRef = document.getElementById(INPUT_ID);
    if (!inputRef) return;
    inputRef.focus();
  });
};
