'use client';

import { AIChatPlugin } from '@udecode/plate-ai/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import { DatePlugin } from '@udecode/plate-date/react';
import { TocPlugin } from '@udecode/plate-heading/react';
import {
  EquationPlugin,
  InlineEquationPlugin,
} from '@udecode/plate-math/react';
import { TablePlugin } from '@udecode/plate-table/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import { type PlateEditor, ParagraphPlugin } from '@udecode/plate/react';
import {
  CalendarIcon,
  ChevronRightIcon,
  Code2,
  Columns3Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrdered,
  PilcrowIcon,
  Quote,
  RadicalIcon,
  SparklesIcon,
  Square,
  Table,
  TableOfContentsIcon,
} from 'lucide-react';
import React from 'react';

import { withRef } from '@udecode/cn';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list';

import {
  insertBlock,
  insertInlineElement,
} from '@/components/editor/transforms';

import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxGroupLabel,
  InlineComboboxInput,
  InlineComboboxItem,
} from './inline-combobox';
import { PlateElement } from './plate-element';

type Group = {
  items: Item[];
  group: string;
};

interface Item {
  icon: React.ReactNode;

  onSelect: (editor: PlateEditor, value: string) => void;

  value: string;
  keywords?: string[];
  className?: string;
  focusEditor?: boolean;
  label?: string;
}

const groups: Group[] = [
  {
    items: [
      {
        value: 'AI',
        focusEditor: false,
        icon: <SparklesIcon />,
        onSelect: (editor) => {
          editor.getApi(AIChatPlugin).aiChat.show();
        },
      },
    ],
    group: 'AI',
  },
  {
    items: [
      {
        label: 'Text',
        value: ParagraphPlugin.key,
        icon: <PilcrowIcon />,
        keywords: ['paragraph'],
      },
      {
        label: 'Heading 1',
        value: HEADING_KEYS.h1,
        icon: <Heading1Icon />,
        keywords: ['title', 'h1'],
      },
      {
        label: 'Heading 2',
        value: HEADING_KEYS.h2,
        icon: <Heading2Icon />,
        keywords: ['subtitle', 'h2'],
      },
      {
        label: 'Heading 3',
        value: HEADING_KEYS.h3,
        icon: <Heading3Icon />,
        keywords: ['subtitle', 'h3'],
      },
      {
        label: 'Bulleted list',
        value: ListStyleType.Disc,
        icon: <ListIcon />,
        keywords: ['unordered', 'ul', '-'],
      },
      {
        label: 'Numbered list',
        value: ListStyleType.Decimal,
        icon: <ListOrdered />,
        keywords: ['ordered', 'ol', '1'],
      },
      {
        label: 'To-do list',
        value: INDENT_LIST_KEYS.todo,
        icon: <Square />,
        keywords: ['checklist', 'task', 'checkbox', '[]'],
      },
      {
        label: 'Toggle',
        value: TogglePlugin.key,
        icon: <ChevronRightIcon />,
        keywords: ['collapsible', 'expandable'],
      },
      {
        label: 'Code Block',
        value: CodeBlockPlugin.key,
        icon: <Code2 />,
        keywords: ['```'],
      },
      {
        label: 'Table',
        value: TablePlugin.key,
        icon: <Table />,
      },
      {
        label: 'Blockquote',
        value: BlockquotePlugin.key,
        icon: <Quote />,
        keywords: ['citation', 'blockquote', 'quote', '>'],
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
    group: 'Basic blocks',
  },
  {
    items: [
      {
        label: 'Table of contents',
        value: TocPlugin.key,
        icon: <TableOfContentsIcon />,
        keywords: ['toc'],
      },
      {
        label: '3 columns',
        value: 'action_three_columns',
        icon: <Columns3Icon />,
      },
      {
        label: 'Equation',
        value: EquationPlugin.key,
        focusEditor: false,
        icon: <RadicalIcon />,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
    group: 'Advanced blocks',
  },
  {
    items: [
      {
        label: 'Date',
        value: DatePlugin.key,
        focusEditor: true,
        icon: <CalendarIcon />,
        keywords: ['time'],
      },
      {
        label: 'Inline Equation',
        value: InlineEquationPlugin.key,
        focusEditor: false,
        icon: <RadicalIcon />,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertInlineElement(editor, value);
      },
    })),
    group: 'Inline',
  },
];

export const SlashInputElement = withRef<typeof PlateElement>(
  ({ className, ...props }, ref) => {
    const { children, element, editor } = props;

    return (
      <PlateElement
        ref={ref}
        as="span"
        className={className}
        data-slate-value={element.value}
        {...props}
      >
        <InlineCombobox element={element} trigger="/">
          <InlineComboboxInput />

          <InlineComboboxContent>
            <InlineComboboxEmpty>No results</InlineComboboxEmpty>

            {groups.map(({ items, group }) => (
              <InlineComboboxGroup key={group}>
                <InlineComboboxGroupLabel>{group}</InlineComboboxGroupLabel>

                {items.map(
                  ({ label, value, focusEditor, icon, keywords, onSelect }) => (
                    <InlineComboboxItem
                      key={value}
                      keywords={keywords}
                      value={value}
                      focusEditor={focusEditor}
                      group={group}
                      onClick={() => onSelect(editor, value)}
                      label={label}
                    >
                      <div className="mr-2 text-muted-foreground">{icon}</div>
                      {label ?? value}
                    </InlineComboboxItem>
                  )
                )}
              </InlineComboboxGroup>
            ))}
          </InlineComboboxContent>
        </InlineCombobox>

        {children}
      </PlateElement>
    );
  }
);
