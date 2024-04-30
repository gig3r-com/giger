export function getNewNameLines(name: string): string[] {
  return [`CIC Terminal name changed to: ${name}`];
}
export function getDisconectMessage(subnetworkName: string): string[] {
  return [`Your connection to ${subnetworkName} has been terminated`];
}

export function getRecordCopiedMessage(recordTitle: string): string[] {
  return [`Record ${recordTitle} has been copied to your profile.`];
}
