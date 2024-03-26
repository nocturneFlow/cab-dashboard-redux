"use client";

import {
    ColumnDef,
} from '@tanstack/react-table'
import React, { useState } from "react";
import { SalarySalariesDataTable } from "@/components/tables/salaries/salarySalaries-data-table-pagination";
import { fetchSalariesSalariesData } from "../../salaries/action/fetchSalariesSalariesData";


export interface Driver {
    id: number;
    firstName: string;
    lastName: string;
}

export interface SalariesSalaries {
  id: string;
  SalariesSalariesDriver: Driver;

  SalariesSalariesLaborRemunerationFundTotal: string;
  SalariesSalariesLaborRemunerationFundWages: string;
  SalariesSalariesLaborRemunerationFundBonus: string;

  SalariesSalariesPaymentUpfront: string;
  SalariesSalariesPaymentSalary: string;
  SalariesSalariesPaymentDeposit: string;
  SalariesSalariesPaymentPenalty: string;

  SalariesSalariesToThePayment: string;
};

export const SalariesSalariesColumns: ColumnDef<SalariesSalaries>[] = [
    {
        accessorKey: "SalariesSalariesDriver",
        header: "Водители",
        cell: ({ row }) => {
            const { firstName, lastName } = row.original.SalariesSalariesDriver;
            return `${firstName} ${lastName}`;
        },
    },
    {
        accessorKey: "SalariesSalariesLaborRemunerationFundTotal",
        header: "Итого",
    },
    {
        accessorKey: "SalariesSalariesLaborRemunerationFundWages",
        header: "Оклад",
    },
    {
        accessorKey: "SalariesSalariesLaborRemunerationFundBonus",
        header: "Бонус",
    },
    {
        accessorKey: "SalariesSalariesPaymentUpfront",
        header: "Аванс",
    },
    {
        accessorKey: "SalariesSalariesPaymentSalary",
        header: "ЗП",
    },
    {
        accessorKey: "SalariesSalariesPaymentDeposit",
        header: "Депозит ",
    },
    {
        accessorKey: "SalariesSalariesPaymentPenalty",
        header: "Штраф ",
    },
    {
        accessorKey: "SalariesSalariesToThePayment",
        header: "К выплате",
    },
];

export default function GetAllSalariesSalaries() {
    const [dataSalariesSalaries, setDataSalariesSalaries] = React.useState<SalariesSalaries[]>(
      []
    );
  
    React.useEffect(() => {
      async function fetchDataSalariesSalaries() {
        try {
          const salarySalariesData = await fetchSalariesSalariesData(); // Получение данных из вашего API
          console.log(salarySalariesData);
  
          const formattedSalariesSalariesData = salarySalariesData.map(
            (salarySalaries) => ({
              ...salarySalaries,
              salarySalaries: {
                SalariesSalariesLaborRemunerationFundTotal: salarySalaries.SalariesSalariesLaborRemunerationFundTotal,
                SalariesSalariesLaborRemunerationFundWages: salarySalaries.SalariesSalariesLaborRemunerationFundWages,
                SalariesSalariesLaborRemunerationFundBonus: salarySalaries.SalariesSalariesLaborRemunerationFundBonus,

                SalariesSalariesPaymentUpfront: salarySalaries.SalariesSalariesPaymentUpfront,
                SalariesSalariesPaymentSalary: salarySalaries.SalariesSalariesPaymentSalary,
                SalariesSalariesPaymentDeposit: salarySalaries.SalariesSalariesPaymentDeposit,
                SalariesSalariesPaymentPenalty: salarySalaries.SalariesSalariesPaymentPenalty,
                SalariesSalariesToThePayment: salarySalaries.SalariesSalariesToThePayment,

              },
            })
          );
  
          setDataSalariesSalaries(formattedSalariesSalariesData);
        } catch (error) {
          console.error("Error fetching SalariesSalaries data:", error);
        }
      }
      fetchDataSalariesSalaries();
    }, []);
  
    return (
      <SalarySalariesDataTable
        columns={SalariesSalariesColumns}
        data={dataSalariesSalaries.map((salarySalaries) => ({
          ...salarySalaries,
        }))}
      />
    );
  }
  