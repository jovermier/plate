'use client';

import { cn } from '@udecode/cn';
import { RangeApi } from '@udecode/plate';
import {
  type CursorData,
  type CursorOverlayState,
  useCursorOverlay,
} from '@udecode/plate-selection/react';
import React from 'react';

export function Cursor({
  caretPosition,
  data,
  id,
  selection,
  selectionRects,
}: CursorOverlayState<CursorData>) {
  const { style, selectionStyle = style } = data ?? ({} as CursorData);
  const isCursor = RangeApi.isCollapsed(selection);

  return (
    <>
      {selectionRects.map((position, i) => {
        return (
          <div
            className={cn(
              'pointer-events-none absolute z-10',
              id === 'selection' && 'bg-brand/25',
              id === 'selection' && isCursor && 'bg-primary'
            )}
            key={i}
            style={{
              ...selectionStyle,
              ...position,
            }}
          />
        );
      })}
      {caretPosition && (
        <div
          className={cn(
            'pointer-events-none absolute z-10 w-0.5',
            id === 'drag' && 'w-px bg-brand'
          )}
          style={{ ...caretPosition, ...style }}
        />
      )}
    </>
  );
}

export function CursorOverlay() {
  const { cursors } = useCursorOverlay();

  return (
    <>
      {cursors.map((cursor) => (
        <Cursor key={cursor.id} {...cursor} />
      ))}
    </>
  );
}
