import { useEffect, useState } from 'react';
import { MonitorService } from '../../services';
import ICEProgressBar from '../ICEProgressBar';

export default function Monitor() {
  const [monitorEnabled, setMonitorEnabled] = useState(false);
  const [iceMap, setIceMap] = useState({});

  const setIceValue = (iceName: string, value: number) => {
    setIceMap((oldMap) => ({
      ...oldMap,
      [iceName]: value,
    }));
  };

  useEffect(() => {
    MonitorService.init({ setIceValue, setIceMap, setMonitorEnabled });
  }, [setIceValue]);

  if (!monitorEnabled) return <div />;

  return (
    <div className="monitor">
      {Object.keys(iceMap).map((key, index) => {
        return (
          <ICEProgressBar key={key} shift={index} value={iceMap[key]}>
            {key}
          </ICEProgressBar>
        );
      })}
    </div>
  );
}
