// components/ConfirmProvider.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions,
  Button,
} from '@mui/material';

type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

type ConfirmContextType = (message: string | ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});
  const [resolver, setResolver] = useState<(result: boolean) => void>();

  const confirm: ConfirmContextType = (message) => {
    return new Promise<boolean>((resolve) => {
      if (typeof message === 'string') {
        setOptions({
          title: 'Confirm',
          description: message,
          confirmText: 'Yes',
          cancelText: 'No',
        });
      } else {
        setOptions({
          title: message.title ?? 'Confirm',
          description: message.description,
          confirmText: message.confirmText ?? 'Yes',
          cancelText: message.cancelText ?? 'No',
        });
      }
      setResolver(() => resolve);
      setOpen(true);
    });
  };

  const handleClose = (result: boolean) => {
    setOpen(false);
    resolver?.(result);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Dialog open={open} onClose={() => handleClose(false)} sx={(theme) => ({ background: theme.palette.background.paper })}>
        {options.title && <DialogTitle>{options.title}</DialogTitle>}
        {options.description && (
          <DialogContent>
            <DialogContentText>{options.description}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="inherit">
            {options.cancelText}
          </Button>
          <Button onClick={() => handleClose(true)} color="error" autoFocus>
            {options.confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used inside <ConfirmProvider>');
  return ctx;
}
