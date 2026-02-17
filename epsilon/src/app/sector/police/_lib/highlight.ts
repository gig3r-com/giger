export function highlight(text: string, query: string, maxLen = 120): string {
  const q = query.trim();
  if (!q) return escape(text);
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return escape(text);
  let start = Math.max(0, idx - Math.floor((maxLen - q.length)/2));
  let end = Math.min(text.length, start + maxLen);
  const pre = escape(text.slice(start, idx));
  const hit = escape(text.slice(idx, idx + q.length));
  const post = escape(text.slice(idx + q.length, end));
  const prefix = start > 0 ? '…' : '';
  const suffix = end < text.length ? '…' : '';
  return `${prefix}${pre}<mark>${hit}</mark>${post}${suffix}`;
}

function escape(s: string) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
