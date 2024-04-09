import { useState, useEffect } from 'react';

export default function useDebugMode() {
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    // @ts-ignore
    window.config = {
      gigerApiUrl: 'http://localhost:5174/api',
      gigerUrl: 'http://localhost:5174',
    };

    if (debugMode) {
      console.log('debug mode is on');
      // @ts-ignore
      window.debugMode = new DebugModeHandler();
    } else {
      console.log('debug mode is off');
      // @ts-ignore
      window.debugMode = null;
    }
  }, [debugMode]);

  const toggleDebugMode = () => {
    setDebugMode(!debugMode);
  };

  return {
    debugMode,
    toggleDebugMode,
  };
}

class DebugModeHandler {}
