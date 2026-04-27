"use client";

import React, { DragEvent, ReactNode } from 'react';

type DropKind = "template" | "text" | "unknown";

interface DropFieldProps {
  onDropData: (data: any, kind: DropKind, e: DragEvent) => void;
  accept?: string[]; // MIME types to check first
  children: (args: {
    isOver: boolean;
    bind: {
      onDragOver: (e: DragEvent) => void;
      onDragEnter: (e: DragEvent) => void;
      onDragLeave: (e: DragEvent) => void;
      onDrop: (e: DragEvent) => void;
    };
  }) => ReactNode;
}

const DEFAULT_ACCEPT = [
  "application/x-record-template+json",
  "application/json",
  "text/plain",
];

export default function DropField({ onDropData, accept = DEFAULT_ACCEPT, children }: DropFieldProps) {
  const [isOver, setIsOver] = React.useState(false);
  const depthRef = React.useRef(0);

  const onDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const onDragEnter = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    depthRef.current += 1;
    setIsOver(true);
  }, []);

  const onDragLeave = React.useCallback(() => {
    depthRef.current = Math.max(0, depthRef.current - 1);
    if (depthRef.current === 0) setIsOver(false);
  }, []);

  const onDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      depthRef.current = 0;
      setIsOver(false);

      const types = Array.from(e.dataTransfer.types || []);
      let kind: DropKind = "unknown";
      let data: any = null;

      // Prefer JSON payloads
      const mime = accept.find((t) => types.includes(t));
      if (mime) {
        const raw = e.dataTransfer.getData(mime);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === "object" && "name" in parsed) {
              kind = "template";
            } else {
              kind = "unknown";
            }
            data = parsed;
          } catch {
            // not json, fallthrough to text
          }
        }
      }

      if (!data) {
        const txt = e.dataTransfer.getData("text/plain");
        if (txt) {
          kind = "text";
          data = txt;
        }
      }

      onDropData(data, kind, e);
    },
    [accept, onDropData]
  );

  return <>{children({ isOver, bind: { onDragOver, onDragEnter, onDragLeave, onDrop } })}</>;
}
