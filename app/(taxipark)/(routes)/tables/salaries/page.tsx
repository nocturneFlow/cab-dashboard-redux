import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SalariesSalariesLaborRemunerationFund,
  SalariesFOTColumns,
} from "../components/columns/salariesFOT";
import {
  SalariesSalariesPayment,
  SalariesPaymentColumns,
} from "../components/columns/salariesPayment";
import {
  SalariesCountAccurals,
  SalariesCountAccuralsColumns,
} from "../components/columns/salaryCountAccruals";
import {
  SalariesCountPaidOff,
  SalariesCountPaidOffColumns,
} from "../components/columns/salaryCountPaidOff";
import {
  SalariesCountPenalties,
  SalariesCountPenaltiesColumns,
} from "../components/columns/salaryCountPenalties";
import { SalariesDataTable } from "@/components/tables/salaries/salaries";
import { TableClient } from "../components/client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

async function getDataSalariesFOT(): Promise<
  SalariesSalariesLaborRemunerationFund[]
> {
  return [
    {
      id: "laiuwdybghauhyjdbv",
      SalariesSalariesLaborRemunerationFundDriver: "Абай Магжан",
      SalariesSalariesLaborRemunerationFundTotal: "50 000",
      SalariesSalariesLaborRemunerationFundWages: "42 000",
      SalariesSalariesLaborRemunerationFundBonus: "8 000",
      SalariesSalariesLaborRemunerationFundBonusFromCompany: "0",
    },
    {
      id: "laiuwdybghauhyjdbv12",
      SalariesSalariesLaborRemunerationFundDriver: "Абдиалимов Нурлыбек",
      SalariesSalariesLaborRemunerationFundTotal: "154 000",
      SalariesSalariesLaborRemunerationFundWages: "105 000",
      SalariesSalariesLaborRemunerationFundBonus: "49 000",
      SalariesSalariesLaborRemunerationFundBonusFromCompany: "0",
    },
  ];
}

async function getDataSalariesPayment(): Promise<SalariesSalariesPayment[]> {
  return [
    {
      id: "laiuwdybghauhyjdbvadw13r4325",
      SalariesSalariesPaymentDriver: "Абай Магжан",
      SalariesSalariesPaymentUpfront: "16 328",
      SalariesSalariesPaymentSalary: "121 172",
      SalariesSalariesPaymentDeposit: "5 000",
      SalariesSalariesPaymentPenalty: "0",
    },
    {
      id: "laiuwdybghauhyjdbvadw13r432512",
      SalariesSalariesPaymentDriver: "Абай Магжан",
      SalariesSalariesPaymentUpfront: "1 100",
      SalariesSalariesPaymentSalary: "43 900",
      SalariesSalariesPaymentDeposit: "0",
      SalariesSalariesPaymentPenalty: "0",
    },
  ];
}

async function getDataSalariesCountAccurals(): Promise<
  SalariesCountAccurals[]
> {
  return [
    {
      id: "adad1",
      SalariesCountAccuralsTravelDate: "01.01.2024",
      SalariesCountAccuralsCarNumber: "578АСY11",
      SalariesCountAccuralsSchedule: "День",
      SalariesCountAccuralsTime: "10",
      SalariesCountAccuralsCash: "28 400",
      SalariesCountAccuralsTotal: "33 420",
      SalariesCountAccuralsSummarized: "9 000",
      SalariesCountAccuralsSalary: "6 000",
      SalariesCountAccuralsBonus: "3 000",
      SalariesCountAccuralsBonusFromCompany: "",
      SalariesCountAccuralsUpFront: "",
      SalariesCountAccuralsManager: "Лаура",
    },
    {
      id: "adad2",
      SalariesCountAccuralsTravelDate: "02.01.2024",
      SalariesCountAccuralsCarNumber: "578АСY11",
      SalariesCountAccuralsSchedule: "День",
      SalariesCountAccuralsTime: "10",
      SalariesCountAccuralsCash: "16 390",
      SalariesCountAccuralsTotal: "30 650",
      SalariesCountAccuralsSummarized: "8 000",
      SalariesCountAccuralsSalary: "6 000",
      SalariesCountAccuralsBonus: "2 000",
      SalariesCountAccuralsBonusFromCompany: "",
      SalariesCountAccuralsUpFront: "",
      SalariesCountAccuralsManager: "Лаура",
    },
  ];
}

async function getDataSalariesCountPaidOff(): Promise<SalariesCountPaidOff[]> {
  return [
    {
      id: "adaw311",
      SalariesCountPaidOffRecDate: "15.01.2024",
      SalariesCountPaidOffAmount: "10 000",
      SalariesCountPaidOffPaymentType: "Депозит",
      SalariesCountPaidOffManager: "Дархан",
      SalariesCountPaidOffTypeOfCashier: "Kaspi",
    },
    {
      id: "adaw312",
      SalariesCountPaidOffRecDate: "15.01.2024",
      SalariesCountPaidOffAmount: "265 620",
      SalariesCountPaidOffPaymentType: "ЗП",
      SalariesCountPaidOffManager: "Дархан",
      SalariesCountPaidOffTypeOfCashier: "Kaspi",
    },
  ];
}

async function getDataSalariesCountPenalties(): Promise<
  SalariesCountPenalties[]
> {
  return [
    {
      id: "pen311",
      SalariesCountPenaltiesRecDate: "30.01.2024",
      SalariesCountPenaltiesDocumentDate: "24.01.2024",
      SalariesCountPenaltiesCarNumber: "578АСY11",
      SalariesCountPenaltiesShiftWork: "День",
      SalariesCountPenaltiesDocumentNumber: "31437",
      SalariesCountPenaltiesAmount: "9 230",
      SalariesCountPenaltiesLink: "LINK(превышение скоростного режима)",
    },
    {
      id: "pen312",
      SalariesCountPenaltiesRecDate: "22.02.2024",
      SalariesCountPenaltiesDocumentDate: "19.02.2024",
      SalariesCountPenaltiesCarNumber: "408АВЕ11",
      SalariesCountPenaltiesShiftWork: "День",
      SalariesCountPenaltiesDocumentNumber: "89227",
      SalariesCountPenaltiesAmount: "9 230",
      SalariesCountPenaltiesLink: "LINK(превышение скоростного режима)",
    },
  ];
}

export default async function DriversPage() {
  const dataSalariesFOT = await getDataSalariesFOT();
  const dataSalariesPayment = await getDataSalariesPayment();
  const dataSalariesCountPaidOff = await getDataSalariesCountPaidOff();
  const dataDataSalariesCountAccurals = await getDataSalariesCountAccurals();
  const dataSalariesCountPenalties = await getDataSalariesCountPenalties();

  // const dataSalariesFetch = await fetch("http://localhost:3000/tables/salaries");

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Таблицы | Зарплаты"
            description="Управляйте своими таблицами"
          />
        </div>
        <Separator />
        <div className="flex items-center justify-center w-full pt-5">
          <Tabs defaultValue="salaryCount" className="w-5/6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="salaryCount">ЗП | Считалка</TabsTrigger>
              <TabsTrigger value="salaryCashier">ЗП | Касса</TabsTrigger>
              <TabsTrigger value="salarySalary">Зарплата</TabsTrigger>
            </TabsList>

            <TabsContent value="salaryCount">
              <div className="pt-5">
                <Tabs className="w-5/6" defaultValue="salaryCountAccruals">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="salaryCountAccruals">
                      Начисления
                    </TabsTrigger>
                    <TabsTrigger value="salaryCountPaidOff">
                      Выплачено
                    </TabsTrigger>
                    <TabsTrigger value="salaryCountPenalties">
                      Штрафы
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="salaryCountAccruals">
                    <div className="">
                      <SalariesDataTable
                        columns={SalariesCountAccuralsColumns}
                        data={dataDataSalariesCountAccurals}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="salaryCountPaidOff">
                    <div className="">
                      <SalariesDataTable
                        columns={SalariesCountPaidOffColumns}
                        data={dataSalariesCountPaidOff}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="salaryCountPenalties">
                    <div className="">
                      <SalariesDataTable
                        columns={SalariesCountPenaltiesColumns}
                        data={dataSalariesCountPenalties}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            <TabsContent value="salaryCashier">
              <div className="pt-5">
                <Tabs className="w-5/6" defaultValue="salaryCountAccruals">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="salaryCountAccruals">
                      Начисления
                    </TabsTrigger>
                    <TabsTrigger value="salaryCountPaidOff">
                      Выплачено
                    </TabsTrigger>
                    <TabsTrigger value="salaryCountPenalties">
                      Штрафы
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="salaryCountAccruals">
                    <div className="">
                      <SalariesDataTable
                        columns={SalariesFOTColumns}
                        data={dataSalariesFOT}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="salaryCountPaidOff">
                    <div className="">
                      <SalariesDataTable
                        columns={SalariesPaymentColumns}
                        data={dataSalariesPayment}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="salaryCountPenalties">
                    <div className="">
                      <SalariesDataTable
                        columns={SalariesPaymentColumns}
                        data={dataSalariesPayment}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            <TabsContent value="salarySalary">
              <div className="pt-5">
                <Tabs className="w-5/6" defaultValue="salaryCountAccruals">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="salaryCountAccruals">
                      Начисления
                    </TabsTrigger>
                    <TabsTrigger value="salaryCountPaidOff">
                      Выплачено
                    </TabsTrigger>
                    <TabsTrigger value="salaryCountPenalties">
                      Штрафы
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="salaryCountAccruals">
                    <div className="">
                      <SalariesDataTable
                        columns={SalariesFOTColumns}
                        data={dataSalariesFOT}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="salaryCountPaidOff">
                    <div className="">
                      <SalariesDataTable
                        columns={SalariesPaymentColumns}
                        data={dataSalariesPayment}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="salaryCountPenalties">
                    <div className="">
                      <SalariesDataTable
                        columns={SalariesPaymentColumns}
                        data={dataSalariesPayment}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </div>{" "}
      </div>
    </div>
  );
}
