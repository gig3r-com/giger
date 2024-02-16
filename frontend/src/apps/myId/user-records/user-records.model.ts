import { UserRecordTypes } from "../../../models/user";
import { FieldTypes } from "../../../shared/components/admin-editable-field/admin-editable-field.model";

export const modeMap = new Map<UserRecordTypes, IUserRecordsData>([
    [UserRecordTypes.GOAL, {
        titleFieldType: FieldTypes.TEXT,
        entriesProperty: 'goals'
    }],
    [UserRecordTypes.RELATION, {
        titleFieldType: FieldTypes.SELECT,
        entriesProperty: 'relations'
    }],
    [UserRecordTypes.META, {
        titleFieldType: FieldTypes.SELECT,
        entriesProperty: 'meta'
    }],
    [UserRecordTypes.PRIVATE_RECORD, {
        titleFieldType: FieldTypes.TEXT,
        entriesProperty: 'privateRecords'
    }],
])

interface IUserRecordsData {
    titleFieldType: FieldTypes.TEXT | FieldTypes.SELECT;
    options?: string[];
    entriesProperty: 'relations' | 'goals' | 'meta' | 'privateRecords';
}

export interface IUserRecordsProps {
    mode: UserRecordTypes;
    titleOptions?: string[]
}
