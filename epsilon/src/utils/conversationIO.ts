'use client';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { EnhancedConversationType } from '@/types';

const genId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}_${Math.random()}`;

const BaseSchema = Yup.object({
  id: Yup.mixed().optional(),
  title: Yup.string().optional(),
  participants: Yup.array(Yup.mixed()).optional(),
  participantColors: Yup.object().optional(),
  hackers: Yup.array(Yup.mixed()).optional(),
  hackerColors: Yup.object().optional(),
  tags: Yup.array(Yup.mixed()).optional(),
  messages: Yup.array(Yup.mixed()).optional(),
  edits: Yup.array(Yup.mixed()).optional(),
});

export type MapResult = { ok: boolean; conversation?: EnhancedConversationType; errors: string[]; warnings: string[] };

export function mapConversationJSON(input: unknown): MapResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  let raw: any;
  try { raw = BaseSchema.cast(input, { assert: false }); }
  catch { return { ok: false, errors: ['File is not a valid JSON object.'], warnings: [] }; }
  if (!raw || typeof raw !== 'object') return { ok: false, errors: ['Top-level JSON must be an object'], warnings: [] };

  const conv: EnhancedConversationType = {
    id: raw.id as string ?? genId(),
    title: typeof raw.title === 'string' ? raw.title as string : '',
    participants: [],
    messages: [],
    gigConversation: false,
    anonymizedUsers: [],
  };

  // participants
  const setParticipants = new Set<string>();
  if (Array.isArray(raw.participants)) raw.participants.forEach((h: any) => { if (typeof h === 'string' && h.trim()) setParticipants.add(h.trim()); });
  conv.participants = Array.from(setParticipants);

  // messages
  if (Array.isArray(raw.messages)) {
    raw.messages.forEach((m: any, idx: number) => {
      const id = (m && m.id) ?? genId();
      let sender = typeof m?.sender === 'string' ? m.sender.trim() : '';
      let text = typeof m?.text === 'string' ? m.text : '';
      let note = typeof m?.note === 'string' ? m.note : '';
      let hacker = typeof m?.hacker === 'string' ? m.hacker : undefined;
      let type = typeof m?.type === 'string' ? m.type : '';

      let dateIso: string | null = null;
      if (typeof m?.date === 'string' && dayjs(m.date).isValid()) dateIso = dayjs(m.date).toDate().toISOString();
      else if (m?.date == null) dateIso = null;
      else { dateIso = null; warnings.push(`Message ${idx + 1}: invalid date -> set to null.`); }

      if (!sender) {
        sender = conv.participants[0] ?? '';
        warnings.push(`Message ${idx + 1}: missing sender -> set to first participant or blank.`);
      }
      if (!type) {
        type = 'text';
        warnings.push(`Message ${idx + 1}: missing type -> set to text.`);
      }
      if (text.length > 50000) {
        text = text.slice(0, 50000);
        warnings.push(`Message ${idx + 1}: text truncated to 50k.`);
      }
      if (note.length > 10000) {
        note = note.slice(0, 10000);
        warnings.push(`Message ${idx + 1}: note truncated to 10k.`);
      }

      conv.messages.push({ id, sender, text, date: dateIso, note, type, hacker, });
    });
  } else if (raw.messages != null) {
    errors.push('`messages` must be an array.');
  }

  // edits
  // if (Array.isArray(raw.edits)) {
  //   raw.edits.forEach((e: any, idx: number) => {
  //     const id = typeof e?.id === 'string' ? e.id : genId();
  //     const savedAt = typeof e?.savedAt === 'string' && dayjs(e.savedAt).isValid()
  //       ? dayjs(e.savedAt).toDate().toISOString()
  //       : new Date().toISOString();
  //     const label = typeof e?.label === 'string' ? e.label : undefined;
  //     const comment = typeof e?.comment === 'string' ? e.comment : undefined;
  //     conv.edits.push({ id, savedAt, label, comment });
  //     if (!e?.id || !e?.savedAt) warnings.push(`Edit ${idx + 1}: normalized missing id/savedAt.`);
  //   });
  // } else if (raw.edits != null) {
  //   warnings.push('`edits` is not an array; replaced with an empty array.');
  // }
  //
  // if (!conv.messages.length) warnings.push('Conversation has no messages.');
  // if (!conv.participants.length) warnings.push('No participants found.');

  return { ok: errors.length === 0, conversation: conv, errors, warnings };
}
