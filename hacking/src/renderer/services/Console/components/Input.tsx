import React, { useEffect, useState } from 'react';
import Console from '../index';
import { INPUT_ID } from '../constants';
import Loader from '../../../components/Loader';

export default function Input() {
  const [value, setValue] = useState<string>('');
  const [prefix, setPrefix] = useState<string>('...:\\>');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(1);
  const [isDirectInput, setEnableDirectInput] = useState(false);
  const [directInputValue, setDirectInputValue] = useState('');

  const onChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event?.target?.value);
  };

  const changeDirectInput = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDirectInputValue(event?.target?.value);
  };

  const setInputLoading = (value: boolean) => {
    Console.isInputLoading = value;
    setIsLoading(value);
  };

  const setInputHidden = (value: boolean) => {
    Console.isInputHidden = value;
    setIsHidden(value);
  };

  useEffect(() => {
    Console.setInputValue = setValue;
    Console.setInputLoading = setInputLoading;
    Console.setInputHidden = setInputHidden;
  }, []);

  useEffect(() => {
    Console.setInputRows = setRows;
  }, [rows]);

  useEffect(() => {
    Console.setDirectInputValue = setDirectInputValue;
    Console.directInputValue = directInputValue;
  }, [directInputValue]);

  useEffect(() => {
    Console.isDirectInput = isDirectInput;
    Console.setEnableDirectInput = setEnableDirectInput;
  }, [isDirectInput]);

  useEffect(() => {
    Console.inputPrefix = prefix;
    Console.setInputPrefix = setPrefix;
  }, [prefix]);

  useEffect(() => {
    Console.inputValue = value;
  }, [value]);

  if (isHidden) {
    return null;
  }

  const inputElement = isDirectInput ? (
    <input
      id={INPUT_ID}
      value={directInputValue}
      onChange={changeDirectInput}
    />
  ) : (
    <textarea id={INPUT_ID} rows={rows} value={value} onChange={onChange} />
  );

  return (
    <div className="input">
      <span className="input-prefix">{prefix}</span>
      {isLoading ? <Loader /> : inputElement}
    </div>
  );
}
