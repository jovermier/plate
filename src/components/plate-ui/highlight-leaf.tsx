'use client';

import { PlateLeaf } from '@udecode/plate/react';
import React from 'react';

import { cn, withRef } from '@udecode/cn';

export const HighlightLeaf = withRef<typeof PlateLeaf>(
  ({ children, className, ...props }, ref) => (
    <PlateLeaf
      ref={ref}
      as="mark"
      className={cn(className, 'bg-highlight/30 text-inherit')}
      {...props}
    >
      {children}
    </PlateLeaf>
  )
);
