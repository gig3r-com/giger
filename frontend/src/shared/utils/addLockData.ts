import {
    IObscurableInfo,
    IObscurableInfoWithLockData
} from '../../models/general';

export const addLockData = <T>(
    data: IObscurableInfo[],
    revealCodes: string[]
): (T & IObscurableInfoWithLockData)[] => {
    return data.map((event) => {
        return {
            ...event,
            locked: !revealCodes.includes(event.revealCode ?? '')
        };
    }) as (T & IObscurableInfoWithLockData)[];
};
