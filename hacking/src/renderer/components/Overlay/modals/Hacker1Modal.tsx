import { OverlayService } from '../../../services';

export default function Hacker1Modal({ close }) {
  return (
    <div className="quest-modal">
      <div>Welcome <span className="secondary-color">Kimberly Smart</span></div>
      <div>Username: <span className="secondary-color">smart_one</span></div>
      <div>Password: <span className="secondary-color">beginnings</span></div>
      <button onClick={OverlayService.resetHacker1}>reset</button>
      <button onClick={close}>close</button>
    </div>
  );
}
