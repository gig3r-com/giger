import { createRoot } from 'react-dom/client';
import OverlayComponent from '../../components/Overlay';
import Console from '../Console';

export default class Overlay {
  private closeOverlayModal: any;

  public setActiveQuest: any;

  private setModal: any;

  constructor() {
    const container = document.getElementById('overlay') as HTMLElement;
    const root = createRoot(container);
    root.render(<OverlayComponent />);
  }

  init({ closeOverlayModal, setModal, setActiveQuest }) {
    console.log(closeOverlayModal);
    this.closeOverlayModal = closeOverlayModal;
    this.setModal = setModal;
    this.setActiveQuest = setActiveQuest;
  }

  initializeModal = (modalNumber: number) => {
    Console.setInputLoading(true);
    this.setModal(modalNumber);
  };

  closeModal = () => {
    Console.setInputLoading(false);
    this.closeOverlayModal();
  };

  iceModal(message: string) {
    this.setModal(99, message);
  }
}
