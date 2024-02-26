import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export const AddApplicationModal = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      console.log("current");
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[1024px]">
        <DialogHeader>
          <DialogTitle>Добавить заявку</DialogTitle>
          <DialogDescription>
            Внесите изменения в заявку здесь. Нажмите кнопку добавить, когда
            закончите.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1">
          <Separator />
          <ScrollArea className="h-[500px]">
            <div className="">
              <form className="p-4">
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label
                      htmlFor="manager"
                      className="mb-4 text-sm font-medium leading-none"
                    >
                      Менеджер
                    </Label>
                    <Select>
                      <SelectTrigger id="manager">
                        <SelectValue placeholder="Выбрать" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {[...Array(5)].map((_, index) => (
                          <SelectItem key={index} value={String(index)}>
                            {index + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-col space-y-1.5">
                    <Label
                      htmlFor="carNumber"
                      className="mb-4 text-sm font-medium leading-none"
                    >
                      Номер машины
                    </Label>
                    <Select>
                      <SelectTrigger id="carNumber">
                        <SelectValue placeholder="Выбрать" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {[...Array(5)].map((_, index) => (
                          <SelectItem key={index} value={String(index)}>
                            {index + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-col space-y-1.5">
                    <Label
                      htmlFor="driver"
                      className="mb-4 text-sm font-medium leading-none"
                    >
                      Водитель
                    </Label>
                    <Select>
                      <SelectTrigger id="driver">
                        <SelectValue placeholder="Выбрать" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {[...Array(5)].map((_, index) => (
                          <SelectItem key={index} value={String(index)}>
                            {index + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-col space-y-1.5">
                    <Label
                      htmlFor="schedule"
                      className="mb-4 text-sm font-medium leading-none"
                    >
                      График
                    </Label>
                    <Select>
                      <SelectTrigger id="schedule">
                        <SelectValue placeholder="Выбрать" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {[...Array(5)].map((_, index) => (
                          <SelectItem key={index} value={String(index)}>
                            {index + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-col space-y-1.5">
                    <Label
                      htmlFor="timeLine"
                      className="mb-4 text-sm font-medium leading-none"
                    >
                      Время на линии
                    </Label>
                    <Input id="timeLine" placeholder="Пример: 20" />
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-col space-y-1.5">
                    <Label
                      htmlFor="yandex"
                      className="mb-4 text-sm font-medium leading-none"
                    >
                      Яндекс
                    </Label>
                    <Input id="yandex" placeholder="Наличные" />
                    <Input id="yandex" placeholder="Безналичные" />
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-col space-y-1.5">
                    <Label
                      htmlFor="cashier"
                      className="mb-4 text-sm font-medium leading-none"
                    >
                      Касса
                    </Label>
                    <Input id="cashier" placeholder="Каспи" />
                    <Input id="cashier" placeholder="Наличные" />
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-col space-y-1.5">
                    <Label
                      htmlFor="costs"
                      className="mb-4 text-sm font-medium leading-none"
                    >
                      Расходы
                    </Label>
                    <Input id="costs" placeholder="Газ" />
                    <Input id="costs" placeholder="Аванс" />
                    <Input id="costs" placeholder="Прочие" />
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-col space-y-1.5">
                    <Label
                      htmlFor="schedule"
                      className="mb-4 text-sm font-medium leading-none"
                    >
                      Статья расходов
                    </Label>
                    <Select>
                      <SelectTrigger id="costs">
                        <SelectValue placeholder="Выбрать" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {[...Array(5)].map((_, index) => (
                          <SelectItem key={index} value={String(index)}>
                            {index + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-col space-y-1.5">
                    <Label
                      htmlFor="fot"
                      className="mb-4 text-sm font-medium leading-none"
                    >
                      ФОТ
                    </Label>
                    <Input id="fot" placeholder="Бонус от компании" />
                  </div>
                </div>
              </form>
            </div>
          </ScrollArea>
          <Separator />
        </div>
        <DialogFooter className="flex flex-row justify-between">
          <Button variant="outline">Отмена</Button>
          <Button type="submit">Добавить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
