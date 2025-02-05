'use client';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import {
  useAlignDropdownMenu,
  useAlignDropdownMenuState,
} from '@udecode/plate-alignment/react';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from 'lucide-react';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';

const items = [
  {
    value: 'left',
    icon: AlignLeftIcon,
  },
  {
    value: 'center',
    icon: AlignCenterIcon,
  },
  {
    value: 'right',
    icon: AlignRightIcon,
  },
  {
    value: 'justify',
    icon: AlignJustifyIcon,
  },
];

export function AlignDropdownMenu({ children, ...props }: DropdownMenuProps) {
  const state = useAlignDropdownMenuState();
  const { radioGroupProps } = useAlignDropdownMenu(state);

  const openState = useOpenState();
  const IconValue =
    items.find((item) => item.value === radioGroupProps.value)?.icon ??
    AlignLeftIcon;

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton isDropdown tooltip="Align" pressed={openState.open}>
          <IconValue />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-0" align="start">
        <DropdownMenuRadioGroup {...radioGroupProps}>
          {items.map(({ value: itemValue, icon: Icon }) => (
            <DropdownMenuRadioItem hideIcon key={itemValue} value={itemValue}>
              <Icon />
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
