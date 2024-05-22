// AddCarModal.tsx
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
import Plus from "@geist-ui/icons/plus";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addCar } from "@/lib/carFormSlice";
import { RootState } from "@/lib/store";

const formSchema = z.object({
  car_plate_number: z
    .string()
    .min(1, { message: "Поле должно быть заполнено." }),
  car_model: z.string().min(1, { message: "Поле должно быть заполнено." }),
});

export const AddCarModal = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { loading, error } = useAppSelector(
    (state: RootState) => state.carForm
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      car_plate_number: "",
      car_model: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await dispatch(addCar(values)).unwrap();
      toast({
        description: "Машина добавлена.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "О нет! Что-то пошло не так.",
        description:
          "Не удалось добавить машину. Пожалуйста, повторите попытку позже.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Plus className="w-4 h-4 mr-2" />
          Новая машина
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
