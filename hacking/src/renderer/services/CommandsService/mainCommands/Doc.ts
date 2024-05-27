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
      addLines(this.documents.doc);
      return;
    }

    if (typeof this.documents[parsedCommand[0]] === 'function') {
      addLines(this.documents[parsedCommand[0]]());
    } else if (Array.isArray(this.documents[parsedCommand[0]])) {
      addLines(this.documents[parsedCommand[0]]);
    } else {
      addLines(noDocumentationError);
    }
  }

  documents: { [key: string]: DocType } = {
    // Commands
    doc: DOCUMENTATIONS.DOC,
    help: DOCUMENTATIONS.DOC,
    name: DOCUMENTATIONS.NAME,
    profile: DOCUMENTATIONS.PROFILE,
    clear: DOCUMENTATIONS.CLEAR,
    logout: DOCUMENTATIONS.LOGOUT,
    end: DOCUMENTATIONS.END,
    list: DOCUMENTATIONS.LIST,
    scan: DOCUMENTATIONS.SCAN,
    install: DOCUMENTATIONS.INSTALL,
    run: DOCUMENTATIONS.RUN,
    copydata: DOCUMENTATIONS.COPY_DATA,

    // Exploits
    sledgehammer: DOCUMENTATIONS.SLEDGEHAMMER,
    worm: DOCUMENTATIONS.WORM,
    termite: DOCUMENTATIONS.TERMITE,
    scanner_v1: DOCUMENTATIONS.SCANNER_V1,
    scanner_v2: DOCUMENTATIONS.SCANNER_V2,
    scanner_v3: DOCUMENTATIONS.SCANNER_V3,
    cybercracker: DOCUMENTATIONS.CYBERCRACKER,
    wizardsbook: DOCUMENTATIONS.WIZARDSBOOK,
    tinweasel: DOCUMENTATIONS.TINWEASEL,
    reflector: DOCUMENTATIONS.REFLECTOR,
    witchdoctor: DOCUMENTATIONS.WITCH_DOCTOR,
    hotwire: DOCUMENTATIONS.HOTWIRE,
    replicator: DOCUMENTATIONS.REPLICATOR,
    invisibilityspell: DOCUMENTATIONS.INVISIBILITY_SPELL,
    monitor: DOCUMENTATIONS.MONITOR,
    gigergate: DOCUMENTATIONS.GIGER_GATE,
    bluemirror: DOCUMENTATIONS.BLUE_MIRROR,

    // Defence programs
    encryptguard: DOCUMENTATIONS.ENCRYPT_GUARD,
    firewallx: DOCUMENTATIONS.FIREWALL_X,
    virtualvault: DOCUMENTATIONS.VIRTUAL_VAULT,
    forcefield: DOCUMENTATIONS.FORCE_FIELD,
    eviltwin: DOCUMENTATIONS.EVIL_TWIN,
    joanofarc: DOCUMENTATIONS.JOAN_OF_ARC,
    cleaner: DOCUMENTATIONS.CLEANER,
    ping_v1: DOCUMENTATIONS.PING1,
    ping_v2: DOCUMENTATIONS.PING2,
    ping_v3: DOCUMENTATIONS.PING3,
    boost: DOCUMENTATIONS.BOOST,
    kicker: DOCUMENTATIONS.KICKER,
    blocker: DOCUMENTATIONS.BLOCKER,
    locker: DOCUMENTATIONS.LOCKER,
    killer: DOCUMENTATIONS.KILLER,

    // Program types
    program: DOCUMENTATIONS.PROGRAM,
    exploit: DOCUMENTATIONS.EXPLOIT,
    defenceprogram: DOCUMENTATIONS.DEFENCE_PROGRAM,
    scanner: DOCUMENTATIONS.SCANNER,
    breacher: DOCUMENTATIONS.BREACHER,
    decrypter: DOCUMENTATIONS.DECRYPTER,
    disabler: DOCUMENTATIONS.DISABLER,
    firewall: DOCUMENTATIONS.FIREWALL,
    osencrypter: DOCUMENTATIONS.OS_ENCRYPTER,
    encrypter: DOCUMENTATIONS.OS_ENCRYPTER,
    ice: DOCUMENTATIONS.ICE,

    // Other
    network: DOCUMENTATIONS.NETWORK,
    subnetwork: DOCUMENTATIONS.SUBNETWORK,
    netops: DOCUMENTATIONS.NETOPS,
    ap: DOCUMENTATIONS.AP,
    accesspoint: DOCUMENTATIONS.AP,
    accesspoints: DOCUMENTATIONS.AP,
  };
}

type DocType = string[] | (() => string[]);
