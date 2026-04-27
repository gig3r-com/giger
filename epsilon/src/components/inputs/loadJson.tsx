'use client'
import React from 'react';
import TextField from '@mui/material/TextField';

function LoadJson({ onLoad }) {
  const readJsonFile = async <T = unknown>(file: Blob): Promise<T | unknown> => {
    try {
      return JSON.parse(await file.text());
    } catch (error) {
        return error;
      }
    }
  const handleChange = async (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      const data = await readJsonFile(file);
      onLoad?.(data);
    }
  }


  return (
    <TextField
      title="JSON"
      type="file"
      onChange={ handleChange }
    />
  );
}

export default LoadJson;