import { useEffect } from 'react';

type Device = {
  productId: number;
};

type AccessPoint = string;
type AccessPointTable = {
  [key: string]: AccessPoint;
};

const accessPoints: AccessPointTable = {
  49271: 'logitech',
};
// @ts-ignore
export default function useAccessPointHandler({ setAccessPoint }) {
  useEffect(() => {
    window.electron.ipcRenderer.on('devices', (devicesString: string) => {
      const devices = JSON.parse(devicesString);
      if (devices && devices.length) {
        let acDetected = false;
        devices.forEach((device: Device) => {
          if (Object.keys(accessPoints).includes(device.productId.toString())) {
            setAccessPoint(accessPoints[device.productId]);
            acDetected = true;
          }
        });
        if (!acDetected) {
          setAccessPoint(null);
        }
      }
    });
  });

  return { test: 1 };
}
