import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  Manager,
  Car,
  Driver,
  Schedule,
  ExpenseItemApl,
} from "@/lib/applicationSlice";
import { RootState, AppDispatch } from "@/lib/store";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Plus } from "@geist-ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  manager: z.string().min(2, { message: "Поле должно выбрано." }),
  plateNumber: z.string().min(2, { message: "Поле должно выбрано." }),
  driver: z.string().min(2, { message: "Поле должно выбрано." }),
  schedule: z.string().min(2, { message: "Поле должно выбрано." }),
  timeLine: z
    .string()
    .min(1, { message: "Поле должно быть заполнено." })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  yandexCash: z
    .string()
    .min(1, { message: "Поле должно быть заполнено." })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  yandexNoncash: z
    .string()
    .min(1, { message: "Поле должно быть заполнено." })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  cashierCash: z
    .string()
    .min(1, { message: "Поле должно быть заполнено." })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  cashierKaspi: z
    .string()
    .min(1, { message: "Поле должно быть заполнено." })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  costsGas: z
    .string()
    .min(1, { message: "Поле должно быть заполнено." })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  costsOther: z
    .string()
    .min(1, { message: "Поле должно быть заполнено." })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  costsAdvance: z
    .string()
    .min(1, { message: "Поле должно быть заполнено." })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  expenseItemApl: z.string().min(2, { message: "Поле должно выбрано." }),
  bonus: z
    .string()
    .min(1, { message: "Поле должно быть заполнено." })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
});

// Схемы для страниц
const firstPageSchema = z.object({
  manager: z.string().nonempty("Поле должно быть заполнено."),
  plateNumber: z.string().nonempty("Поле должно быть заполнено."),
  driver: z.string().nonempty("Поле должно быть заполнено."),
  schedule: z.string().nonempty("Поле должно быть заполнено."),
});

const secondPageSchema = z.object({
  timeLine: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
});

const thirdPageSchema = z.object({
  yandexCash: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  yandexNoncash: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
});

const fourthPageSchema = z.object({
  cashierCash: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  cashierKaspi: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
});

const AddApplicationModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Убедитесь, что типизация dispatch корректна
  const {
    managers,
    cars,
    drivers,
    schedules,
    expenseItemApls,
    loading,
    error,
  } = useSelector((state: RootState) => state.application);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const { toast } = useToast();

  const [page, setPage] = useState(1);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      manager: "",
      plateNumber: "",
      driver: "",
      schedule: "",
      timeLine: "",
      yandexCash: "",
      yandexNoncash: "",
      cashierCash: "",
      cashierKaspi: "",
      costsGas: "",
      costsOther: "",
      costsAdvance: "",
      expenseItemApl: "",
      bonus: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const managerId = values.manager.split(" ")[0]; // Получение только ID менеджера из значения поля manager
      const carId = values.plateNumber.split(" ")[0]; // Получение только ID машины из значения поля plateNumber
      const driverId = values.driver.split(" ")[0]; // Получение только ID водителя из значения поля driver
      const scheduleId = values.schedule.split(" ")[0]; // Получение только ID графика из значения поля schedule
      const expenseItemAplId = values.expenseItemApl.split(" ")[0]; // Получение только ID статьи расходов из значения поля expense_item_apl

      const addYandexDataModel = {
        cashless_amount: values.yandexCash,
        cash_amount: values.yandexNoncash,
      }; // Создание объекта с данными о суммах платежей

      const addPaymentModel = {
        payment_cash: values.cashierCash,
        payment_cashless: values.cashierKaspi,
      }; // Создание объекта с данными о платежах

      const addPayrollModel = {
        bonus_from_company: values.bonus,
      }; // Создание объекта с данными о выплатах

      const addExpenseAplModel = {
        gas: values.costsGas,
        other: values.costsOther,
        advance: values.costsAdvance,
        expense_item_id: expenseItemAplId,
      }; // Создание объекта с данными о расходах

      const dataToSend = {
        manager_id: managerId,
        car_id: carId,
        driver_id: driverId,
        schedule_id: scheduleId,
        time_on_line: values.timeLine,
        addYandexDataModel: addYandexDataModel,
        addPaymentModel: addPaymentModel,
        addPayrollModel: addPayrollModel,
        addExpenseAplModel: addExpenseAplModel,
      }; // Создание объекта с необходимыми данными

      const response = await fetch(
        "https://taxi-service-34d2f59aac8f.herokuapp.com/applications/addApplication",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend), // Отправка только необходимых данных
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add application");
      }
      toast({
        description: "Заявка добавлена.",
      });
      console.log(dataToSend);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "О нет! Что-то пошло не так.",
        description:
          "Не удалось добавить заявку. Пожалуйста, повторите попытку позже.",
      });
    }
  }

  const handleNext = () => {
    if (page === 1) {
      const result = firstPageSchema.safeParse(form.getValues());
      if (result.success) {
        setPage(page + 1);
      } else {
        form.setError("manager", { message: result.error.errors[0].message });
      }
    } else if (page === 2) {
      const result = secondPageSchema.safeParse(form.getValues());
      if (result.success) {
        setPage(page + 1);
      } else {
        form.setError("timeLine", { message: result.error.errors[0].message });
      }
    } else if (page === 3) {
      const result = thirdPageSchema.safeParse(form.getValues());
      if (result.success) {
        setPage(page + 1);
      } else {
        form.setError("yandexCash", {
          message: result.error.errors[0].message,
        });
      }
    } else if (page === 4) {
      const result = fourthPageSchema.safeParse(form.getValues());
      if (result.success) {
        setPage(page + 1);
      } else {
        form.setError("cashierCash", {
          message: result.error.errors[0].message,
        });
      }
    }
  };

  const handlePrevious = () => {
    setPage(page - 1);
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
          Новая заявка
        </Button>
      </DialogTrigger>
      <DialogContent className="h-auto">
        <DialogHeader>
          <DialogTitle>Новая заявка</DialogTitle>
          <DialogDescription>Заполните форму</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {page === 1 && (
              <div className="space-y-3">
                <Controller
                  name="manager"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Менеджер</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите менеджера" />
                          </SelectTrigger>
                          <SelectContent>
                            {managers.map((manager) => (
                              <SelectItem
                                key={manager.id}
                                value={manager.id.toString()}
                              >
                                {`${manager.firstName} ${manager.lastName}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  name="plateNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Номер автомобиля</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите номер автомобиля" />
                          </SelectTrigger>
                          <SelectContent>
                            {cars.map((car) => (
                              <SelectItem
                                key={car.id}
                                value={car.id.toString()}
                              >
                                {`${car.plate_number} - ${car.model}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  name="driver"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Водитель</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите водителя" />
                          </SelectTrigger>
                          <SelectContent>
                            {drivers.map((driver) => (
                              <SelectItem
                                key={driver.id}
                                value={driver.id.toString()}
                              >
                                {`${driver.firstName} ${driver.lastName}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  name="schedule"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>График</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите график" />
                          </SelectTrigger>
                          <SelectContent>
                            {schedules.map((schedule) => (
                              <SelectItem
                                key={schedule.id}
                                value={schedule.id.toString()}
                              >
                                {schedule.schedule}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {page === 2 && (
              <Controller
                name="timeLine"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Время выполнения</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите время выполнения"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {page === 3 && (
              <div className="space-y-3">
                <Controller
                  name="yandexCash"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Касса Яндекс (наличные)</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите сумму" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  name="yandexNoncash"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Касса Яндекс (безналичные)</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите сумму" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {page === 4 && (
              <div className="space-y-3">
                <Controller
                  name="cashierCash"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Касса (наличные)</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите сумму" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  name="cashierKaspi"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Касса (Kaspi)</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите сумму" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {page === 5 && (
              <div className="space-y-3">
                <Controller
                  name="costsGas"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Затраты на бензин</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите сумму" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  name="costsOther"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Прочие затраты</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите сумму" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  name="costsAdvance"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Аванс</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите сумму" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  name="expenseItemApl"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Статья расходов</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите статью расходов" />
                          </SelectTrigger>
                          <SelectContent>
                            {expenseItemApls.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}
                              >
                                {item.expense_item_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  name="bonus"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Бонус</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите сумму" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <DialogFooter className="mt-5">
              {page > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Назад
                </Button>
              )}
              {page < 5 ? (
                <Button onClick={handleNext}>Далее</Button>
              ) : (
                <Button type="submit">Сохранить</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
        {loading && <Skeleton />}
        {error && <div className="error-message">{error}</div>}
      </DialogContent>
      <DialogClose />
    </Dialog>
  );
};

export default AddApplicationModal;
