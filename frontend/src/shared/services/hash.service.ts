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

    const setHash = (key: string, value: string) => {
        console.log({value})
        if (value || (Array.isArray(value) && value.length && value[0])) {
            hashParams[key] = value;
        } else {
            delete hashParams[key];
        }
        console.log({hashParams})
        const newHash = '#' + Object.keys(hashParams).map(key => {
            return `${key}=${hashParams[key]}`
        }).join('&');
        console.log({newHash})
        navigate(newHash);
    }

    const setupStateChanger = (hashName: string, setState: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<number>>) => (value: string | number) => {
        setHash(hashName, String(value));
        setState(value);
    }

    return { hashParams, setupStateChanger, setHash };
};
