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
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import GetAllExpenses from "@/app/(taxipark)/(routes)/tables/components/columns/expenses";

interface Manager {
  id: string;
  firstName: string;
  lastName: string;
}
interface Car {
  id: string;
  plate_number: string;
  model: string;
}

interface Driver {
  id: string;
  firstName: string;
  lastName: string;
}

interface ExpenseItemApl {
  id: string;
  expense_item_name: string;
}

const formSchema = z.object({
  manager: z.string().min(2, { message: "Поле должно выбрано." }),
  plate_number: z.string().min(2, { message: "Поле должно выбрано." }),
  driver: z.string().min(2, { message: "Поле должно выбрано." }),

  fuel_cash: z
    .string()
    .min(1, {
      message: "Поле должно быть заполнено.",
    })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  other_cash: z
    .string()
    .min(1, {
      message: "Поле должно быть заполнено.",
    })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  fuel_kaspi: z
    .string()
    .min(1, {
      message: "Поле должно быть заполнено.",
    })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  other_kaspi: z
    .string()
    .min(1, {
      message: "Поле должно быть заполнено.",
    })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  // expenseItemApl: z.string().min(2, { message: "Поле должно выбрано." }),
});

// Схема для первой страницы
const firstPageSchema = z.object({
  manager: z.string().nonempty("Поле должно быть заполнено."),
  plate_number: z.string().nonempty("Поле должно быть заполнено."),
  driver: z.string().nonempty("Поле должно быть заполнено."),
  expenseItemApl: z.string().nonempty("Поле должно быть заполнено."),
  //   expense: z.string(),
});

// Схема для второй страницы
const secondPageSchema = z.object({
  fuel_cash: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  other_cash: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
});

// Схема для третьей страницы
const thirdPageSchema = z.object({
  fuel_kaspi: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  other_kaspi: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
});

export const AddExpensesModal = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [expensesES, setexpensesES] = useState<ExpenseItemApl[]>([]);

  const [loading, setLoading] = useState(true);
  const [formStep, setFormStep] = React.useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      manager: "",
      plate_number: "",
      driver: "",
      // expenseItemApl: "",
      fuel_cash: "",
      other_cash: "",
      fuel_kaspi: "",
      other_kaspi: "",
    },
  });

  // Функция для проверки заполненности полей первой страницы
  const checkFirstPageFieldsFilled = () => {
    try {
      // Проверка данных формы по схеме первой страницы
      firstPageSchema.parse({
        manager: form.getValues("manager"),
        plate_number: form.getValues("plate_number"),
        driver: form.getValues("driver"),
        // expenseItemApl: form.getValues("expenseItemApl"),
      });
      return true; // Вернуть true, если данные соответствуют схеме
    } catch (error) {
      return false; // Вернуть false, если есть ошибки при проверке по схеме
    }
  };

  // Функция для проверки заполненности полей второй страницы
  const checkSecondPageFieldsFilled = () => {
    try {
      // Проверка данных формы по схеме второй страницы
      secondPageSchema.parse({
        fuel_cash: form.getValues("fuel_cash"),
        other_cash: form.getValues("other_cash"),
      });
      return true; // Вернуть true, если данные соответствуют схеме
    } catch (error) {
      return false; // Вернуть false, если есть ошибки при проверке по схеме
    }
  };

  const checkThirdPageFieldsFilled = () => {
    try {
      // Проверка данных формы по схеме третьей страницы
      thirdPageSchema.parse({
        fuel_kaspi: form.getValues("fuel_kaspi"),
        other_kaspi: form.getValues("other_kaspi"),
      });
      return true; // Вернуть true, если данные соответствуют схеме
    } catch (error) {
      return false; // Вернуть false, если есть ошибки при проверке по схеме
    }
  };

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://taxi-service-34d2f59aac8f.herokuapp.com/costs/addCost"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setManagers(data.managers);
      setCars(data.cars);
      setDrivers(data.drivers);
      setexpensesES(data.expensesES);

      setLoading(false);
      console.log("Received data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (loading) {
    return (
      <div>
        <Skeleton className="w-[178px] h-10 mt-6" />
      </div>
    );
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const managerId = values.manager.split(" ")[0]; // Получение только ID менеджера из значения поля manager
      const carId = values.plate_number.split(" ")[0]; // Получение только ID машины из значения поля plate_number
      const driverId = values.driver.split(" ")[0]; // Получение только ID водителя из значения поля driver
      // const expenseId = values.expenseItemApl.split(" ")[0]; // Получение только ID статьи расходов из значения поля expense_item_apl

      const addCahModel = {
        other_cash: values.other_cash,
        fuel_cash: values.fuel_cash,
      };

      const addKaspiModel = {
        other_kaspi: values.other_kaspi,
        fuel_kaspi: values.fuel_kaspi,
      };

      // const addExpensesModel = {
      //   expense_item_id: expenseId,
      // };

      const dataToSend = {
        manager_id: managerId,
        car_id: carId,
        driver_id: driverId,
        addCahModel: addCahModel,
        addKaspiModel: addKaspiModel,
        // addExpensesModel: addExpensesModel,
      };

      const response = await fetch(
        "https://taxi-service-34d2f59aac8f.herokuapp.com/costs/addCost",
        {
          method: "POST",
          headers: {
            "Content-Type": "expenses/json",
          },
          body: JSON.stringify(dataToSend), // Отправка только необходимых данных
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add expenses");
      }
      toast({
        description: "расходы добавлены.",
      });
      console.log(dataToSend);
      form.reset();
      setFormStep(0);
      <GetAllExpenses />;
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "О нет! Что-то пошло не так.",
        description:
          "Не удалось добавить расходы. Пожалуйста, повторите попытку позже.",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2 mt-0.5" />
          Добавить расходы
        </Button>
      </DialogTrigger>
      <DialogContent className="h-auto">
        <DialogHeader>
          <DialogTitle>Добавить расходы</DialogTitle>
          <DialogDescription>
            Внесите изменения в расходы здесь. Нажмите кнопку добавить, когда
            закончите.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div
              className={cn("space-y-3", {
                hidden: formStep != 0,
              })}
            >
              {/* manager */}
              <FormField
                control={form.control}
                name="manager"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Менеджер</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="manager">
                          <SelectValue placeholder="Выбрать" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        {managers.map((manager) => (
                          <SelectItem
                            key={manager.id}
                            value={`${manager.id} ${manager.firstName} ${manager.lastName}`}
                          >
                            {`${manager.firstName} ${manager.lastName}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* car */}
              <FormField
                control={form.control}
                name="plate_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Номер машины</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="carNumber">
                          <SelectValue placeholder="Выбрать" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        {cars.map((car) => (
                          <SelectItem
                            key={car.id}
                            value={`${car.id} ${car.plate_number}`}
                          >
                            {`${car.plate_number}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* driver */}
              <FormField
                control={form.control}
                name="driver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Водитель</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="driver">
                          <SelectValue placeholder="Выбрать" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        {drivers.map((driver) => (
                          <SelectItem
                            key={driver.id}
                            value={`${driver.id} ${driver.firstName} ${driver.lastName}`}
                          >
                            {`${driver.firstName} ${driver.lastName}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              {/* <FormField
                control={form.control}
                name="expenseItemApl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Статья расходов</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="expenseItemApl">
                          <SelectValue placeholder="Выбрать" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        {expensesES && expensesES.length > 0 && (
                          <SelectContent position="popper">
                            {expensesES.map((expenseItemApl) => (
                              <SelectItem
                                key={expenseItemApl.id}
                                value={`${expenseItemApl.id} ${expenseItemApl.expense_item_name}`}
                              >
                                {expenseItemApl.expense_item_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              {/* <FormField
                control={form.control}
                name="expense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Статья расходов</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="expense">
                          <SelectValue placeholder="Выбрать" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        {expensesES.map((expense) => (
                          <SelectItem
                            key={expense.id}
                            value={`${expense.id} ${expense.expense_item_name}`}
                          >
                            {`${expense.expense_item_name}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <div
              className={cn("space-y-3", {
                hidden: formStep != 1,
              })}
            >
              {/* fuel_cash */}
              <FormField
                control={form.control}
                name="fuel_cash"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Наличка - газ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите количество"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* other_cash */}
              <FormField
                control={form.control}
                name="other_cash"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Наличка - Другое</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите количество"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div
              className={cn("space-y-3", {
                hidden: formStep != 2,
              })}
            >
              {/* other_kaspi */}
              <FormField
                control={form.control}
                name="other_kaspi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kaspi - Другое</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите к оличество"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* fuel_kaspi */}
              <FormField
                control={form.control}
                name="fuel_kaspi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kaspi - Газ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите количество"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => {
                    setFormStep((prevStep) => Math.max(0, prevStep - 1));
                  }}
                  className={cn({ hidden: formStep == 0 })}
                >
                  <ArrowLeft className="w-4 h-4 mr-2 mt-1" />
                  Назад
                </Button>
                <Button
                  type="button"
                  className={cn({
                    hidden: formStep == 2,
                  })}
                  variant={"ghost"}
                  onClick={() => {
                    if (
                      formStep === 0 &&
                      checkFirstPageFieldsFilled() // Проверка заполненности полей первой страницы
                    ) {
                      setFormStep((prevStep) => prevStep + 1);
                    } else if (
                      formStep === 1 &&
                      checkSecondPageFieldsFilled() // Проверка заполненности полей второй страницы
                    ) {
                      setFormStep((prevStep) => prevStep + 1);
                    } else if (
                      formStep === 2 &&
                      checkThirdPageFieldsFilled() // Проверка заполненности полей третьей страницы
                    ) {
                      setFormStep((prevStep) => prevStep + 1);
                    } else {
                      // Если условие не выполнено, отображаем toast с сообщением об ошибке
                      toast({
                        title: "Ошибка заполнения",
                        description: "Поля не заполнены или заполнены неверно.",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  Далее
                  <ArrowRight className="w-4 h-4 ml-2 mt-1" />
                </Button>
              </div>
              <DialogClose>
                <Button type="submit" className={cn({ hidden: formStep != 2 })}>
                  Добавить
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
