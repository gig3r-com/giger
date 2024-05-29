import React, { useEffect, useState } from 'react';
import Console from '../index';
import { INPUT_ID } from '../constants';

export default function Input() {
  const [value, setValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const onChange = (event) => {
    setValue(event?.target?.value);
  };

  useEffect(() => {
    Console.setInputValue = setValue;
  }, []);

  return <textarea id={INPUT_ID} rows={1} value={value} onChange={onChange} />;
}
