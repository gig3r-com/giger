import { createRoot } from 'react-dom/client';
import Overlay from '../../components/Overlay';
import { CommandsService } from '../index';

export default class OverlayService {
  private closeOverlayModal: any;

  public setActiveQuest: any;

  private setModal: any;

  constructor() {
    const container = document.getElementById('overlay') as HTMLElement;
    const root = createRoot(container);
    root.render(<Overlay />);
  }

  init({ closeOverlayModal, setModal, setActiveQuest }) {
    this.closeOverlayModal = closeOverlayModal;
    this.setModal = setModal;
    this.setActiveQuest = setActiveQuest;
  }

  initializeModal(modalNumber: number) {
    CommandsService.setInputDisabled(true);
    this.setModal(modalNumber);
  }

  closeModal() {
    CommandsService.setInputDisabled(false);
    this.closeOverlayModal();
  }
}
