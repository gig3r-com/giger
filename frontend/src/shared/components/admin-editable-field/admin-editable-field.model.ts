export enum FieldTypes {
    TEXT = "text",
    TEXTAREA = "textarea",
    NUMBER = "number",
    DATE = "date",
    BOOLEAN = "boolean",
    SELECT = "select"
}

export type IAdminEditableFieldProps =
    | IAdminEditableFieldPropsText
    | IAdminEditableFieldPropsTextarea
    | IAdminEditableFieldPropsNumber
    | IAdminEditableFieldPropsDate
    | IAdminEditableFieldPropsBoolean
    | IAdminEditableFieldPropsSelect;

export interface IAdminEditableFieldPropsBase {
    type: FieldTypes;
    className?: string;
    value: string | number | boolean;
    onChange: ((value: string) => void) | ((value: number) => void) | ((value: boolean) => void);
}


export interface IAdminEditableFieldPropsText extends IAdminEditableFieldPropsBase {
    type: FieldTypes.TEXT;
    value: string;
    onChange: (value: string) => void;
}

export interface IAdminEditableFieldPropsTextarea extends IAdminEditableFieldPropsBase {
    type: FieldTypes.TEXTAREA;
    value: string;
    onChange: (value: string) => void;
}

export interface IAdminEditableFieldPropsNumber extends IAdminEditableFieldPropsBase {
    type: FieldTypes.NUMBER;
    value: number;
    onChange: (value: number) => void;
}

export interface IAdminEditableFieldPropsDate extends IAdminEditableFieldPropsBase {
    type: FieldTypes.DATE;
    value: string;
    onChange: (value: string) => void;
}

export interface IAdminEditableFieldPropsBoolean extends IAdminEditableFieldPropsBase {
    type: FieldTypes.BOOLEAN;
    value: boolean;
    onChange: (value: boolean) => void;
}

export interface IAdminEditableFieldPropsSelect extends IAdminEditableFieldPropsBase {
    type: FieldTypes.SELECT;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}
