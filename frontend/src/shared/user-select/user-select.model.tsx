export interface IUserSelectProps {
    onSelection: (handles: string[]) => void;
    mode?: 'single' | 'multi';
    includeFactions?: boolean;
}
