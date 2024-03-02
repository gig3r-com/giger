export function useVersionService() {
    const version = '0.2';

    const versionCheck = () => {
        const localVersion = localStorage.getItem('version') ?? '0.0';

        if (localVersion !== version) {
            localStorage.clear();
            localStorage.setItem('version', version);
            window.location.reload();
        }
    };

    return {
        versionCheck
    };
}
