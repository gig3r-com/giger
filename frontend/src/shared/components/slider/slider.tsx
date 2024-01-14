import { FC } from 'react';
import { ISliderProps } from './slider.model';

import './slider.scss';

export const Slider: FC<ISliderProps> = ({
    className,
    value,
    min,
    max,
    step,
    showValue,
    onChange,
    label,
    label2,
    showMax,
    showMin,
    disabled
}) => {
    const centerLabel = !label2 && !showValue;
    return (
        <div className={`${className} slider`}>
            <div
                className={`slider__label-container ${
                    centerLabel && 'slider__label-container--center'
                }`}
            >
                <span className="slider__label">{label}</span>
                {showValue && <span className="slider__value">{value}</span>}
                {label2 && <span className="slider__label2">{label2}</span>}
            </div>
            <input
                type="range"
                name="volume"
                value={value as number}
                onChange={(event) => onChange(parseInt(event.target.value))}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
            />
            <div className="slider__bounds-container">
                {showMin && <span className="slider__min">{min}</span>}
                {showMax && <span className="slider__max">{max}</span>}
            </div>
        </div>
    );
};
