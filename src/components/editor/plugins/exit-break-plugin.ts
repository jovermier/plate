'use client';

import { ExitBreakPlugin } from '@udecode/plate-break/react';

import { HEADING_LEVELS } from '@udecode/plate-heading';

export const exitBreakPlugin = ExitBreakPlugin.configure({
  options: {
    rules: [
      {
        hotkey: 'mod+enter',
      },
      {
        before: true,
        hotkey: 'mod+shift+enter',
      },
      {
        level: 1,
        query: {
          end: true,
          start: true,
          allow: HEADING_LEVELS,
        },
        relative: true,
        hotkey: 'enter',
      },
    ],
  },
});
