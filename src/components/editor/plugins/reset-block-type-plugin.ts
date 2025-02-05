'use client';

import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CalloutPlugin } from '@udecode/plate-callout/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import { ResetNodePlugin } from '@udecode/plate-reset-node/react';
import { ParagraphPlugin } from '@udecode/plate/react';

import {
  isCodeBlockEmpty,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock,
} from '@udecode/plate-code-block';
import { HEADING_LEVELS } from '@udecode/plate-heading';
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list';

const resetBlockTypesCommonRule = {
  defaultType: ParagraphPlugin.key,
  types: [
    ...HEADING_LEVELS,
    BlockquotePlugin.key,
    INDENT_LIST_KEYS.todo,
    ListStyleType.Disc,
    ListStyleType.Decimal,
    CalloutPlugin.key,
  ],
};

const resetBlockTypesCodeBlockRule = {
  defaultType: ParagraphPlugin.key,
  types: [CodeBlockPlugin.key],
  onReset: unwrapCodeBlock,
};

export const resetBlockTypePlugin = ResetNodePlugin.configure({
  options: {
    rules: [
      {
        ...resetBlockTypesCommonRule,
        predicate: (editor) =>
          editor.api.isEmpty(editor.selection, { block: true }),
        hotkey: 'Enter',
      },
      {
        ...resetBlockTypesCommonRule,
        predicate: (editor) => editor.api.isAt({ start: true }),
        hotkey: 'Backspace',
      },
      {
        ...resetBlockTypesCodeBlockRule,
        predicate: isCodeBlockEmpty,
        hotkey: 'Enter',
      },
      {
        ...resetBlockTypesCodeBlockRule,
        predicate: isSelectionAtCodeBlockStart,
        hotkey: 'Backspace',
      },
    ],
  },
});
