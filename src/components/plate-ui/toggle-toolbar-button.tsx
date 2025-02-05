'use client';

import {
  useToggleToolbarButton,
  useToggleToolbarButtonState,
} from '@udecode/plate-toggle/react';
import { ListCollapseIcon } from 'lucide-react';
import React from 'react';

import { withRef } from '@udecode/cn';

import { ToolbarButton } from './toolbar';

export const ToggleToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const state = useToggleToolbarButtonState();
    const { props } = useToggleToolbarButton(state);

    return (
      <ToolbarButton ref={ref} tooltip="Toggle" {...props} {...rest}>
        <ListCollapseIcon />
      </ToolbarButton>
    );
  }
);
