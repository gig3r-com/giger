import { createRoot } from 'react-dom/client';
import Monitor from '../../components/Monitor';

export default class MonitorService {
  public setValue: any;

  public setIceMap: any;

  private setMonitorEnabled: any;

  public monitorEnabled: boolean = false;

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

  setICEValue(ICEName, value) {
    if (value > 100) this.setValue(ICEName, 100);
    else if (value < 0) this.setValue(ICEName, 0);
    else this.setValue(ICEName, value);
  }

  clearICE() {
    this.setIceMap({});
  }

  enableMonitor() {
    this.monitorEnabled = true;
    this.setMonitorEnabled(true);
  }

  disableMonitor() {
    this.monitorEnabled = false;
    this.setMonitorEnabled(false);
  }
}
