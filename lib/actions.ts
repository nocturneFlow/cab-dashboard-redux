// src/redux/actions.js
export const SET_MANAGERS = "SET_MANAGERS";
export const SET_CARS = "SET_CARS";
export const SET_DRIVERS = "SET_DRIVERS";
export const SET_SCHEDULES = "SET_SCHEDULES";
export const SET_EXPENSE_ITEM_APLS = "SET_EXPENSE_ITEM_APLS";
export const SET_LOADING = "SET_LOADING";

export const setManagers = (managers: string) => ({
  type: SET_MANAGERS,
  payload: managers,
});

export const setCars = (cars: string) => ({
  type: SET_CARS,
  payload: cars,
});

export const setDrivers = (drivers: string) => ({
  type: SET_DRIVERS,
  payload: drivers,
});

export const setSchedules = (schedules: string) => ({
  type: SET_SCHEDULES,
  payload: schedules,
});

export const setExpenseItemApls = (expenseItemApls: any) => ({
  type: SET_EXPENSE_ITEM_APLS,
  payload: expenseItemApls,
});

export const setLoading = (loading: any) => ({
  type: SET_LOADING,
  payload: loading,
});
