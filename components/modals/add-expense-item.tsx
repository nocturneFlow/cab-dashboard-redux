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
import { Plus } from "@geist-ui/icons";
import * as React from "react";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ExpenseItem {
  id: string;
  name: string;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Поле должно быть заполнено.",
  }),
});

export const AddExpenseItemModal = () => {
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const checkFieldsFilled = () => {
    try {
      formSchema.parse({
        name: form.getValues("name"),
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const name = values.name;

      const dataToSend = {
        name: name,
      };

      console.log("Отправка данных на сервер:", dataToSend);

      const response = await fetch(
        "https://taxi-service-34d2f59aac8f.herokuapp.com/applications/addExpenseItem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add car");
      }
      toast({
        description: "Статья расходов добавлена.",
      });
      console.log(dataToSend);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "О нет! Что-то пошло не так.",
        description:
          "Не удалось добавить статью расходов. Пожалуйста, повторите попытку позже.",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Plus className="w-4 h-4 mr-2 mt-0.5" />
          Новая статья расходов
        </Button>
      </DialogTrigger>
      <DialogContent className="h-auto">
        <DialogHeader>
          <DialogTitle>Добавить статью расходов</DialogTitle>
          <DialogDescription>
            Добавьте статью расходов, которую вы хотите использовать.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Пример: Бензин..."
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription>
                      Введите название статьи расходов, например
                      &quot;Бензин&quot;.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Добавить</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
