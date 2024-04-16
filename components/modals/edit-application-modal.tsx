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
import { ArrowLeft, ArrowRight, Edit } from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";
import { Application } from "@/app/(taxipark)/(routes)/tables/components/columns/applications";
import { Skeleton } from "../ui/skeleton";
import { Spinner } from "@nextui-org/react";

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

interface Schedule {
  id: string;
  schedule: string;
}

interface ExpenseItemApl {
  id: string;
  expense_item_name: string;
}

const formSchema = z.object({
  manager: z.string().min(2, { message: "Поле должно выбрано." }),
  plateNumber: z.string().min(2, { message: "Поле должно выбрано." }),
  driver: z.string().min(2, { message: "Поле должно выбрано." }),
  schedule: z.string().min(2, { message: "Поле должно выбрано." }),
  timeLine: z
    .string()
    .min(1, {
      message: "Поле должно быть заполнено.",
    })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  yandexCash: z
    .string()
    .min(1, {
      message: "Поле должно быть заполнено.",
    })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  yandexNoncash: z
    .string()
    .min(1, {
      message: "Поле должно быть заполнено.",
    })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  cashierCash: z
    .string()
    .min(1, {
      message: "Поле должно быть заполнено.",
    })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  cashierKaspi: z
    .string()
    .min(1, {
      message: "Поле должно быть заполнено.",
    })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  costsGas: z
    .string()
    .min(1, {
      message: "Поле должно быть заполнено.",
    })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  costsOther: z
    .string()
    .min(1, {
      message: "Поле должно быть заполнено.",
    })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  costsAdvance: z
    .string()
    .min(1, {
      message: "Поле должно быть заполнено.",
    })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  expenseItemApl: z.string().min(2, { message: "Поле должно выбрано." }),
  bonus: z
    .string()
    .min(1, {
      message: "Поле должно быть заполнено.",
    })
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
});

// Схема для первой страницы
const firstPageSchema = z.object({
  manager: z.string().nonempty("Поле должно быть заполнено."),
  plateNumber: z.string().nonempty("Поле должно быть заполнено."),
  driver: z.string().nonempty("Поле должно быть заполнено."),
  schedule: z.string().nonempty("Поле должно быть заполнено."),
});

// Схема для второй страницы
const secondPageSchema = z.object({
  timeLine: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
});

// Схема для третьей страницы
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

const fifthPageSchema = z.object({
  costsGas: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  costsOther: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  costsAdvance: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  expenseItemApl: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
  bonus: z
    .string()
    .nonempty("Поле должно быть заполнено.")
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Поле должно быть числом.",
    }),
});

interface Props {
  // isOpen: boolean;
  // onClose: () => void;
  data: Application;
}

export const EditApplicationModal: React.FC<Props> = ({
  // isOpen,
  // onClose,
  data,
}) => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [expenseItemApls, setExpenseItemApls] = useState<ExpenseItemApl[]>([]);
  const [loading, setLoading] = useState(true);
  const [formStep, setFormStep] = React.useState(0);
  // const [isOpen, setIsOpen] = useState(false);

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  const form = useForm<z.infer<typeof formSchema>>({
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

  // Функция для проверки заполненности полей первой страницы
  const checkFirstPageFieldsFilled = () => {
    try {
      // Проверка данных формы по схеме первой страницы
      firstPageSchema.parse({
        manager: form.getValues("manager"),
        plateNumber: form.getValues("plateNumber"),
        driver: form.getValues("driver"),
        schedule: form.getValues("schedule"),
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
        timeLine: form.getValues("timeLine"),
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
        yandexCash: form.getValues("yandexCash"),
        yandexNoncash: form.getValues("yandexNoncash"),
      });
      return true; // Вернуть true, если данные соответствуют схеме
    } catch (error) {
      return false; // Вернуть false, если есть ошибки при проверке по схеме
    }
  };

  const checkFourthPageFieldsFilled = () => {
    try {
      // Проверка данных формы по схеме третьей страницы
      fourthPageSchema.parse({
        cashierCash: form.getValues("cashierCash"),
        cashierKaspi: form.getValues("cashierKaspi"),
      });
      return true; // Вернуть true, если данные соответствуют схеме
    } catch (error) {
      return false; // Вернуть false, если есть ошибки при проверке по схеме
    }
  };

  const checkFifthPageFieldsFilled = () => {
    try {
      // Проверка данных формы по схеме третьей страницы
      fifthPageSchema.parse({
        costsGas: form.getValues("costsGas"),
        costsOther: form.getValues("costsOther"),
        costsAdvance: form.getValues("costsAdvance"),
        expenseItemApl: form.getValues("expenseItemApl"),
        bonus: form.getValues("bonus"),
      });
      return true; // Вернуть true, если данные соответствуют схеме
    } catch (error) {
      return false; // Вернуть false, если есть ошибки при проверке по схеме
    }
  };

  const { toast } = useToast();

  const { register, setValue } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://taxi-service-34d2f59aac8f.herokuapp.com/applications/addApplication"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setManagers(data.managers);
      setCars(data.cars);
      setDrivers(data.drivers);
      setSchedules(data.schedules);
      setExpenseItemApls(data.expenseItemApls);
      setLoading(false);
      console.log("Received data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner label="Загрузка..." color="primary" />
      </div>
    );
  }

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
        `https://taxi-service-34d2f59aac8f.herokuapp.com/applications/${data.id}/editApplication`,
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
      setFormStep(0);
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

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
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
            {/* car number */}
            <FormField
              control={form.control}
              name="plateNumber"
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
            />
            {/* schedule */}
            <FormField
              control={form.control}
              name="schedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>График</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger id="schedule">
                        <SelectValue placeholder="Выбрать" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      {schedules.map((schedule) => (
                        <SelectItem
                          key={schedule.id}
                          value={`${schedule.id} ${schedule.schedule}`}
                        >
                          {`${schedule.schedule}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div
            className={cn("space-y-3", {
              hidden: formStep != 1,
            })}
          >
            {/* time on line */}
            <FormField
              control={form.control}
              name="timeLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Время на линии</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Пример: 20"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
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
            {/* yandex.cash */}
            <FormField
              control={form.control}
              name="yandexCash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Яндекс.наличные</FormLabel>
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
            {/* yandex.noncash */}
            <FormField
              control={form.control}
              name="yandexNoncash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Яндекс.безналичные</FormLabel>
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
              hidden: formStep != 3,
            })}
          >
            {/* cashier cash */}
            <FormField
              control={form.control}
              name="cashierCash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Касса - наличные</FormLabel>
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
            {/* cashier noncash/kaspi */}
            <FormField
              control={form.control}
              name="cashierKaspi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Касса - kaspi</FormLabel>
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
              hidden: formStep != 4,
            })}
          >
            {/* costs gas */}
            <FormField
              control={form.control}
              name="costsGas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Расходы - Газ</FormLabel>
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
            {/* costs advance */}
            <FormField
              control={form.control}
              name="costsAdvance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Расходы - Аванс</FormLabel>
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
            {/* costs other */}
            <FormField
              control={form.control}
              name="costsOther"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Расходы - Прочие</FormLabel>
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
            <FormField
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
                      <SelectTrigger id="expenseitemApl">
                        <SelectValue placeholder="Выбрать" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      {expenseItemApls.map((expenseItemApl) => (
                        <SelectItem
                          key={expenseItemApl.id}
                          value={`${expenseItemApl.id} ${expenseItemApl.expense_item_name}`}
                        >
                          {`${expenseItemApl.expense_item_name}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bonus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Бонус от компании</FormLabel>
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
            {/* costs item */}
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
                  hidden: formStep == 4,
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
                  } else if (
                    formStep === 3 &&
                    checkFourthPageFieldsFilled() // Проверка заполненности полей четвертой страницы
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
            <Button
              type="submit"
              className={cn({ hidden: formStep != 4 })}
              // onClick={onClose}
            >
              Добавить
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
