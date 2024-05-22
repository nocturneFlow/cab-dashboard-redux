// // src/redux/reducers.js
// import {
//   SET_MANAGERS,
//   SET_CARS,
//   SET_DRIVERS,
//   SET_SCHEDULES,
//   SET_EXPENSE_ITEM_APLS,
//   SET_LOADING,
// } from "./actions";

// const initialState = {
//   managers: [],
//   cars: [],
//   drivers: [],
//   schedules: [],
//   expenseItemApls: [],
//   loading: true,
// };

// const reducer = (state = initialState, action: { type: any; payload: any }) => {
//   switch (action.type) {
//     case SET_MANAGERS:
//       return { ...state, managers: action.payload };
//     case SET_CARS:
//       return { ...state, cars: action.payload };
//     case SET_DRIVERS:
//       return { ...state, drivers: action.payload };
//     case SET_SCHEDULES:
//       return { ...state, schedules: action.payload };
//     case SET_EXPENSE_ITEM_APLS:
//       return { ...state, expenseItemApls: action.payload };
//     case SET_LOADING:
//       return { ...state, loading: action.payload };
//     default:
//       return state;
//   }
// };

// export default reducer;
