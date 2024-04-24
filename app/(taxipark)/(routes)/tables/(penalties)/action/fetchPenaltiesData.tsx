// fetchpenaltiesData.tsx
import { useEffect } from "react";
import { useDateRange } from "@/contexts/DateRangeContext";

// Функция для загрузки данных
export async function fetchPenaltiesData(startDate: string, endDate: string) {
  try {
    const response = await fetch(
      `https://taxi-service-34d2f59aac8f.herokuapp.com/fines/allByDate?startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "penalties/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch penaltiess data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Компонент или функция, которая использует даты из контекста для получения данных
export function UsePenaltiessData() {
  const { dateRange } = useDateRange();

  useEffect(() => {
    if (dateRange?.from && dateRange.to) {
      const startDate = dateRange.from.toISOString().split("T")[0];
      const endDate = dateRange.to.toISOString().split("T")[0];
      fetchPenaltiesData(startDate, endDate)
        .then((data) => console.log("Fetched data:", data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [dateRange]); // Зависимость от dateRange для вызова эффекта при его изменении
}
