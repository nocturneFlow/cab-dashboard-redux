"use client";

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

interface Manager {
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

export const AddManagerModal = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
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

      const response = await fetch(
        "https://taxi-service-34d2f59aac8f.herokuapp.com/managers/addManager",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend), // Отправка только необходимых данных
        }
      );
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
          <svg
            data-testid="geist-icon"
            height="16"
            stroke-linejoin="round"
            viewBox="0 0 16 16"
            width="16"
            style={{ color: "currentcolor" }}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.75 1.75V1H7.25V1.75V6.75H2.25H1.5V8.25H2.25H7.25V13.25V14H8.75V13.25V8.25H13.75H14.5V6.75H13.75H8.75V1.75Z"
              fill="currentColor"
            ></path>
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-auto">
        <DialogHeader>
          <DialogTitle>Добавить менеджера</DialogTitle>
          <DialogDescription>
            Введите данные менеджера, которого вы хотите добавить.
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
                    <FormDescription>Введите имя менеджера.</FormDescription>
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
                    <FormDescription>
                      Введите фамилию менеджера.
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
