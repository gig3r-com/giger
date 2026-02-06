import { Template, UserFormValues } from '@/modules/users/form/types';
import Record from '@/modules/users/form/fields/Records/Record';

type CodeResolver = (code: string) => string | undefined;

export default function mapTemplateToForm(template: Template, record, user: UserFormValues) {
  const map = mapping(record, user);

  return {
    id: record.id,
    title: replaceCodes(template.title as string, map),
    description: replaceCodes(template.description as string, map),
  };
}

function makeResolver(resolver: CodeResolver | Record<string, string>): CodeResolver {
  return typeof resolver === "function" ? resolver : (code) => resolver[code];
}

function replaceCodes(input: string, resolver: CodeResolver | Record<string, string>): string {
  const resolve = makeResolver(resolver);
  const TOKEN = /(?<!\\)<<\s*([^<>]+?)\s*>>/g;
  const replaced = input.replace(TOKEN, (_whole, raw) => {
    const code = String(raw).trim();
    const value = resolve(code);
    return value != null ? String(value) : `<<${raw}>>`;
  });
  return replaced.replace(/\\<</g, "<<");
}

export const randomLetters = (len: number): string => {
  const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let out = "";
  for (let i = 0; i < len; i++) out += abc[(Math.random() * abc.length) | 0];
  return out;
};

const mapping = (record, user: UserFormValues) => {
  const map = {
    today: new Date().toISOString().slice(0, 10),
  };

  Object.keys(user).forEach(userKey => {
    const value = user[userKey];
    if (!value) return map[`user.${userKey}`] = '';
    if (typeof value == 'string') map[`user.${userKey}`] = value;
  })

  for (let i = 0; i < 20; i++) {
    map[`rand-${i+1}`] = randomLetters(i+1);
  }

  return map;
};