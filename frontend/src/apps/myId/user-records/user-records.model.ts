import { UserRecordTypes } from "../../../models/user";
import { FieldTypes } from "../../../shared/components/admin-editable-field/admin-editable-field.model";
import { RecordHashTypes } from "../../../store/events.slice";

export const modeMap = new Map<UserRecordTypes, IUserRecordsData>([
    [UserRecordTypes.GOAL, {
        titleFieldType: FieldTypes.TEXT,
        entriesProperty: 'goals',
        hashProperty: RecordHashTypes.GOAL
    }],
    [UserRecordTypes.RELATION, {
        titleFieldType: FieldTypes.SELECT,
        entriesProperty: 'relations',
        hashProperty: RecordHashTypes.RELATION
    }],
    [UserRecordTypes.META, {
        titleFieldType: FieldTypes.SELECT,
        entriesProperty: 'meta',
    }],
    [UserRecordTypes.PRIVATE_RECORD, {
        titleFieldType: FieldTypes.TEXT,
        entriesProperty: 'privateRecords',
        hashProperty: RecordHashTypes.PRIVATE_RECORD
    }],
])

interface IUserRecordsData {
    titleFieldType: FieldTypes.TEXT | FieldTypes.SELECT;
    options?: string[];
    entriesProperty: 'relations' | 'goals' | 'meta' | 'privateRecords';
    hashProperty?: RecordHashTypes;
}

export interface IUserRecordsProps {
    mode: UserRecordTypes;
    titleOptions?: string[],
}
