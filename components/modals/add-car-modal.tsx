import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Car {
  id: string;
  car_plate_number: string;
  car_model: string;
}

const formSchema = z.object({
  car_plate_number: z.string().min(1, {
    message: "Поле должно быть заполнено.",
  }),
  car_model: z.string().min(1, {
    message: "Поле должно быть заполнено.",
  }),
});

export const AddCarModal = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      car_plate_number: "",
      car_model: "",
    },
  });

  const checkFieldsFilled = () => {
    try {
      // Проверка данных формы по схеме первой страницы
      formSchema.parse({
        plate_number: form.getValues("car_plate_number"),
        model: form.getValues("car_model"),
      });
      return true; // Вернуть true, если данные соответствуют схеме
    } catch (error) {
      return false; // Вернуть false, если есть ошибки при проверке по схеме
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const car_plate_number = values.car_plate_number;
      const car_model = values.car_model;

      const dataToSend = {
        car_plate_number: car_plate_number,
        car_model: car_model,
      };

      console.log("Отправка данных на сервер:", dataToSend);

      const response = await fetch("https://taxi-service-68bafebbc66d.herokuapp.com/cars/addCar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend), // Отправка только необходимых данных
      });
      if (!response.ok) {
        throw new Error("Failed to add car");
      }
      toast({
        description: "Машина добавлена.",
      });
      console.log(dataToSend);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "О нет! Что-то пошло не так.",
        description:
          "Не удалось добавить машину. Пожалуйста, повторите попытку позже.",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2 mt-0.5" />
          Добавить машину
        </Button>
      </DialogTrigger>
      <DialogContent className="h-auto">
        <DialogHeader>
          <DialogTitle>Добавить машину</DialogTitle>
          <DialogDescription>
            Заполните данные о машине, которую хотите добавить.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="car_plate_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Номер машины</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите номер"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription>
                      Введите номер машины в формате &quot;123ABC12&quot;.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="car_model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Модель машины</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите модель"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription>
                      Введите модель машины, например &quot;Toyota Camry&quot;.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Добавить</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
