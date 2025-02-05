'use client';

import type { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import { Check } from 'lucide-react';
import React from 'react';

import { cn } from '@udecode/cn';

import { buttonVariants } from './button';
import { DropdownMenuItem } from './dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

export type TColor = {
  name: string;
  value: string;
  isBrightColor: boolean;
};

type ColorDropdownMenuItemProps = {
  isSelected: boolean;
  value: string;
  isBrightColor: boolean;
  updateColor: (color: string) => void;
  name?: string;
} & DropdownMenuItemProps;

type ColorDropdownMenuItemsProps = {
  colors: TColor[];
  updateColor: (color: string) => void;
  color?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function ColorDropdownMenuItem({
  className,
  isSelected,
  name,
  value,
  isBrightColor,
  updateColor,
  ...props
}: ColorDropdownMenuItemProps) {
  const content = (
    <DropdownMenuItem
      className={cn(
        buttonVariants({
          isMenu: true,
          size: 'icon',
          variant: 'outline',
        }),
        'my-1 flex size-6 items-center justify-center rounded-full border border-solid border-muted p-0 transition-all hover:scale-125',
        !isBrightColor && 'border-transparent text-white hover:!text-white',
        className
      )}
      style={{ backgroundColor: value }}
      onSelect={(e) => {
        e.preventDefault();
        updateColor(value);
      }}
      {...props}
    >
      {isSelected ? <Check className="!size-3" /> : null}
    </DropdownMenuItem>
  );

  return name ? (
    <Tooltip>
      <TooltipTrigger>{content}</TooltipTrigger>
      <TooltipContent className="mb-1 capitalize">{name}</TooltipContent>
    </Tooltip>
  ) : (
    content
  );
}

export function ColorDropdownMenuItems({
  className,
  color,
  colors,
  updateColor,
  ...props
}: ColorDropdownMenuItemsProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(10,1fr)] place-items-center',
        className
      )}
      {...props}
    >
      <TooltipProvider>
        {colors.map(({ name, value, isBrightColor }) => (
          <ColorDropdownMenuItem
            name={name}
            key={name ?? value}
            value={value}
            isBrightColor={isBrightColor}
            updateColor={updateColor}
            isSelected={color === value}
          />
        ))}
        {props.children}
      </TooltipProvider>
    </div>
  );
}
