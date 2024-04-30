import { CommandsService, OverlayService, ApiService, } from '../index';

type QuestsTypes = 0;

export default class DebugService {
  debugMode: boolean = false;

  resetQuest = this.reset.bind(this);

  keyDownListener = (e) => {
    const { key, altKey, ctrlKey } = e;
    if (key === 'F4' && altKey) {
      e.preventDefault();
    }
    if (key === 'F11') {
      e.preventDefault();
    }
    if (!this.debugMode && key === 'i' && ctrlKey) {
      e.preventDefault();
    }
  };

  constructor() {
    window.addEventListener('keydown', this.keyDownListener);
  }

  toggleDebugMode(): void {
    this.debugMode = !this.debugMode;
    window.removeEventListener('keydown', this.keyDownListener);
    window.addEventListener('keydown', this.keyDownListener);
    console.log('Debug mode:', this.debugMode);
  }

  initializeQuest(questNumber: QuestsTypes) {
    this.closeModal();
    this.resetQuest(questNumber);
    OverlayService.initializeModal(questNumber);
  }

  startQuest(questNumber: QuestsTypes) {
    this.closeModal();
    OverlayService.setActiveQuest(questNumber);
  }

  closeModal() {
    OverlayService.closeModal();
  }

  async reset(questNumber: QuestsTypes = 0) {
    try {
      const { hackerId, hackerName, startExploits } =
        this.questsData[questNumber];
      await ApiService.resetExploits(hackerId, startExploits);
      await ApiService.resetHackingName(hackerId, hackerName);
      CommandsService.logout();
      CommandsService.setLines([]);
    } catch (err) {
      console.error(err);
    }
  }

  questsData = {
    0: {
      hackerId: 'a4546040-830f-40a3-b98b-4ef4895ada48',
      hackerName: 'smart_one',
      startExploits: [],
      privateRecords: [ '90cf1420-9941-4fa8-a7fc-9e1bf0584d3e', '90cf1420-9941-4fa8-a7fc-9e1bf0584d3e'],
    },
  };
}
