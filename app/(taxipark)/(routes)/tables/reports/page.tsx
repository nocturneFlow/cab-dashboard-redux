"use client";

import React from "react";

import CashierAdminPage from "./(cashierAdmin)/cashierAdminPage";
import ReportTablePage from "./(reportT)/reportTablePage";
import { Tabs, Tab } from "@nextui-org/react";

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
                  <span>Касса Администратора</span>
                </div>
              }
            >
              <CashierAdminPage />
            </Tab>

            <Tab
              key="kassa"
              title={
                <div className="flex items-center space-x-2">
                  {/* <GalleryIcon /> */}
                  <span>Отчеты</span>
                </div>
              }
            >
              <ReportTablePage />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
