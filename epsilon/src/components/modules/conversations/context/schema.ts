import * as Yup from 'yup';
import dayjs from 'dayjs';

export const EnhancedMessageSchema = Yup.object({
  id: Yup.mixed().required(),
  sender: Yup.string().default(''),
  text: Yup.string().default(''),
  date: Yup.string().nullable().test('iso-or-null', 'Invalid date', (v) => !v || dayjs(v).isValid()),
  note: Yup.string().default(''),
  hacker: Yup.string().default(''),
});

export const EnhancedConversationSchema = Yup.object({
  id: Yup.mixed().required(),
  title: Yup.string().default('').required('Title is required').trim(),
  participants: Yup.array(Yup.string().trim().min(1)).default([]).min(2),
  messages: Yup.array(EnhancedMessageSchema).default([]),
  /** META */
  hackers: Yup.array(Yup.string().trim().min(1)).default([]),
  tags: Yup.array(Yup.string().trim().min(1)).default([]),
});