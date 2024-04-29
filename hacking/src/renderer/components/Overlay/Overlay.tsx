import { useEffect, useState } from 'react';
import { OverlayService } from '../../services';
import Hacker1Modal from './modals/Hacker1Modal';

export type QuestTypes = 'none' | 'hacker_1';

export default function Overlay() {
  const [modalText, setModalText] = useState<any>('');
  const [activeQuest, setActiveQuest] = useState<QuestTypes>('hacker_1');

  const closeModal = () => {
    setModalText('');
  };
  const showQuest = () => {
    setModalText(<Hacker1Modal close={closeModal} />);
  };

  useEffect(() => {
    OverlayService.init({ setModalText });
  }, [setModalText]);

  return (
    <div className="overlay">
      <div className="menu">
        <button onClick={showQuest}>Show Quest</button>
      </div>
      {modalText ? <div className="modal">{modalText}</div> : null}
    </div>
  );
}
