import { useEffect } from 'react';
import {ServerConnectionService} from "../../services";

type Device = {
  productId: number;
};
const accessPointConfig = [
  {
    accessPoint: {
      name: 'CombatZoneAC',
      type: 'red',
      place: 'combat zone',
      number: 0,
    },
    device: {
      manufacturerName: 'USB',
      productId: 11303,
      productName: 'USB Keyboard',
      vendorId: 6700,
    },
  },
];

const checkDevices = (deviceToCheck) => {
  const accessPoints = accessPointConfig;
  return accessPoints.filter((accessPoint) => {
    const { device } = accessPoint;
    return device.manufacturerName === deviceToCheck.manufacturerName &&
      device.productName === deviceToCheck.productName &&
      device.vendorId === deviceToCheck.vendorId &&
      device.productId === deviceToCheck.productId;
  });
}
// @ts-ignore
export default function useAccessPointHandler({ setAccessPoint }) {
  useEffect(() => {
    window.electron.ipcRenderer.on('devices', (devicesString: string) => {
      const devices = JSON.parse(devicesString);
      if (devices && devices.length) {
        console.log(devices)
        const foundDevices = [];
        devices.forEach((device: Device) => {
          const selectedDevice = checkDevices(device);
          if (selectedDevice.length) {
            foundDevices.push(selectedDevice[0]);
          }
        });
        if (!foundDevices.length) {
          setAccessPoint(null);
          ServerConnectionService.accessPoint = null;
        }
        setAccessPoint(foundDevices[0].accessPoint?.name);
        ServerConnectionService.accessPoint = foundDevices[0].accessPoint;
      }
    });
  }, []);

  return { test: 1 };
}
