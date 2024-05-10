export default class LineStateService {
  private addLines: any;

  private directInput: any;

  private setDirectInput: any;

  private setEnableDirectInput: any;

  private enableDirectInput: any;

  private handleKey: any;

  private enter: any;

  constructor() {}

  init({
    addLines,
    directInput,
    setDirectInput,
    enableDirectInput,
    setEnableDirectInput,
    handleKey,
  }) {
    this.addLines = addLines;
    this.directInput = directInput;
    this.setDirectInput = setDirectInput;
    this.enableDirectInput = enableDirectInput;
    this.setEnableDirectInput = setEnableDirectInput;
    this.handleKey = handleKey;
  }

  public getDirectLine = (startLine: string | string[]): Promise<string> => {
    this.addLines(Array.isArray(startLine) ? startLine : [startLine]);
    this.setEnableDirectInput(true);

    return new Promise<string>((resolve) => {
      this.enter = () => {
        const resolveInput = this.directInput;
        this.setEnableDirectInput(false);
        this.setDirectInput('');
        resolve(resolveInput);
      };
    });
  };

  public handleDirectKey = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      this.enter(event);
    } else {
      this.handleKey(event);
    }
  };
}
