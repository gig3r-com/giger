import { useEffect, useState } from 'react';
import {CommandsService, OverlayService} from '../../services';
import Hacker1Modal from './modals/Hacker1Modal';

export default function Overlay() {
  const [modalInside, setModalInside] = useState<any>('');
  const [activeQuest, setActiveQuest] = useState<0 | null>(null);

  const closeModal = () => {
    CommandsService.setInputDisabled(false);
    setModalInside('');
  };

  const showQuest = () => {
    if (activeQuest === 0) {
      CommandsService.setInputDisabled(true);
      setModalInside(<Hacker1Modal testIsActive />);
    }
  };

  const setModal = (modalNumber: number) => {
    if (modalNumber === 0) {
      setModalInside(<Hacker1Modal testIsActive={false} />);
    }
  };

  useEffect(() => {
    OverlayService.init({
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
