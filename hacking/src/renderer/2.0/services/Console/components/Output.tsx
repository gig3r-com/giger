import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { newGigerArt } from '../../../../Terminal/data/gigerAsciArt';
import Console from '../index';

export type LineType = {
  html?: string;
  children?: string;
  id: string;
  tag: string;
};

const mapLine = (line: LineType | string): LineType => {
  if (typeof line === 'string') {
    return {
      id: crypto.randomUUID(),
      html: String(line),
      tag: 'p',
    };
  }
  return {
    id: String(line.id || crypto.randomUUID()),
    html: String(line.html),
    tag: String(line.tag || 'p'),
    children: String(line.children),
  };
};

const mapLines = (
  newLines: LineType[] | string[] | LineType | string,
): LineType[] => {
  if (Array.isArray(newLines)) {
    return newLines.map((line) => mapLine(line));
  }
  return [mapLine(newLines)];
};

export default function Output() {
  const [lines, setLines] = useState<LineType[]>([...newGigerArt]);
  const addLines = useCallback(
    (newLines: LineType[] | string[] | LineType | string) => {
      setLines((oldLines) => [...oldLines, ...mapLines(newLines)]);
    },
    [],
  );
  const addUserLines = useCallback(
    (newLines: LineType[] | string[] | LineType | string) => {
      setLines((oldLines) => [...oldLines, ...mapLines(newLines)]);
    },
    [],
  );
  const addErrorLines = useCallback(
    (newLines: LineType[] | string[] | LineType | string) => {
      setLines((oldLines) => [...oldLines, ...mapLines(newLines)]);
    },
    [],
  );
  const removeLine = useCallback((id: string) => {
    setLines((oldLanes) => oldLanes.filter((line) => line.id !== id));
  }, []);
  const changeLine = useCallback((id, newLine) => {
    setLines((oldLanes) =>
      oldLanes.map((line) => {
        if (line.id !== id) return line;
        return mapLine({ ...line, ...newLine });
      }),
    );
  }, []);
  const removeLastLine = useCallback(() => {
    setLines((oldLanes) => {
      oldLanes.pop();
      return oldLanes;
    });
  }, []);
  const changeLastLine = useCallback((newLine) => {
    setLines((oldLanes) => {
      const line = oldLanes.pop();
      return [...oldLanes, mapLine({ ...line, ...newLine })];
    });
  }, []);

  useEffect(() => {
    Console.addLines = addLines;
    Console.addUserLines = addUserLines;
    Console.addErrorLines = addErrorLines;
    Console.removeLine = removeLine;
    Console.changeLine = changeLine;
    Console.removeLastLine = removeLastLine;
    Console.changeLastLine = changeLastLine;
  }, [
    addErrorLines,
    addLines,
    addUserLines,
    changeLastLine,
    changeLine,
    removeLastLine,
    removeLine,
  ]);

  return useMemo(
    () =>
      lines.map((line) => {
        const { id, tag, html, children } = line;
        const Tag = tag;
        if (html)
          return (
            <Tag
              key={id}
              className="line"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        if (children)
          return (
            <Tag key={id} className="line">
              {children}
            </Tag>
          );

        return <Tag key={id} className="line" />;
      }),
    [lines],
  );
}
