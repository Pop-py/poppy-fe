'use client';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';
import { LikeActive, LikeInactive } from '@/public';

const buttonVariants = cva(
  'inline-flex items-center justify-center w-fit h-28 px-8 py-6 border border-gray-200 rounded',
  {
    variants: {
      variant: {
        active: 'bg-blue-100 text-blue-500',
        inactive: 'bg-white text-gray-400',
      },
    },
    defaultVariants: {
      variant: 'inactive',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  value: number;
}

const LikeIconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, value, asChild = false, onClick, ...props }, ref) => {
    const [currentVariant, setCurrentVariant] = React.useState(variant || 'inactive');
    const Comp = asChild ? Slot : 'button';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setCurrentVariant(prev => (prev === 'active' ? 'inactive' : 'active'));
      if (onClick) {
        onClick(e);
      }
    };

    const textColor = currentVariant === 'active' ? 'text-blue-500' : 'text-gray-400';

    return (
      <Comp
        className={cn(buttonVariants({ variant: currentVariant, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}>
        <span className="mr-4">{currentVariant === 'active' ? <LikeActive /> : <LikeInactive />}</span>
        <span className={cn('text-c1', textColor)}>{value}</span>
      </Comp>
    );
  },
);
LikeIconButton.displayName = 'Button';

export { LikeIconButton, buttonVariants };
