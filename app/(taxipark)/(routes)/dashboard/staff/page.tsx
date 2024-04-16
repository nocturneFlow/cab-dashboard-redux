"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CarTaxiFront, User } from "lucide-react";

import { AddManagerModal } from "@/components/modals/add-manager-modal";
import { AddDriverModal } from "@/components/modals/add-driver-modal";
import { deleteManager } from "@/components/modals/delete-manager";
import { deleteDriver } from "@/components/modals/delete-driver";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserX } from "@geist-ui/icons";
import { Badge } from "@/components/ui/badge";

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  car: {
    id: number;
    plate_number: string;
    model: string;
  };
}

interface Manager {
  id: number;
  firstName: string;
  lastName: string;
}

export const StaffPage = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataDriver = async () => {
      try {
        const response = await axios.get(
          "https://taxi-service-34d2f59aac8f.herokuapp.com/drivers/all"
        );
        setDrivers(response.data);
        setTimeout(() => {
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDataManager = async () => {
      try {
        const response = await axios.get(
          "https://taxi-service-34d2f59aac8f.herokuapp.com/managers/all"
        );
        setManagers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataManager();
    fetchDataDriver();
  }, []);

  const handleDeleteManager = async (id: number) => {
    try {
      await deleteManager(id);

      setManagers(managers.filter((manager) => manager.id !== id));
    } catch (error) {
      console.error("Error deleting manager:", error);
    }
  };

  const handleDeleteDriver = async (id: number) => {
    try {
      await deleteDriver(id);

      setDrivers(drivers.filter((driver) => driver.id !== id));
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  function formatPlateNumber(plateNumber: string) {
    if (plateNumber.length > 6) {
      // Добавляем запятую после 6 символа
      return plateNumber.slice(0, 6) + " | " + plateNumber.slice(6);
    }
    return plateNumber;
  }

  return (
    <>
      {loading && (
        <div className="grid min-h-screen w-full border rounded-md">
          <div className="grid grid-cols-2">
            <Card className="m-5">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">
                    <Skeleton className="w-[145px] h-9" />
                  </h1>
                  <Skeleton className="w-[50px] h-9" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(8)].map((_, index) => (
                  <Card key={index}>
                    <CardContent className="mt-5">
                      <ul>
                        <div className="flex items-center mr-0.5">
                          <Skeleton className="w-[30px] h-7 mr-5" />
                          <Skeleton className="w-[170px] h-7" />
                        </div>
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
            <Card className="m-5">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">
                    <Skeleton className="w-[120px] h-9" />
                  </h1>
                  <Skeleton className="w-[50px] h-9" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <Card key={index}>
                    <CardContent className="mt-5">
                      <ul className="space-y-4">
                        <div className="flex items-center mr-0.5">
                          <Skeleton className="w-[30px] h-7 mr-5" />
                          <Skeleton className="w-[170px] h-7" />
                        </div>
                        <div className="flex items-center mr-0.5">
                          <Skeleton className="w-[30px] h-7 mr-5" />
                          <Skeleton className="w-[170px] h-7" />
                        </div>
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Менеджеры</h1>
                <AddManagerModal />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {managers.map((manager) => (
                <Card key={manager.id}>
                  <CardContent className="mt-5">
                    <ul>
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          <User className="mr-5" />
                          {manager.firstName} {manager.lastName}
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button variant="destructive">
                              <UserX className="w-4 h-4 mr-2" />
                              Удалить менеджера
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Вы абсолютно уверены?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Это действие нельзя отменить. Это приведет к
                                окончательному удалению менеджера и удалению
                                данных с серверов.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отменить</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteManager(manager.id)}
                                className="bg-background text-destructive border-destructive border-1 hover:bg-destructive hover:text-background"
                              >
                                Я уверен
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Водители</h1>
                <AddDriverModal />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {drivers.map((driver) => (
                <Card key={driver.id}>
                  <CardContent className="mt-5">
                    <ul className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          <User className="mr-5" />
                          {driver.firstName} {driver.lastName}
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button variant="destructive">
                              <UserX className="w-4 h-4 mr-2" />
                              Удалить водителя
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Вы абсолютно уверены?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Это действие нельзя отменить. Это приведет к
                                окончательному удалению водителя и удалению
                                данных с серверов.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отменить</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteDriver(driver.id)}
                                className="bg-background text-destructive border-destructive border-1 hover:bg-destructive hover:text-background"
                              >
                                Я уверен
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <div className="flex items-center">
                        <CarTaxiFront className="mr-5" />
                        <span className="mr-2">{driver.car.model}</span>
                        <Badge
                          variant="outline"
                          className="rounded-md border-foreground border-1 antialiased"
                        >
                          <span className="mr-1 text-[7px] mt-1">KZ</span>
                          {formatPlateNumber(driver.car.plate_number)}
                        </Badge>
                      </div>
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default StaffPage;
