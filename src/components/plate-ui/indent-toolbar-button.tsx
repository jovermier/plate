'use client';

import { useIndentButton } from '@udecode/plate-indent/react';
import { Indent } from 'lucide-react';
import React from 'react';

import { withRef } from '@udecode/cn';

import { ToolbarButton } from './toolbar';

export const IndentToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const { props } = useIndentButton();

    return (
      <ToolbarButton ref={ref} tooltip="Indent" {...props} {...rest}>
        <Indent />
      </ToolbarButton>
    );
  }
);
