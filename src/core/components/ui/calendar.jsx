'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, useDayPicker, useNavigation } from 'react-day-picker';
import { format, setMonth } from 'date-fns';
import { cn } from '@/src/core/lib/cn/cn.js';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/src/core/components/ui/select.jsx';
import { buttonVariants } from '@/src/core/components/ui/button.jsx';

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'grid sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-between pt-1 relative items-center',
        caption_label: 'text-base font-bold',
        nav: 'flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-6 w-6 bg-transparent p-0',
        ),
        nav_button_previous: 'left-1 text-grey-08',
        nav_button_next: 'right-1 text-grey-08',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex justify-between w-full',
        head_cell: 'text-grey-08 rounded-full w-9 font-normal text-xs',
        row: 'flex w-full mt-2 justify-between',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-full [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-full last:[&:has([aria-selected])]:rounded-full focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full focus:bg-primary-main',
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary-main text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft color="#0F0E26" className="h-4 w-4" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight color="#0F0E26" className="h-4 w-4" />
        ),
        Dropdown: (props) => {
          const { fromDate, fromMonth, fromYear, toDate, toMonth, toYear } =
            useDayPicker();
          const { goToMonth, currentMonth } = useNavigation();
          if (props.name === 'months') {
            const selectItems = Array.from({ length: 12 }, (_, i) => ({
              value: i.toString(),
              label: format(setMonth(new Date(), i), 'MMMM'),
            }));
            return (
              <Select
                onValueChange={(newValue) => {
                  const newDate = new Date(currentMonth);
                  newDate.setMonth(parseInt(newValue));
                  goToMonth(newDate);
                }}
                value={props.value?.toString()}
              >
                <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                  {format(currentMonth, 'MMM')}
                </SelectTrigger>
                <SelectContent>
                  {selectItems.map((item) => (
                    <SelectItem value={item.value} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          } else if (props.name === 'years') {
            const earliestYear =
              fromYear || fromMonth?.getFullYear() || fromDate?.getFullYear();
            const latestYear =
              toYear || toMonth?.getFullYear() || toDate?.getFullYear();

            let selectItems = [];

            if (earliestYear && latestYear) {
              const yearsLength = latestYear - earliestYear + 1;
              selectItems = Array.from({ length: yearsLength }, (_, i) => {
                const year = earliestYear + i;
                return { value: year.toString(), label: year.toString() };
              });
            }
            return (
              <Select
                onValueChange={(newValue) => {
                  const newDate = new Date(currentMonth);
                  newDate.setFullYear(parseInt(newValue));
                  goToMonth(newDate);
                }}
                value={props.value?.toString()}
              >
                <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                  {currentMonth.getFullYear()}
                </SelectTrigger>
                <SelectContent>
                  {selectItems.map((item) => (
                    <SelectItem value={item.value} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }
          return null;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
