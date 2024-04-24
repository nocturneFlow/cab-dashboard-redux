import { SalariesCountAccurals } from "../../components/columns/salaryCountAccurals";
import { useEffect } from "react";
import { useDateRange } from "@/contexts/DateRangeContext";

interface Props {
  startDate: string;
  endDate: string;
  data: SalariesCountAccurals;
}

export const fetchSalariesCountAccuralsData: React.FC<Props> = ({}) => {
  useEffect(() => {
    try {
      const response = await fetch(
        `https://taxi-service-34d2f59aac8f.herokuapp.com/calculator/1/allByDate?driverId=1&startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "salaryAccural/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch salaryAccural data");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  });
};

// Компонент или функция, которая использует даты из контекста для получения данных
export function UseSalaryAccuralData() {
  const { dateRange } = useDateRange();

  useEffect(() => {
    if (dateRange?.from && dateRange.to) {
      const startDate = dateRange.from.toISOString().split("T")[0];
      const endDate = dateRange.to.toISOString().split("T")[0];
      fetchSalariesCountAccuralsData(startDate, endDate)
        .then((data) => console.log("Fetched data:", data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [dateRange]); // Зависимость от dateRange для вызова эффекта при его изменении
}
