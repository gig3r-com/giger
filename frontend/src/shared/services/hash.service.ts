import React, { useMemo } from 'react';
import { useLocation, useNavigate } from "react-router";

/**
 * Service for handling hash params in url.
 */
export const useHashService = () => {
    const { hash } = useLocation();
    const navigate = useNavigate();
    const hashParams = useMemo(() => {
        const params: { [key: string]: string } = {}
        hash.replace('#', '')
            .split('&')
            .forEach(paramValue => {
                const param = paramValue.split('=');
                if (param && param[0] && param[1]) {
                    params[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
                }
            });
        return params;
    }, [hash]);

    /**
     * Sets Url Hash with a key and a value.
     * @param key string key of a hash param
     * @param value string value of a hash param
     */
    const setHash = (key: string, value: string) => {
        if (value || (Array.isArray(value) && value.length && value[0])) {
            hashParams[key] = value;
        } else {
            delete hashParams[key];
        }
        const newHash = '#' + Object.keys(hashParams).map(key => {
            return `${key}=${hashParams[key]}`
        }).join('&');
        navigate(newHash);
    }

    /**
     * Creates a wrapper function on a setState that handles both state change and hash param change.
     * After setting up use in form returned function instead of setState.
     * @param hashName string key of a hash param
     * @param setState React setState action for a state handling value of a hash param
     */
    const setupStateChanger = (hashName: string, setState: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<number>>) => (value: string | number | null) => {
        setHash(hashName, String(value));
        setState(value);
    }

    return { hashParams, setupStateChanger, setHash };
};
