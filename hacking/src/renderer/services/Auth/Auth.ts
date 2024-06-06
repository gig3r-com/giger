import { ApiService } from '../index';
import { loginFailed } from '../../Terminal/responseLines/login';
import Console from '../Console';
import { ProfileType } from '../../types';

export default class Auth {
  private username: string;

  public isLoggedIn: boolean = true;

  public hackerData: ProfileType = {};

  async init() {
    if (this.isLoggedIn) {
      return;
    }
    await new Promise(async (resolve, reject) => {
      const userName = await Console.engageDirectInput(
        'To login enter your username: ',
      );
      const password = await Console.engageDirectInput(
        'To login enter your password: ',
      );
      if (userName && password) {
        this.enterUsername(userName);
        this.login(password);
        resolve();
      }
    });
  }

  enterUsername(username: string) {
    this.username = username;
  }

  async login(password: string) {
    try {
      Console.setInputLoading(true);
      const hackerData = await ApiService.login(this.username, password);
      console.log(hackerData);
      this.isLoggedIn = true;
      this.setHackerData(hackerData);
      Console.setInputPrefix(hackerData.hackerName);
    } catch (error) {
      Console.addLines(loginFailed);
      if (error?.response?.data && typeof error?.response?.data === 'string') {
        Console.addLines([error?.response?.data]);
      }
      Console.setInputLoading(false);
    }
  }

  logout() {}

  getHackerData() {
    this.hackerData = localStorage.getItem('hackerData');
    return JSON.parse(this.hackerData);
  }

  setHackerData(hackerData: ProfileType) {
    this.hackerData = hackerData;
    localStorage.setItem('hackerData', JSON.stringify(hackerData));
  }
}
