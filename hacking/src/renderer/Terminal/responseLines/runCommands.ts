export const connectingLines = (subnetworkName: string) => [
  `Establishing connection to subnetwork <span class="secondary-color">${subnetworkName}</span>`,
];

export const connectingFailedLines = [
  'Breaches failure! Connection was not established.',
];

export const connectingSuccessLines = ['Connection succeeded'];

export const decryptingLines = () => ['Decrypting'];

export const decryptingSuccessLines = ['Decryption succeeded'];

export const decryptingFailedLines = ['Decryption failed'];
