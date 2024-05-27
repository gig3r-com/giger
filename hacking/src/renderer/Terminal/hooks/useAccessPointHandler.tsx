import { useEffect } from 'react';
import { ConfigService, ServerConnectionService } from '../../services';

type Device = {
  productId: number;
};

const checkDevices = (deviceToCheck) => {
  const accessPoints = ConfigService.getAC();
  return accessPoints.filter((accessPoint) => {
    const { device } = accessPoint;
    return (
      device.manufacturerName === deviceToCheck.manufacturerName &&
      device.productName === deviceToCheck.productName &&
      device.vendorId === deviceToCheck.vendorId &&
      device.productId === deviceToCheck.productId
    );
  });
};
// @ts-ignore
export default function useAccessPointHandler({ setAccessPoint }) {
  useEffect(() => {
    window?.electron?.ipcRenderer?.on('devices', (devicesString: string) => {
      const devices = JSON.parse(devicesString);
      if (devices && devices.length) {
        console.log(devices);
        const foundDevices = [];
        devices.forEach((device: Device) => {
          const selectedDevice = checkDevices(device);
          if (selectedDevice.length) {
            foundDevices.push(selectedDevice[0]);
          }
        });
        if (!foundDevices.length) {
          ServerConnectionService.disconnect();
          setAccessPoint(null);
          ServerConnectionService.accessPoint = null;
        }
        setAccessPoint(foundDevices[0].accessPoint?.name);
        ServerConnectionService.accessPoint = foundDevices[0].accessPoint;
      } else {
        ServerConnectionService.disconnect();
        setAccessPoint(null);
        ServerConnectionService.accessPoint = null;
      }
    });
  }, []);

  return { test: 1 };
}
