// "use client";
// import React, { useState } from "react";
// import { fetchOilData } from "../../oil/action/fetchOilData";
// import { OilDataTable } from "@/components/tables/oil/oil-data-table-pagination";
// import { ColumnDef } from "@tanstack/react-table";

// // export interface Car {
// //   id: number;
// //   plate_number: string;
// //   model: string;
// // }

// // export interface Driver {
// //   id: number;
// //   firstName: string;
// //   lastName: string;
// // }

// // export interface Manager {
// //   id: number;
// //   firstName: string;
// //   lastName: string;
// // }

// export interface Root {
//   last_date_change: string
//   mileage: number
//   date_fact: string
//   mileage_fact: number
//   distance: number
//   comment: any
//   _links: Links
// }

// export interface Links {
//   self: Self
//   oilMaintenance: OilMaintenance
//   car: Car
// }

// export interface Self {
//   href: string
// }

// export interface OilMaintenance {
//   href: string
// }

// export interface Car {
//   href: string
// }

// export interface Oil {
//   id: number;
//   oilCarNumber: Car;
//   oilDateAfterReplacing: string;
//   oilMileage: number;
//   oilDateFact: string;
//   oilMileageFact: number;
//   oilkilometers: number;
//   oilComment: string;
// };

// export const OilColumns: ColumnDef<Oil>[] = [
//   {
//     accessorKey: "oilCarNumber",
//     header: "Номер Машины",
//   },
//   {
//     accessorKey: "oilDateAfterReplacing",
//     header: "Дата После Замены",
//   },
//   {
//     accessorKey: "oilMileage",
//     header: "Пробег",
//   },
//   {
//     accessorKey: "oilDateFact",
//     header: "Дата Фактическая",
//   },
//   {
//     accessorKey: "oilMileageFact",
//     header: "Пробег Фактический",
//   },
//   {
//     accessorKey: "oilkilometers",
//     header: "Километраж",
//   },
//   {
//     accessorKey: "oilComment",
//     header: "Комментарий",
//   },
// ];

// export default function GetAllOil() {
//   const [dataOil, setDataOil] = React.useState<Oil[]>([]);

//   React.useEffect(() => {
//     async function fetchDataOil() {
//       try {
//         const OilData = await fetchOilData(); // Получение данных из вашего API

//         // Преобразование даты в удобочитаемый формат
//         const formattedOilData = OilData.map((oil) => ({
//           ...oil,
//           oilDateAfterReplacing: new Date(oil.oilDateAfterReplacing).toLocaleDateString("ru-RU"),
//           car: {
//             id: oil.car.id,
//             plate_number: oil.car.plate_number,
//             model: oil.car.model,
//           },
//         }));

//         setDataOil(formattedOilData);
//       } catch (error) {
//         console.error("Error fetching Oil data:", error);
//       }
//     }
//     fetchDataOil();
//   }, []);

//   // const handleDelete = async (id: number) => {
//   //   try {
//   //     await deleteoil(id); // Call API to delete oil
//   //     setDataOil((prevData) =>
//   //       prevData.filter((app) => app.id !== id)
//   //     );
//   //   } catch (error) {
//   //     console.error("Error deleting oil:", error);
//   //   }
//   // };

//   return (
//     <OilDataTable
//       columns={OilColumns}
//       data={dataOil.map((oil) => ({
//         ...oil,
//         // onDelete: handleDelete,
//       }))}
//     />
//   );
// }
