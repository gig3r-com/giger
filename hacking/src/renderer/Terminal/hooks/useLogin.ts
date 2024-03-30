import { useEffect, useState } from 'react';
import ApiService from '../../apiService/apiService';
import { loginSuccessful } from '../responseLines/login';

type UseLoginType = {
  setInputDisabled: (value: boolean) => void;
  addLines: (lines: string[]) => void;
  setPrefixType: (value: string) => void;
};

export default function useLogin({
  setInputDisabled,
  addLines,
  setPrefixType,
}: UseLoginType) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [username, setUsername] = useState<string>('');
  function enterPassword(password: string): void {
    setInputDisabled(true);
    if (username === 'test' && password === 'test') {
      setUsername('');
      ApiService.getActiveUserProfile('acriveHacker').then(
        (hackerData: any) => {
          window.electron.ipcRenderer.sendMessage('login', hackerData);
          localStorage.setItem('activeUserId', hackerData.id);
          setUserData(hackerData);
          setIsLoggedIn(true);
          setInputDisabled(false);
          setPrefixType(hackerData.hackerName);
          addLines(loginSuccessful(hackerData.hackerName));
        },
      );
    }
  }

  function logout() {
    window.electron.ipcRenderer.sendMessage('logout');
    setUserData(null);
    setIsLoggedIn(false);
  }

  useEffect(() => {
    window.electron.ipcRenderer.once('getUser', (startUserData: any) => {
      setUserData(startUserData);
      if (startUserData && typeof startUserData.id === 'string') {
        setIsLoggedIn(true);
      }
    });

    window.electron.ipcRenderer.sendMessage('getUser', 'user');
  }, []);

  return { enterPassword, isLoggedIn, logout, username, setUsername, userData };
}
