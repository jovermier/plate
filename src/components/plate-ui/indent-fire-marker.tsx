import type { SlateRenderElementProps } from '@udecode/plate';
import type { TIndentElement } from '@udecode/plate-indent';
import React from 'react';

export const FireMarker = (
  props: Omit<SlateRenderElementProps, 'children'>
) => {
  const { element } = props;

  return (
    <div contentEditable={false}>
      <span
        className="select-none"
        contentEditable={false}
        data-plate-prevent-deserialization
        style={{ left: -26, position: 'absolute', top: -1 }}
      >
        {(element as TIndentElement).indent % 2 === 0 ? '🔥' : '🚀'}
      </span>
    </div>
  );
};

export const FireLiComponent = (props: SlateRenderElementProps) => {
  const { children } = props;

  return <li className="list-none">{children}</li>;
};
