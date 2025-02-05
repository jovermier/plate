'use client';

import { AutoformatPlugin } from '@udecode/plate-autoformat/react';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import {
  CodeBlockPlugin,
  CodeLinePlugin,
} from '@udecode/plate-code-block/react';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { openNextToggles, TogglePlugin } from '@udecode/plate-toggle/react';
import { ParagraphPlugin } from '@udecode/plate/react';

import type { SlateEditor } from '@udecode/plate';
import type { AutoformatRule } from '@udecode/plate-autoformat';

import { ElementApi, isType } from '@udecode/plate';
import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from '@udecode/plate-autoformat';
import { insertEmptyCodeBlock } from '@udecode/plate-code-block';
import { HEADING_KEYS } from '@udecode/plate-heading';
import {
  INDENT_LIST_KEYS,
  ListStyleType,
  toggleIndentList,
} from '@udecode/plate-indent-list';

export const format = (editor: SlateEditor, customFormatting: any) => {
  if (editor.selection) {
    const parentEntry = editor.api.parent(editor.selection);

    if (!parentEntry) return;

    const [node] = parentEntry;

    if (
      ElementApi.isElement(node) &&
      !isType(editor, node, CodeBlockPlugin.key) &&
      !isType(editor, node, CodeLinePlugin.key)
    ) {
      customFormatting();
    }
  }
};

export const autoformatMarks: AutoformatRule[] = [
  {
    match: '***',
    type: [BoldPlugin.key, ItalicPlugin.key],
    mode: 'mark',
  },
  {
    match: '__*',
    type: [UnderlinePlugin.key, ItalicPlugin.key],
    mode: 'mark',
  },
  {
    match: '__**',
    type: [UnderlinePlugin.key, BoldPlugin.key],
    mode: 'mark',
  },
  {
    match: '___***',
    type: [UnderlinePlugin.key, BoldPlugin.key, ItalicPlugin.key],
    mode: 'mark',
  },
  {
    match: '**',
    type: BoldPlugin.key,
    mode: 'mark',
  },
  {
    match: '__',
    type: UnderlinePlugin.key,
    mode: 'mark',
  },
  {
    match: '*',
    type: ItalicPlugin.key,
    mode: 'mark',
  },
  {
    match: '_',
    type: ItalicPlugin.key,
    mode: 'mark',
  },
  {
    match: '~~',
    type: StrikethroughPlugin.key,
    mode: 'mark',
  },
  {
    match: '^',
    type: SuperscriptPlugin.key,
    mode: 'mark',
  },
  {
    match: '~',
    type: SubscriptPlugin.key,
    mode: 'mark',
  },
  {
    match: '==',
    type: HighlightPlugin.key,
    mode: 'mark',
  },
  {
    match: '≡',
    type: HighlightPlugin.key,
    mode: 'mark',
  },
  {
    match: '`',
    type: CodePlugin.key,
    mode: 'mark',
  },
];

export const autoformatBlocks: AutoformatRule[] = [
  {
    match: '# ',
    type: HEADING_KEYS.h1,
    mode: 'block',
  },
  {
    match: '## ',
    type: HEADING_KEYS.h2,
    mode: 'block',
  },
  {
    match: '### ',
    type: HEADING_KEYS.h3,
    mode: 'block',
  },
  {
    match: '#### ',
    type: HEADING_KEYS.h4,
    mode: 'block',
  },
  {
    match: '##### ',
    type: HEADING_KEYS.h5,
    mode: 'block',
  },
  {
    match: '###### ',
    type: HEADING_KEYS.h6,
    mode: 'block',
  },
  {
    match: '> ',
    type: BlockquotePlugin.key,
    mode: 'block',
  },
  {
    match: '```',
    type: CodeBlockPlugin.key,
    format: (editor) => {
      insertEmptyCodeBlock(editor, {
        defaultType: ParagraphPlugin.key,
        insertNodesOptions: { select: true },
      });
    },
    mode: 'block',
  },
  {
    match: '+ ',
    type: TogglePlugin.key,
    mode: 'block',
    preFormat: openNextToggles,
  },
  {
    match: ['---', '—-', '___ '],
    type: HorizontalRulePlugin.key,
    format: (editor) => {
      editor.tf.setNodes({ type: HorizontalRulePlugin.key });
      editor.tf.insertNodes({
        children: [{ text: '' }],
        type: ParagraphPlugin.key,
      });
    },
    mode: 'block',
  },
];

export const autoformatIndentLists: AutoformatRule[] = [
  {
    match: ['* ', '- '],
    type: 'list',
    format: (editor) => {
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Disc,
      });
    },
    mode: 'block',
  },
  {
    match: [String.raw`^\d+\.$ `, String.raw`^\d+\)$ `],
    matchByRegex: true,
    type: 'list',
    format: (editor) =>
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Decimal,
      }),
    mode: 'block',
  },
  {
    match: ['[] '],
    type: 'list',
    format: (editor) => {
      toggleIndentList(editor, {
        listStyleType: INDENT_LIST_KEYS.todo,
      });
      editor.tf.setNodes({
        checked: false,
        listStyleType: INDENT_LIST_KEYS.todo,
      });
    },
    mode: 'block',
  },
  {
    match: ['[x] '],
    type: 'list',
    format: (editor) => {
      toggleIndentList(editor, {
        listStyleType: INDENT_LIST_KEYS.todo,
      });
      editor.tf.setNodes({
        checked: true,
        listStyleType: INDENT_LIST_KEYS.todo,
      });
    },
    mode: 'block',
  },
];

export const autoformatPlugin = AutoformatPlugin.configure({
  options: {
    rules: [
      ...autoformatBlocks,
      ...autoformatMarks,
      ...autoformatSmartQuotes,
      ...autoformatPunctuation,
      ...autoformatLegal,
      ...autoformatLegalHtml,
      ...autoformatArrow,
      ...autoformatMath,
      ...autoformatIndentLists,
    ],
    enableUndoOnDelete: true,
  },
});
