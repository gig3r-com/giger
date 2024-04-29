import { createRoot } from 'react-dom/client';
import Overlay from '../../components/Overlay';
import { ApiService, CommandsService } from '../index';

export default class OverlayService {
  private setModalText: any;

  public resetHacker1 = () => this.reset.bind(this)('hacker1');

  constructor() {
    const container = document.getElementById('overlay') as HTMLElement;
    const root = createRoot(container);
    root.render(<Overlay />);
  }

  init({ setModalText }) {
    this.setModalText = setModalText;
  }

  async reset(option: string) {
    try {
      await ApiService.resetExploits(this.resetOptions[option].exploits);
      await ApiService.changeActiveUserHackingName(
        this.resetOptions[option].hackingName,
      );
      CommandsService.logout();
      CommandsService.setLines([]);
      this.setModalText('');
    } catch (err) {
      console.error(err);
    }
  }

  resetOptions = {
    hacker1: {
      hackingName: 'smart_one',
      exploits: [],
    },
  };
}
