import { createRoot } from 'react-dom/client';

export default class QuestService {
  constructor() {
    const container = document.getElementById('monitor') as HTMLElement;
    const root = createRoot(container);
    root.render(<Monitor />);
  }

  init({ setIceValue, setIceMap, setMonitorEnabled }) {
    this.setValue = setIceValue;
    this.setIceMap = setIceMap;
    this.setMonitorEnabled = setMonitorEnabled;
  }
}
