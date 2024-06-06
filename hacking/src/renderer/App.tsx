import Terminal from './Terminal';
import './App.scss';
import { useEffect } from 'react';
import Console from './services/Console';
import Auth from './services/Auth';
import Directory from './services/Directory';
import Overlay from './services/Overlay';

String.prototype.replaceLast = function (what, replacement) {
  const pcs = this.split(what);
  const lastPc = pcs.pop();
  return pcs.join(what) + replacement + lastPc;
};

export default function App() {
  // return <Terminal />;

  useEffect(() => {
    const consoleContainer = document.getElementById('console') as HTMLElement;
    Console.init(consoleContainer).then(() => {
      Auth.init().then(() => {
        Console.setInputLoading(true);
        Directory.build().then(() => {
          Console.setInputLoading(false);
          Overlay.initializeModal(1);
        });
      });
    });
  }, []);
  return (
    <div>
      <div id="console" />
    </div>
  );
}
