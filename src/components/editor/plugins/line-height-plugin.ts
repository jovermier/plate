'use client';

import { LineHeightPlugin } from '@udecode/plate-line-height/react';
import { ParagraphPlugin } from '@udecode/plate/react';

import { HEADING_LEVELS } from '@udecode/plate-heading';

export const lineHeightPlugin = LineHeightPlugin.configure({
  inject: {
    targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS],
    nodeProps: {
      defaultNodeValue: 1.5,
      validNodeValues: [1, 1.2, 1.5, 2, 3],
    },
  },
});
