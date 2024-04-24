"use client";

import React from "react";

import ApplicationsTablePage from "./(applications)/applicationsTablePage";
import ManagersCashierTablePage from "./(kassa)/cashierTablePage";
import SalariesTablePage from "./(salaries)/salariesTablePage";
import CarsTablePage from "./(cars)/carsTablePage";
import OilTablePage from "./(oil)/oilTablePage";
import PenaltiesTablePage from "./(penalties)/penaltiesTablePage";
import ExpensesTablePage from "./(expenses)/expensesTablePage";
import { Tabs, Tab } from "@nextui-org/react";
import { TestModal } from "@/components/modals/test-add-application-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TablesPage() {
  return (
    <>
      <div className="flex items-center justify-between  my-5 mx-10">
        <div className="flex w-full flex-col space-y-6">
          <Tabs
            aria-label="tables"
            color="primary"
            variant="underlined"
            classNames={{
              tabList:
                "gap-10 w-full relative rounded-none p-0 border-b border-divider",
              tab: "max-w-fit px-0 h-12 text-sm font-medium text-muted/90",
            }}
          >
            <Tab
              key="applications"
              title={
                <div className="flex items-center space-x-2">
                  {/* <GalleryIcon /> */}
                  <span>Заявки</span>
                </div>
              }
            >
              <ApplicationsTablePage />
            </Tab>

            <Tab
              key="kassa"
              title={
                <div className="flex items-center space-x-2">
                  {/* <GalleryIcon /> */}
                  <span>Касса Менеджера</span>
                </div>
              }
            >
              <ManagersCashierTablePage />
            </Tab>

            <Tab
              key="expenses"
              title={
                <div className="flex items-center space-x-2">
                  {/* <GalleryIcon /> */}
                  <span>Расходы Менеджера</span>
                </div>
              }
            >
              {/* <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Добавить заявку</DialogTitle>
                    <DialogDescription>
                      Добавьте заявку для водителя
                    </DialogDescription>
                  </DialogHeader>
                  <TestModal />
                </DialogContent>
              </Dialog> */}
              <ExpensesTablePage />
            </Tab>

            <Tab
              key="salaries"
              title={
                <div className="flex items-center space-x-2">
                  {/* <GalleryIcon /> */}
                  <span>Зарплата</span>
                </div>
              }
            >
              <SalariesTablePage />
            </Tab>

            <Tab
              key="cars"
              title={
                <div className="flex items-center space-x-2">
                  {/* <GalleryIcon /> */}
                  <span>Машины</span>
                </div>
              }
            >
              <CarsTablePage />
            </Tab>

            <Tab
              key="penalties"
              title={
                <div className="flex items-center space-x-2">
                  {/* <GalleryIcon /> */}
                  <span>Штрафы</span>
                </div>
              }
            >
              <PenaltiesTablePage />
            </Tab>
            <Tab
              key="oil"
              title={
                <div className="flex items-center space-x-2">
                  {/* <GalleryIcon /> */}
                  <span>Масло</span>
                </div>
              }
            >
              <OilTablePage />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
