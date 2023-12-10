import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

/**
 * Service for handling toast messages. 
 * Meant to be used in conjunction with websockets to notify the user about gig changes or bank transfers.
 * This connection will be added once backend is ready. 
 */
export const useNotificationsService = () => {
    /**
     * Fires a toast linking to a given address with a given message
     * @param linkAddress the address to link to
     * @param toastMsg the message to display
     */
    const handleIncomingBankTransfer = (linkAddress: string, toastMsg: string) => {
        toast(React.createElement(Link, {to: linkAddress}, toastMsg), { duration: 15000 });
    };

    /**
     * clearly only for testing purposes only and should be removed once backend is ready
     */
    const test = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any)['toast'] = handleIncomingBankTransfer;
    };

    return { test, handleIncomingBankTransfer };
};
