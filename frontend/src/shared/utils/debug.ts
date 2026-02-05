class DebugLogger {
    private static instance: DebugLogger;
    private enabled: boolean;

    private constructor() {
        // Check environment variable (Vite uses VITE_ prefix)
        const envDebug = import.meta.env.VITE_DEBUG_LOGGING;
        // Check localStorage for runtime override
        const localDebug = localStorage.getItem('GIGER_DEBUG_LOGGING');
        
        this.enabled = localDebug === 'true' || envDebug === 'true' || envDebug === '1';
    }

    public static getInstance(): DebugLogger {
        if (!DebugLogger.instance) {
            DebugLogger.instance = new DebugLogger();
        }
        return DebugLogger.instance;
    }

    public log(...args: any[]): void {
        if (this.enabled) {
            console.log(...args);
        }
    }

    public isEnabled(): boolean {
        return this.enabled;
    }

    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
        localStorage.setItem('GIGER_DEBUG_LOGGING', enabled.toString());
    }
}

export const debugLog = (...args: any[]) => DebugLogger.getInstance().log(...args);
export const isDebugEnabled = () => DebugLogger.getInstance().isEnabled();
export const setDebugEnabled = (enabled: boolean) => DebugLogger.getInstance().setEnabled(enabled);
