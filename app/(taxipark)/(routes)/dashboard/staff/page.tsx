"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarTaxiFront, User } from "lucide-react";
import { AddManagerModal } from "@/components/modals/add-manager-modal";
import { AddDriverModal } from "@/components/modals/add-driver-modal";
import { Skeleton } from "@/components/ui/skeleton";

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
          "https://taxi-service-68bafebbc66d.herokuapp.com/drivers/all"
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
          "https://taxi-service-68bafebbc66d.herokuapp.com/managers/all"
        );
        setManagers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataManager();
    fetchDataDriver();
  }, []);

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
            <Card className="m-5">
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
                        <div className="flex items-center mr-0.5">
                          <User className="mr-5" />
                          {manager.firstName} {manager.lastName}
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
