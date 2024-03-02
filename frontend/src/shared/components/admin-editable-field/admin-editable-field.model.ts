export enum FieldTypes {
    TEXT = 'text',
    TEXTAREA = 'textarea',
    NUMBER = 'number',
    DATE = 'date',
    BOOLEAN = 'boolean',
    SELECT = 'select',
    SLIDER = 'slider'
}

export type IAdminEditableFieldProps =
    | IAdminEditableFieldPropsText
    | IAdminEditableFieldPropsTextarea
    | IAdminEditableFieldPropsNumber
    | IAdminEditableFieldPropsDate
    | IAdminEditableFieldPropsBoolean
    | IAdminEditableFieldPropsSelect
    | IAdminEditableFieldPropsSlider;

export interface IAdminEditableFieldPropsBase {
    /**
     * type of the input
     */
    type: FieldTypes;
    className?: string;
    onClick?: () => void;
    value: string | number | boolean;
    /**
     * is fired when the user completes changing the input
     */
    onChange:
        | ((value: string) => void)
        | ((value: number) => void)
        | ((value: boolean) => void);
}

export interface IAdminEditableFieldPropsText
    extends IAdminEditableFieldPropsBase {
    type: FieldTypes.TEXT;
    value: string;
    onChange: (value: string) => void;
}

export interface IAdminEditableFieldPropsTextarea
    extends IAdminEditableFieldPropsBase {
    type: FieldTypes.TEXTAREA;
    value: string;
    onChange: (value: string) => void;
}

export interface IAdminEditableFieldPropsNumber
    extends IAdminEditableFieldPropsBase {
    type: FieldTypes.NUMBER;
    value: number;
    onChange: (value: number) => void;
}

export interface IAdminEditableFieldPropsDate
    extends IAdminEditableFieldPropsBase {
    type: FieldTypes.DATE;
    value: string;
    onChange: (value: string) => void;
}

export interface IAdminEditableFieldPropsBoolean
    extends IAdminEditableFieldPropsBase {
    type: FieldTypes.BOOLEAN;
    value: boolean;
    onChange: (value: boolean) => void;
}

export interface IAdminEditableFieldPropsSelect
    extends IAdminEditableFieldPropsBase {
    type: FieldTypes.SELECT;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

export interface IAdminEditableFieldPropsSlider
    extends IAdminEditableFieldPropsBase {
    type: FieldTypes.SLIDER;
    value: number;
    min: number;
    max: number;
    step?: number;
    showValue?: boolean;
    showMin?: boolean;
    showMax?: boolean;
    /**
     * default label to be shown on the left side of the slider
     */
    label: string;
    /**
     * optional label to be shown on the right side of the slider
     */
    label2?: string;
    onChange: (value: string) => void;
}
