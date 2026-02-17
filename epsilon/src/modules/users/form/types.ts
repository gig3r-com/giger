import * as ENUM from '../types/enums';

type SubmittingFormTypes = 'user' | 'name' | 'privateRecords' | null;

export interface UserFormValues {
  submitting: SubmittingFormTypes;
  submittingRecord: {} | null;
  id: string;

  // Profile - Main
  handle: string;
  name: string;
  surname: string;
  typeActual: ENUM.UserType;
  typePublic: ENUM.UserType;
}

export interface Template {
  // Meta template data
  id: string;
  name: string | JSX.Element;
  subName: string | JSX.Element;

  // Content
  title: string;
  description: string;
}