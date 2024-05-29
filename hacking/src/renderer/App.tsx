import Terminal from './Terminal';
import './App.scss';
import { useEffect } from 'react';
// import Console from './2.0/services/Console';

String.prototype.replaceLast = function (what, replacement) {
  const pcs = this.split(what);
  const lastPc = pcs.pop();
  return pcs.join(what) + replacement + lastPc;
};

export default function App() {
  return <Terminal />;

  // useEffect(() => {
  //   const consoleContainer = document.getElementById('console') as HTMLElement;
  //   Console.init(consoleContainer);
  // }, []);
  // return (
  //   <div>
  //     Hello New World
  //     <div id="console" />
  //   </div>
  // );
}
