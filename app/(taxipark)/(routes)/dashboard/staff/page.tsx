"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarTaxiFront, Trash2, User } from "lucide-react";
import { AddManagerModal } from "@/components/modals/add-manager-modal";
import { AddDriverModal } from "@/components/modals/add-driver-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteManager } from "@/components/modals/delete-manager";
import { Button } from "@/components/ui/button";
import { deleteDriver } from "@/components/modals/delete-driver";

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

const StaffPage = () => {
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
        <div className="grid min-h-screen w-full border rounded-md">
          <div className="grid grid-cols-2">
            <Card className="m-5 border-none">
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
                        <div className="flex items-center mr-0.5 justify-between">
                          <div className="flex">
                            <User className="mr-5" />
                            {manager.firstName} {manager.lastName}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteManager(manager.id)}
                          >
                            <svg
                              data-testid="geist-icon"
                              height="16"
                              stroke-linejoin="round"
                              viewBox="0 0 16 16"
                              width="16"
                              style={{ color: "hsl(0 84.2% 60.2%)" }}
                              className="ml-1"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5.75 0C3.95507 0 2.5 1.45507 2.5 3.25V3.75C2.5 5.54493 3.95507 7 5.75 7H6.25C8.04493 7 9.5 5.54493 9.5 3.75V3.25C9.5 1.45507 8.04493 0 6.25 0H5.75ZM4 3.25C4 2.2835 4.7835 1.5 5.75 1.5H6.25C7.2165 1.5 8 2.2835 8 3.25V3.75C8 4.7165 7.2165 5.5 6.25 5.5H5.75C4.7835 5.5 4 4.7165 4 3.75V3.25ZM10.5 5.75H15.5V7.25H10.5V5.75ZM1.5 13.1709V14.5H10.5V13.1709C9.68042 11.5377 8.00692 10.5 6.17055 10.5H5.82945C3.99308 10.5 2.31958 11.5377 1.5 13.1709ZM0.0690305 12.6857C1.10604 10.4388 3.35483 9 5.82945 9H6.17055C8.64517 9 10.894 10.4388 11.931 12.6857L12 12.8353V13V15.25V16H11.25H0.75H0V15.25V13V12.8353L0.0690305 12.6857Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </Button>
                        </div>
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
            <Card className="m-5 border-none">
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
                        <div className="flex items-center mr-0.5">
                          <User className="mr-5" />
                          {driver.firstName} {driver.lastName}
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteDriver(driver.id)}
                            className="ml-auto"
                          >
                            <svg
                              data-testid="geist-icon"
                              height="16"
                              stroke-linejoin="round"
                              viewBox="0 0 16 16"
                              width="16"
                              style={{ color: "hsl(0 84.2% 60.2%)" }}
                              className="ml-1"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5.75 0C3.95507 0 2.5 1.45507 2.5 3.25V3.75C2.5 5.54493 3.95507 7 5.75 7H6.25C8.04493 7 9.5 5.54493 9.5 3.75V3.25C9.5 1.45507 8.04493 0 6.25 0H5.75ZM4 3.25C4 2.2835 4.7835 1.5 5.75 1.5H6.25C7.2165 1.5 8 2.2835 8 3.25V3.75C8 4.7165 7.2165 5.5 6.25 5.5H5.75C4.7835 5.5 4 4.7165 4 3.75V3.25ZM10.5 5.75H15.5V7.25H10.5V5.75ZM1.5 13.1709V14.5H10.5V13.1709C9.68042 11.5377 8.00692 10.5 6.17055 10.5H5.82945C3.99308 10.5 2.31958 11.5377 1.5 13.1709ZM0.0690305 12.6857C1.10604 10.4388 3.35483 9 5.82945 9H6.17055C8.64517 9 10.894 10.4388 11.931 12.6857L12 12.8353V13V15.25V16H11.25H0.75H0V15.25V13V12.8353L0.0690305 12.6857Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </Button>
                        </div>
                        <div className="flex items-center mr-0.5">
                          <CarTaxiFront className="mr-5" />
                          {driver.car.plate_number} {driver.car.model}
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
    </>
  );
};

export default StaffPage;
