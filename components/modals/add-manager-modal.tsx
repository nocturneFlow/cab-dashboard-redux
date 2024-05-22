// AddManagerModal.tsx
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
import Plus from "@geist-ui/icons/plus";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addManager } from "@/lib/managerSlice";
import { RootState } from "@/lib/store";

const formSchema = z.object({
  first_name: z.string().min(1, { message: "Поле должно быть заполнено." }),
  last_name: z.string().min(1, { message: "Поле должно быть заполнено." }),
});

export const AddManagerModal = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { loading, error } = useAppSelector(
    (state: RootState) => state.manager
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await dispatch(addManager(values)).unwrap();
      toast({
        description: "Менеджер добавлен.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "О нет! Что-то пошло не так.",
        description:
          "Не удалось добавить менеджера. Пожалуйста, повторите попытку позже.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="hidden h-8 lg:flex">
          <Plus className="mr-2 h-4 w-4" />
          Новый менеджер
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
              <Button type="submit" disabled={loading}>
                {loading ? "Добавление..." : "Добавить"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
