"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTaxiparkModal } from "@/hooks/use-taxipark-modal";
import { Taxipark } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CarTaxiFrontIcon,
  Check,
  ChevronsUpDown,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TaxiparkSwitcherProps extends PopoverTriggerProps {
  items: Taxipark[];
}

export default function TaxiparkSwitcher({
  className,
  items = [],
}: TaxiparkSwitcherProps) {
  const taxiparkModal = useTaxiparkModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentTaxipark = formattedItems.find(
    (item) => item.value === params.taxiparkId
  );

  const [open, setOpen] = useState(false);

  const onTaxiparkSelect = (taxipark: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${taxipark.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Выберите таксопарк"
          className={cn("w-[200px] justify-between", className)}
        >
          <CarTaxiFrontIcon className="mr-2 h-4 w-4" />
          {currentTaxipark?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-15" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Поиск таксопарка..." />
            <CommandEmpty>Таксопарк не найден.</CommandEmpty>
            <CommandGroup heading="Таксопарки">
              {formattedItems.map((taxipark) => (
                <CommandItem
                  key={taxipark.value}
                  onSelect={() => onTaxiparkSelect(taxipark)}
                  className="text-sm"
                >
                  <CarTaxiFrontIcon className="mr-2 h-4 w-4" />
                  {taxipark.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentTaxipark?.value === taxipark.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  taxiparkModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Создать таксопарк
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
