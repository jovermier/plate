'use client';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import {
  ParagraphPlugin,
  useEditorRef,
  useSelectionFragmentProp,
} from '@udecode/plate/react';
import {
  ChevronRightIcon,
  Columns3Icon,
  FileCodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  QuoteIcon,
  SquareIcon,
} from 'lucide-react';
import React from 'react';

import { HEADING_KEYS } from '@udecode/plate-heading';
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list';

import {
  getBlockType,
  setBlockType,
  STRUCTURAL_TYPES,
} from '@/components/editor/transforms';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';

const turnIntoItems = [
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
    icon: <ListOrderedIcon />,
    keywords: ['ordered', 'ol', '1'],
  },
  {
    label: 'To-do list',
    value: INDENT_LIST_KEYS.todo,
    icon: <SquareIcon />,
    keywords: ['checklist', 'task', 'checkbox', '[]'],
  },
  {
    label: 'Toggle list',
    value: TogglePlugin.key,
    icon: <ChevronRightIcon />,
    keywords: ['collapsible', 'expandable'],
  },
  {
    label: 'Code',
    value: CodeBlockPlugin.key,
    icon: <FileCodeIcon />,
    keywords: ['```'],
  },
  {
    label: 'Quote',
    value: BlockquotePlugin.key,
    icon: <QuoteIcon />,
    keywords: ['citation', 'blockquote', '>'],
  },
  {
    label: '3 columns',
    value: 'action_three_columns',
    icon: <Columns3Icon />,
  },
];

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  const value = useSelectionFragmentProp({
    defaultValue: ParagraphPlugin.key,
    structuralTypes: STRUCTURAL_TYPES,
    getProp: (node) => getBlockType(node as any),
  });
  const selectedItem = React.useMemo(
    () =>
      turnIntoItems.find(
        (item) => item.value === (value ?? ParagraphPlugin.key)
      ) ?? turnIntoItems[0],
    [value]
  );

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton isDropdown tooltip="Turn into" pressed={openState.open}>
          {selectedItem.label}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="ignore-click-outside/toolbar min-w-0"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          editor.tf.focus();
        }}
        align="start"
      >
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(type) => {
            setBlockType(editor, type);
          }}
          label="Turn into"
        >
          {turnIntoItems.map(({ label, value: itemValue, icon }) => (
            <DropdownMenuRadioItem
              key={itemValue}
              className="min-w-[180px]"
              value={itemValue}
            >
              {icon}
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
