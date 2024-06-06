import React, { useMemo, useState, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { newGigerArt } from '../../../Terminal/data/gigerAsciArt';
// eslint-disable-next-line import/no-cycle
import Console from '../index';

export type LineType = {
  html?: string;
  children?: string;
  id?: string;
  tag?: string;
  className?: string;
};

const mapLine = (line: LineType | string): LineType => {
  // console.log({line})
  if (typeof line === 'string') {
    return {
      id: crypto.randomUUID(),
      html: String(line),
      tag: 'div',
      className: '',
    };
  }
  return {
    id: String(line.id || crypto.randomUUID()),
    html: line.html ? String(line.html) : '',
    tag: line.tag ? String(line.tag) : '',
    children: line.children ? String(line.children) : '',
    className: line.className ? String(line.className) : '',
  };
};

const mapUserLine = (line: string): LineType => {
  return {
    id: crypto.randomUUID(),
    children: line ? String(line) : '',
    tag: 'div',
    className: 'user-line',
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
  const addUserLine = useCallback((newLine: string) => {
    setLines((oldLines) => [...oldLines, mapUserLine(newLine)]);
  }, []);
  const addErrorLines = useCallback(
    (newLines: LineType[] | string[] | LineType | string) => {
      setLines((oldLines) => [...oldLines, ...mapLines(newLines)]);
    },
    [],
  );
  const removeLine = useCallback((id: string) => {
    setLines((oldLanes) => oldLanes.filter((line) => line.id !== id));
  }, []);
  const changeLine = useCallback((id: string, newLine: LineType) => {
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
  const changeLastLine = useCallback((newLine: LineType) => {
    setLines((oldLanes) => {
      const line = oldLanes.pop();
      return [...oldLanes, mapLine({ ...line, ...newLine })];
    });
  }, []);
  const resetLines = useCallback(() => {
    setLines([]);
  }, []);

  useEffect(() => {
    Console.addLines = addLines;
    Console.addUserLine = addUserLine;
    Console.addErrorLines = addErrorLines;
    Console.removeLine = removeLine;
    Console.changeLine = changeLine;
    Console.removeLastLine = removeLastLine;
    Console.changeLastLine = changeLastLine;
    Console.resetLines = resetLines;
  }, [
    addErrorLines,
    addLines,
    addUserLine,
    changeLastLine,
    changeLine,
    removeLastLine,
    removeLine,
    resetLines,
  ]);

  return useMemo(
    () =>
      lines.map((line) => {
        const { id, tag, html, children, className } = line;
        const lineClass = classnames(className, 'line');
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 1);
        if (!tag) {
          return children;
        }
        const Tag = tag;
        if (html) {
          // @ts-ignore
          return (
            <Tag
              key={id}
              // @ts-ignore
              className={lineClass}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        if (children)
          return (
            // @ts-ignore
            <Tag key={id} className={lineClass}>
              {children}
            </Tag>
          );

        // @ts-ignore
        return <Tag key={id} className={lineClass} />;
      }),
    [lines],
  );
}
