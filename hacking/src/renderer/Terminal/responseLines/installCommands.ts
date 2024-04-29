export const provideKeyLines: string[] = [
  'Please provide a valid installation key.',
];

export const keyIncorrectLines: string[] = ['Provided key is incorrect.'];

export function makeProgramAddedLines(programName: string) {
  return [
    `Program <span class="secondary-color">${programName}</span> added.`,
    `To check it please use LIST PROG command.`,
  ];
}
