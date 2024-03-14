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

interface Driver {
  id: string;
  first_name: string;
  last_name: string;
}

const formSchema = z.object({
  first_name: z.string().min(1, {
    message: "Поле должно быть заполнено.",
  }),
  last_name: z.string().min(1, {
    message: "Поле должно быть заполнено.",
  }),
});

export const AddDriverModal = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  const checkFieldsFilled = () => {
    try {
      // Проверка данных формы по схеме первой страницы
      formSchema.parse({
        first_name: form.getValues("first_name"),
        last_name: form.getValues("last_name"),
      });
      return true; // Вернуть true, если данные соответствуют схеме
    } catch (error) {
      return false; // Вернуть false, если есть ошибки при проверке по схеме
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const first_name = values.first_name;
      const last_name = values.last_name;

      const dataToSend = {
        first_name: first_name,
        last_name: last_name,
      };

      const response = await fetch("http://localhost:8080/drivers/addDriver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend), // Отправка только необходимых данных
      });
      if (!response.ok) {
        throw new Error("Failed to add driver");
      }
      toast({
        description: "Водитель добавлен.",
      });
      console.log(dataToSend);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "О нет! Что-то пошло не так.",
        description:
          "Не удалось добавить водителя. Пожалуйста, повторите попытку позже.",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2 mt-0.5" />
          Добавить водителя
        </Button>
      </DialogTrigger>
      <DialogContent className="h-auto">
        <DialogHeader>
          <DialogTitle>Добавить водителя</DialogTitle>
          <DialogDescription>
            Введите данные водителя, которого вы хотите добавить.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите имя"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription>Введите имя водителя.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Фамилия</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите фамилию"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription>Введите фамилию водителя.</FormDescription>
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
