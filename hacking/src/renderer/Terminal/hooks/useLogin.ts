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
    ApiService.getActiveUserProfile(username, password)
      .then(async (hackerData: any) => {
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
      .catch(() => {
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

  return { enterPassword, isLoggedIn, logout, username, setUsername, userData };
}
