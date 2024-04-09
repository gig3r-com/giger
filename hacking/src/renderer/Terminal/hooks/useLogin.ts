import { useEffect, useState } from 'react';
import ApiService from '../../apiService/apiService';
import { loginSuccessful } from '../responseLines/login';
import { getLoginUserData, setLoginUserData } from '../utils/store';

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
      ApiService.getActiveUserProfile('activeHacker').then(
        (hackerData: any) => {
          setLoginUserData(hackerData);
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
