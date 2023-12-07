import { FC } from 'react';
import { Renderable, Toast, ToastBar } from 'react-hot-toast';

import './toast.scss';

export const ToastItem: FC<{ toast: Toast }> = ({ toast }) => {
    const toastElement = ( icon: Renderable, message: Renderable) => {
        return (
            <div className='toast'>
                {icon}
                {message}
                <div className='toast__corner toast__corner--top-left' />
                <div className='toast__corner toast__corner--top-right' />
                <div className='toast__corner toast__corner--bottom-right' />
            </div>
        );
    }

    return (
        <ToastBar
            toast={toast}
            style={{
                ...toast.style,
                background: '#22193c',
                border: '#545ae9',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderRadius: 0,
                minHeight: '75px',
                width: 'calc(100% - 50px)',
                display: 'flex',
                justifyContent: 'center',
                fontFamily: 'JetBrainsMono, monospace',
                fontSize: '0.875rem',
                color: '#fff312',
                position: 'relative',
            }}
        >
            {({ icon, message }) => toastElement( icon, message )}
        </ToastBar>
    );
};
