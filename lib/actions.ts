// Define the action type enum
export enum ActionType {
  SET_MANAGERS = "SET_MANAGERS",
  SET_CARS = "SET_CARS",
  SET_DRIVERS = "SET_DRIVERS",
  SET_SCHEDULES = "SET_SCHEDULES",
  SET_EXPENSE_ITEM_APLS = "SET_EXPENSE_ITEM_APLS",
  SET_LOADING = "SET_LOADING",
}

// Define interfaces for each action
interface SetManagersAction {
  type: ActionType.SET_MANAGERS;
  payload: string;
}

interface SetCarsAction {
  type: ActionType.SET_CARS;
  payload: string;
}

interface SetDriversAction {
  type: ActionType.SET_DRIVERS;
  payload: string;
}

interface SetSchedulesAction {
  type: ActionType.SET_SCHEDULES;
  payload: string;
}

interface SetExpenseItemAplsAction {
  type: ActionType.SET_EXPENSE_ITEM_APLS;
  payload: any;
}

interface SetLoadingAction {
  type: ActionType.SET_LOADING;
  payload: any;
}

// Union type for all actions
export type Action =
  | SetManagersAction
  | SetCarsAction
  | SetDriversAction
  | SetSchedulesAction
  | SetExpenseItemAplsAction
  | SetLoadingAction;

// Action creators
export const setManagers = (managers: string): SetManagersAction => ({
  type: ActionType.SET_MANAGERS,
  payload: managers,
});

export const setCars = (cars: string): SetCarsAction => ({
  type: ActionType.SET_CARS,
  payload: cars,
});

export const setDrivers = (drivers: string): SetDriversAction => ({
  type: ActionType.SET_DRIVERS,
  payload: drivers,
});

export const setSchedules = (schedules: string): SetSchedulesAction => ({
  type: ActionType.SET_SCHEDULES,
  payload: schedules,
});

export const setExpenseItemApls = (
  expenseItemApls: any
): SetExpenseItemAplsAction => ({
  type: ActionType.SET_EXPENSE_ITEM_APLS,
  payload: expenseItemApls,
});

export const setLoading = (loading: any): SetLoadingAction => ({
  type: ActionType.SET_LOADING,
  payload: loading,
});
