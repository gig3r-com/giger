export interface IBigButtonProps {
    disabled?: boolean;
    text: string;
    onClick: () => void;
    color?: 'primary' | 'secondary' | 'accent' | 'accent2',
    className?: string;
}
