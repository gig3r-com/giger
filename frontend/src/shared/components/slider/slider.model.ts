export interface ISliderProps {
    className?: string;
    label: string;
    label2?: string;
    value: number;
    showValue?: boolean;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    showMin?: boolean;
    showMax?: boolean;
    disabled?: boolean;
}
