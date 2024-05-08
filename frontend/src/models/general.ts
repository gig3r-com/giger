export interface IObscurableInfo {
    isRevealed?: boolean;
    seen?: boolean;
}

/**
 * Checks if an object is of type IObscurableInfo
 * @param obj The object to be checked
 * @returns True if the object is of type IObscurableInfo, false otherwise
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIObscurableInfo(obj: any): obj is IObscurableInfo {
    return obj && typeof obj.isRevealed === 'boolean';
}

/**
 * front-end only. information derived from revealCodes for simplicity of access
 */
export interface IObscurableInfoWithLockData {
    locked: boolean;
}
