export interface IObscurableInfo {
    isRevealed?: boolean;
    seen?: boolean;
}

/**
 * front-end only. information derived from revealCodes for simplicity of access
 */
export interface IObscurableInfoWithLockData {
    locked: boolean;
}
