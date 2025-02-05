import React from 'react';

import type { VariantProps } from 'class-variance-authority';

import { cn } from '@udecode/cn';
import { type PlateStaticProps, PlateStatic } from '@udecode/plate';
import { cva } from 'class-variance-authority';

export const editorVariants = cva(
  cn(
    'group/editor',
    'relative w-full cursor-text select-text overflow-x-hidden whitespace-pre-wrap break-words',
    'rounded-md ring-offset-background focus-visible:outline-none',
    'placeholder:text-muted-foreground/80 [&_[data-slate-placeholder]]:top-[auto_!important] [&_[data-slate-placeholder]]:text-muted-foreground/80 [&_[data-slate-placeholder]]:!opacity-100',
    '[&_strong]:font-bold'
  ),
  {
    defaultVariants: {
      variant: 'none',
    },
    variants: {
      disabled: {
        true: 'cursor-not-allowed opacity-50',
      },
      variant: {
        fullWidth: 'size-full px-16 pb-72 pt-4 text-base sm:px-24',
        ai: 'w-full px-0 text-base md:text-sm',
        aiChat:
          'max-h-[min(70vh,320px)] w-full max-w-[700px] overflow-y-auto px-5 py-3 text-base md:text-sm',
        default:
          'size-full px-16 pb-72 pt-4 text-base sm:px-[max(64px,calc(50%-350px))]',
        select: 'px-3 py-2 text-base data-[readonly]:w-fit',
        demo: 'size-full px-16 pb-72 pt-4 text-base sm:px-[max(64px,calc(50%-350px))]',
        none: '',
      },
      focused: {
        true: 'ring-2 ring-ring ring-offset-2',
      },
    },
  }
);

export function EditorStatic({
  children,
  className,
  variant,
  ...props
}: PlateStaticProps & VariantProps<typeof editorVariants>) {
  return (
    <PlateStatic
      className={cn(editorVariants({ variant }), className)}
      {...props}
    />
  );
}
