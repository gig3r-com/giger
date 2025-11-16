"use client";

import { DragEvent, cloneElement, DetailedReactHTMLElement } from "react";

interface DragTemplateItemProps {
  dragItem: { id: string, [key]: string };
  children: DetailedReactHTMLElement;
}

export default function DragTemplateItem({ dragItem, children }: DragTemplateItemProps) {
  function handleDragStart(e: DragEvent) {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/x-record-template+json', JSON.stringify(dragItem));
    e.dataTransfer.setData('application/json', JSON.stringify(dragItem));
    e.dataTransfer.setData('text/plain', dragItem.id);

    if (typeof (children as any).props.onDragStart === 'function') {
      (children as any).props.onDragStart(e);
    }
  }

  return cloneElement(children, {
    draggable: true,
    onDragStart: handleDragStart,
    style: { cursor: 'grab', ...(children.props.style ?? {}) },
  });
}
