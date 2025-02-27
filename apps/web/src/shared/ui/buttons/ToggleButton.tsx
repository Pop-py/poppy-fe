'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/src/shared/lib/utils';

const ToggleButton = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, defaultChecked, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex w-56 h-32 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-200',
      className,
    )}
    defaultChecked={defaultChecked}
    {...props}
    ref={ref}>
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-26 w-26 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-25 data-[state=unchecked]:translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
));
ToggleButton.displayName = SwitchPrimitives.Root.displayName;

export { ToggleButton };
