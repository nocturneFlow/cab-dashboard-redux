// import { SalariesCashier } from "../../components/columns/salariesCashier";

// export async function fetchSalariesCashierData(): Promise<SalariesCashier[]> {
//   const response = await fetch(
//     "https://taxi-service-34d2f59aac8f.herokuapp.com/SalariesCashier/all",
//     {
//       next: { revalidate: 30 },
//     }
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch SalariesCashier data");
//   }
//   return await response.json();
// }
// http://localhost:8080/payouts/allByDate?startDate=2024-03-01&endDate=2024-03-04
// import { SalariesCountAccurals } from "../../components/columns/salaryCountAccurals";
import { useEffect } from "react";
import { useDateRange } from "@/contexts/DateRangeContext";

// Функция для загрузки данных
export async function fetchSalariesCashierData(
  startDate: string,
  endDate: string
) {
  try {
    const response = await fetch(
      `https://taxi-service-34d2f59aac8f.herokuapp.com/payouts/allByDate?startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "SalariesCashier/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch SalariesCashier data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Компонент или функция, которая использует даты из контекста для получения данных
export function UseSalariesCashierData() {
  const { dateRange } = useDateRange();

  useEffect(() => {
    if (dateRange?.from && dateRange.to) {
      const startDate = dateRange.from.toISOString().split("T")[0];
      const endDate = dateRange.to.toISOString().split("T")[0];
      fetchSalariesCashierData(startDate, endDate)
        .then((data) => console.log("Fetched data:", data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [dateRange]); // Зависимость от dateRange для вызова эффекта при его изменении
}
