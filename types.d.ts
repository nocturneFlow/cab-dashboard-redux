export interface addApplication {
  application_date: string;
  time_on_line: string;
  car_id: string;
  manager_id: string;
  driver_id: string;
  addYandexDataModel: AddYandexDataModel;
  addPaymentModel: AddPaymentModel;
  addPayrollModel: AddPayrollModel;
  addExpenseAplModel: AddExpenseAplModel;
  schedule_id: string;
}

export interface AddYandexDataModel {
  cash_amount: string;
  cashless_amount: string;
  car_id: string;
  driver_id: string;
}

export interface AddPaymentModel {
  payment_date: string;
  payment_cash: string;
  payment_cashless: string;
}

export interface AddPayrollModel {
  driver_id: string;
}

export interface AddExpenseAplModel {
  gas: string;
  other: string;
  comment: string;
  advance: string;
}
