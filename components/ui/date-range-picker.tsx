import * as React from "react";
import { useEffect } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, startOfMonth, endOfMonth, endOfDay } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setDateRange } from "@/lib/dateRangeSlice";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const dateRange = useSelector(
    (state: RootState) => state.dateRange as DateRange
  );
  const dispatch = useDispatch();

  // Установка начального и конечного дат по умолчанию
  useEffect(() => {
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);

    if (!dateRange.from || !dateRange.to) {
      dispatch(
        setDateRange({
          from: start,
          to: end,
        })
      );
    }
  }, [dispatch, dateRange.from, dateRange.to]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="sm"
            className={cn(
              "ml-auto hidden h-8 lg:flex justify-start text-left font-normal",
              !dateRange.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y", { locale: ru })} -{" "}
                  {format(dateRange.to, "LLL dd, y", { locale: ru })}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y", { locale: ru })
              )
            ) : (
              <span>Выберите дату</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange.from || new Date()}
            selected={{ from: dateRange.from, to: dateRange.to }}
            onSelect={(range) => {
              if (range) {
                dispatch(
                  setDateRange({
                    from: range.from || undefined,
                    to: range.to ? endOfDay(range.to) : undefined,
                  })
                );
              }
            }}
            numberOfMonths={2}
            locale={ru}
            className="capitalize"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
