// "use client";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import GetAllExpenses from "../components/columns/expenses";
// import { Heading } from "@/components/ui/heading";
// import { Separator } from "@/components/ui/separator";
// import { useEffect, useState } from "react";

// export default function ExpensesTablePage() {
//   const [isClient, setIsClient] = useState(false);
//   useEffect(() => {
//     setIsClient(true);
//   }, []);
//   return (
//     <div className="flex-col">
//       <div className="flex-1 space-y-4 p-8 pt-6">
//         <div className="flex items-center justify-between">
//           <Heading
//             title="Таблицы | Расходы"
//             description="Управляйте своими таблицами"
//           />
//         </div>

//         <Separator />
//         <div className="flex items-center justify-center w-full pt-5">
//           <Tabs defaultValue="expenses" className="w-5/6">
//             <TabsContent value="expenses">
//               <div className="">
//                 <GetAllExpenses />
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import GetAllExpenses from "../components/columns/expenses";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Table } from "lucide-react";

export default function ExpensesTablePage() {
  return (
    <>
      <div>
        <Card className="h-[50rem]">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Table />
              Таблица расходов
            </CardTitle>
            <CardDescription>
              Все расходы находятся в этой таблице
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GetAllExpenses />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
