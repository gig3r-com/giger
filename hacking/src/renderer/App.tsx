import Terminal from './Terminal';
import './App.scss';

String.prototype.replaceLast = function (what, replacement) {
  const pcs = this.split(what);
  const lastPc = pcs.pop();
  return pcs.join(what) + replacement + lastPc;
};

export default function App() {
  return <Terminal />;
}
