'use client';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import { DatePlugin } from '@udecode/plate-date/react';
import { ExcalidrawPlugin } from '@udecode/plate-excalidraw/react';
import { TocPlugin } from '@udecode/plate-heading/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import {
  EquationPlugin,
  InlineEquationPlugin,
} from '@udecode/plate-math/react';
import { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react';
import { TablePlugin } from '@udecode/plate-table/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import {
  type PlateEditor,
  ParagraphPlugin,
  useEditorRef,
} from '@udecode/plate/react';
import {
  CalendarIcon,
  ChevronRightIcon,
  Columns3Icon,
  FileCodeIcon,
  FilmIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PenToolIcon,
  PilcrowIcon,
  PlusIcon,
  QuoteIcon,
  RadicalIcon,
  SquareIcon,
  TableIcon,
  TableOfContentsIcon,
} from 'lucide-react';
import React from 'react';

import { HEADING_KEYS } from '@udecode/plate-heading';
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list';

import {
  insertBlock,
  insertInlineElement,
} from '@/components/editor/transforms';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';

type Group = {
  items: Item[];
  group: string;
};

interface Item {
  icon: React.ReactNode;
  onSelect: (editor: PlateEditor, value: string) => void;
  value: string;
  focusEditor?: boolean;
  label?: string;
}

const groups: Group[] = [
  {
    items: [
      {
        label: 'Paragraph',
        value: ParagraphPlugin.key,
        icon: <PilcrowIcon />,
      },
      {
        label: 'Heading 1',
        value: HEADING_KEYS.h1,
        icon: <Heading1Icon />,
      },
      {
        label: 'Heading 2',
        value: HEADING_KEYS.h2,
        icon: <Heading2Icon />,
      },
      {
        label: 'Heading 3',
        value: HEADING_KEYS.h3,
        icon: <Heading3Icon />,
      },
      {
        label: 'Table',
        value: TablePlugin.key,
        icon: <TableIcon />,
      },
      {
        label: 'Code',
        value: CodeBlockPlugin.key,
        icon: <FileCodeIcon />,
      },
      {
        label: 'Quote',
        value: BlockquotePlugin.key,
        icon: <QuoteIcon />,
      },
      {
        label: 'Divider',
        value: HorizontalRulePlugin.key,
        icon: <MinusIcon />,
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
        label: 'Bulleted list',
        value: ListStyleType.Disc,
        icon: <ListIcon />,
      },
      {
        label: 'Numbered list',
        value: ListStyleType.Decimal,
        icon: <ListOrderedIcon />,
      },
      {
        label: 'To-do list',
        value: INDENT_LIST_KEYS.todo,
        icon: <SquareIcon />,
      },
      {
        label: 'Toggle list',
        value: TogglePlugin.key,
        icon: <ChevronRightIcon />,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
    group: 'Lists',
  },
  {
    items: [
      {
        label: 'Image',
        value: ImagePlugin.key,
        icon: <ImageIcon />,
      },
      {
        label: 'Embed',
        value: MediaEmbedPlugin.key,
        icon: <FilmIcon />,
      },
      {
        label: 'Excalidraw',
        value: ExcalidrawPlugin.key,
        icon: <PenToolIcon />,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
    group: 'Media',
  },
  {
    items: [
      {
        label: 'Table of contents',
        value: TocPlugin.key,
        icon: <TableOfContentsIcon />,
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
        label: 'Link',
        value: LinkPlugin.key,
        icon: <Link2Icon />,
      },
      {
        label: 'Date',
        value: DatePlugin.key,
        focusEditor: true,
        icon: <CalendarIcon />,
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

export function InsertDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton isDropdown tooltip="Insert" pressed={openState.open}>
          <PlusIcon />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="flex max-h-[500px] min-w-0 flex-col overflow-y-auto"
        align="start"
      >
        {groups.map(({ items: nestedItems, group }) => (
          <DropdownMenuGroup key={group} label={group}>
            {nestedItems.map(({ label, value, icon, onSelect }) => (
              <DropdownMenuItem
                key={value}
                className="min-w-[180px]"
                onSelect={() => {
                  onSelect(editor, value);
                  editor.tf.focus();
                }}
              >
                {icon}
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
