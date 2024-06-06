export interface IUserSelectProps {
    onSelection: (handles: string[]) => void;
    mode?: 'single' | 'multi';
    allowFindingSelf?: boolean;
    includeFactions?: boolean;
    initialSelected?: [];
}
