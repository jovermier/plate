'use client';

import { BlockSelectionPlugin } from '@udecode/plate-selection/react';

export const blockSelectionPlugins = [
  BlockSelectionPlugin.configure(({ editor }) => ({
    options: {
      isSelectable: (element, path) => {
        return (
          !['code_line', 'column', 'td'].includes(element.type) &&
          !editor.api.block({ at: path, match: { type: 'tr' }, above: true })
        );
      },
      enableContextMenu: true,
    },
  })),
] as const;

export const blockSelectionReadOnlyPlugin = BlockSelectionPlugin.configure({
  api: {},
  render: {},
  extendEditor: null,
  handlers: {},
  options: {},
  useHooks: null,
});
