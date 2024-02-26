"use client";

import { useTaxiparkModal } from "@/hooks/use-taxipark-modal";
import { Modal } from "@/components/ui/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Название должно содержать хотя бы 3 буквы.",
  }),
});

export const TaxiparkModal = () => {
  const taxiparkModal = useTaxiparkModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/taxipark", values);

      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Что-то пошло не так.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Создайте парк"
      description="Добавьте новый таксопарк для управления категориями"
      isOpen={taxiparkModal.isOpen}
      onClose={taxiparkModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Тест" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={taxiparkModal.onClose}
                >
                  Отмена
                </Button>
                <Button disabled={loading} type="submit">
                  Далее
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
