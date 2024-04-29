import type CommandsServiceType from '../CommandsService';
import { noDocumentationError } from '../responseLines/errors';
import * as DOCUMENTATIONS from '../responseLines/documentations';

export default class Doc {
  private Service: CommandsServiceType;

  constructor(CommandsService: CommandsServiceType) {
    this.Service = CommandsService;
  }

  execute() {
    const { parsedCommand, addLines, fireInitError } = this.Service;
    if (!addLines) {
      fireInitError();
      return;
    }

    if (!this.documents[parsedCommand[0]]) {
      addLines(noDocumentationError);
      return;
    }
    if (typeof this.documents[parsedCommand[0]] === 'function') {
      addLines(this.documents[parsedCommand[0]]());
    } else if (Array.isArray(this.documents[parsedCommand[0]])) {
      addLines(this.documents[parsedCommand[0]]);
    }
  }

  documents: { [key: string]: [lines: string[] | (() => string[])] } = {
    name: DOCUMENTATIONS.NAME,
    profile: DOCUMENTATIONS.PROFILE,
    clear: DOCUMENTATIONS.CLEAR,
    logout: DOCUMENTATIONS.LOGOUT,
    end: DOCUMENTATIONS.END,
    list: DOCUMENTATIONS.LIST,
    scan: DOCUMENTATIONS.SCAN,
    install: DOCUMENTATIONS.INSTALL,

    sledgehammer: DOCUMENTATIONS.SLEDGEHAMMER,
    scanner_v1: DOCUMENTATIONS.SCANNER_V1,
  };
}
