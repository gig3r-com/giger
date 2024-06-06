import { createRoot } from 'react-dom/client';
import { Input, Output } from '../components';

export const renderConsole = (container: HTMLElement) => {
  const inputRoot = createRoot(container);
  inputRoot.render(
    <>
      <Output />
      <Input />
    </>,
  );
};
