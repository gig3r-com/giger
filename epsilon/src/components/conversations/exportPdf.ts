'use client';
import { jsPDF } from 'jspdf';
import dayjs from 'dayjs';

export function exportConversationAsPdf(conv: any, mainHandle: string | null, opts?: { showTimestamps?: boolean }) {
  const showTimestamps = !!opts?.showTimestamps;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 36;
  const bubbleW = pageW - margin * 2 - 120;
  const leftX = margin;
  const rightX = pageW - margin - bubbleW;
  let y = margin;

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(14);
  doc.text(conv.title || 'Conversation', margin, y);
  y += 18;

  const msgs = [...(conv.messages ?? [])].sort((a: any, b: any) => {
    const da = a?.date && dayjs(a.date).isValid() ? +dayjs(a.date) : Infinity;
    const db = b?.date && dayjs(b.date).isValid() ? +dayjs(b.date) : Infinity;
    return da - db;
  });

  const colors = (conv as any).participantColors ?? {};
  const hackerColors = (conv as any).hackerColors ?? {};
  const getColor = (h: string) => colors[h] ?? '#89a3ff';
  const getHackColor = (h: string) => hackerColors[h] ?? '#ff6b6b';

  for (let i = 0; i < msgs.length; i++) {
    const m = msgs[i];
    const right = mainHandle && m.sender === mainHandle;
    const hacked = !!m.hack?.by;
    const hackBy = m.hack?.by ?? '';
    const bubbleColor = hacked ? getHackColor(hackBy) : getColor(m.sender);

    const textLines = doc.splitTextToSize(m.text || '', bubbleW - 16);
    const h = 10 + textLines.length * 16 + 10 + (showTimestamps && m.date ? 12 : 0) + (hacked ? 14 : 0);

    if (y + h + margin > pageH) { doc.addPage(); y = margin; }

    const x = right ? rightX : leftX;
    // bubble
    doc.setDrawColor(180);
    doc.setLineWidth(0.8);
    const [r, g, b] = hexToRgb(bubbleColor);
    doc.setFillColor(r, g, b, hacked ? 30 : 20);
    (doc as any).roundedRect(x, y, bubbleW, h, 8, 8, 'FD');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);

    // header row: sender + hacked tag if any
    const headerY = y + 14;
    doc.text(m.sender || '—', x + 10, headerY);
    if (hacked) {
      doc.setTextColor(255, 180, 180);
      doc.text(`HACK by ${hackBy}`, x + bubbleW - 10, headerY, { align: 'right' as any });
      doc.setTextColor(255, 255, 255);
    }

    // body
    doc.setFontSize(12);
    doc.text(textLines as any, x + 10, y + 28);

    if (showTimestamps && m.date) {
      doc.setFontSize(9);
      doc.setTextColor(190, 200, 210);
      doc.text(dayjs(m.date).format('MMM D, YYYY • HH:mm'), x + bubbleW - 10, y + h - 8, { align: 'right' as any });
      doc.setTextColor(255, 255, 255);
    }

    y += h + 8;
  }

  doc.save((conv.title ? conv.title.replace(/[^\w\-]+/g, '_') : `conversation_${conv.id}`) + '.pdf');
}

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return [137, 163, 255];
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}
