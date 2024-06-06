import { ReactElement, useEffect, useState } from 'react';
import Hacker1Modal from './modals/Hacker1Modal';
import ICEModal from './modals/ICEModal';
import NewDirectoryModeModal from './modals/NewDirectoryModeModal';
import Console from '../../services/Console';
import Overlay from '../../services/Overlay';

const modalTable = {
  0: Hacker1Modal,
  1: NewDirectoryModeModal,
  99: ICEModal,
};

export default function OverlayComponent() {
  const [modalInside, setModalInside] = useState<ReactElement | null>(null);
  const [activeQuest, setActiveQuest] = useState<0 | null>(null);

  const closeModal = () => {
    Console.setInputLoading(false);
    setModalInside(null);
  };

  const showQuest = () => {
    if (!activeQuest) {
      return;
    }
    const Modal = modalTable[activeQuest];
    if (Modal) {
      Console.setInputLoading(true);
      setModalInside(<Modal testIsActive />);
    }
  };

  const setModal = (modalNumber: number, message?: string) => {
    const Modal = modalTable[modalNumber];
    if (Modal) {
      Console.setInputLoading(true);
      setModalInside(<Modal message={message} />);
    }
  };

  useEffect(() => {
    Overlay.init({
      closeOverlayModal: closeModal,
      setModal,
      setActiveQuest,
    });
  }, [setModalInside]);

  return (
    <div className="overlay">
      <div className="menu">
        {typeof activeQuest === 'number' ? (
          <button onClick={showQuest}>Show Test Information</button>
        ) : (
          ''
        )}
      </div>
      {modalInside ? <div className="modal">{modalInside}</div> : null}
    </div>
  );
}
