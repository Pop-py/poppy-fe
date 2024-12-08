'use client';

import * as React from 'react';

import { DayPicker } from 'react-day-picker';

import { cn } from '@/src/shared/lib/utils';
import { buttonVariants } from '@/src/shared/ui/button';
import { ChevronLeft, ChevronRight } from '@/public';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('mx-auto min-w-[327px]', className)}
      classNames={{
        caption: 'flex justify-center relative items-center h-6 mb-4 px-1.5',
        caption_label: 'text-h2',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(buttonVariants({ variant: 'none' }), 'bg-transparent p-0 opacity-50 hover:opacity-100'),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex justify-between h-10 items-center mb-1',
        head_cell:
          'text-muted-foreground rounded-xl w-10 h-10 font-normal text-h4 text-gray-500 flex items-center justify-center',
        row: 'flex w-full justify-between h-10 items-center mb-3 gap-2',
        cell: cn(
          'relative p-0 text-center focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-xl w-10 h-10',
        ),
        day: cn(buttonVariants({ variant: 'ghost' }), 'h-10 w-10 p-0 text-h4 aria-selected:opacity-100 text-gray-600'),
        day_selected:
          'bg-primary text-primary-foreground hover:bg-blue500 hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_disabled: 'text-muted-foreground opacity-50 text-gray-300',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="" />,
        IconRight: () => <ChevronRight className="w-full h-auto" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
