'use client';

import { PlaceholderPlugin } from '@udecode/plate-media/react';

import { DndPlugin } from '@udecode/plate-dnd';
import { NodeIdPlugin } from '@udecode/plate-node-id';

import { DraggableAboveNodes } from '@/components/plate-ui/draggable';

export const dndPlugins = [
  NodeIdPlugin,
  DndPlugin.configure({
    render: {
      aboveNodes: DraggableAboveNodes,
    },
    options: {
      enableScroller: true,
      onDropFiles: ({ dragItem, target, editor }) => {
        editor
          .getTransforms(PlaceholderPlugin)
          .insert.media(dragItem.files, { at: target, nextBlock: false });
      },
    },
  }),
] as const;
