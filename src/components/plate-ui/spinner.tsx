import { type LucideProps, Loader2Icon } from 'lucide-react';
import React from 'react';

import { cn } from '@udecode/cn';
import { type VariantProps, cva } from 'class-variance-authority';

const spinnerVariants = cva('animate-spin text-muted-foreground', {
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: 'size-4',
      lg: 'size-6',
      sm: 'size-2',
      icon: 'size-10',
    },
  },
});

export const Spinner = ({
  className,
  size,
  ...props
}: Partial<LucideProps & VariantProps<typeof spinnerVariants>>) => (
  <Loader2Icon
    className={cn(spinnerVariants({ size }), className)}
    {...props}
  />
);
