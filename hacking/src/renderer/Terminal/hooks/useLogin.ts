import { useEffect, useState } from 'react';
import { ApiService } from '../../services';
import { loginSuccessful, loginFailed } from '../responseLines/login';
import { getLoginUserData, setLoginUserData } from '../utils/store';
import initialization from '../utils/initialization';

type UseLoginType = {
  setInputDisabled: (value: boolean) => void;
  addLines: (lines: string[]) => void;
  setPrefixType: (value: string) => void;
  removeLastLine: () => void;
};

export default function useLogin({
  setInputDisabled,
  addLines,
  setPrefixType,
  removeLastLine,
}: UseLoginType) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [username, setUsername] = useState<string>('');
  function enterPassword(password: string): void {
    setInputDisabled(true);
    setUsername('');
    ApiService.login(username, password)
      .then(async (hackerData) => {
        setLoginUserData(hackerData);
        setUserData(hackerData);
        setIsLoggedIn(true);
        setInputDisabled(false);
        setPrefixType(hackerData.hackerName);
        await initialization({
          addLines,
          setInputDisabled,
          removeLastLine,
          hackerName: hackerData.hackerName,
        });
      })
      .catch((err) => {
        console.log(err)
        addLines(loginFailed);
        setInputDisabled(false);
      });
  }

  function logout() {
    setLoginUserData(null);
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const loginUserData = getLoginUserData();
    if (loginUserData && loginUserData.id) {
      setIsLoggedIn(true);
    }
  }, []);

  function setLogin(value: string) {
    if (value === 'exit') {
      window.close();
    } else {
      setUsername(value);
    }
  }

  return { enterPassword, isLoggedIn, logout, username, setUsername: setLogin, userData };
}
