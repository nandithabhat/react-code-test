import { PAYMENT_STATUS } from "../../utils/constants";
const initialState = {
  payments: [],
  filteredPayments: [],
  filterApplied: false,
  hasMoreElements: false,
  nextPageIndex: "",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PAYMENTS":
      console.log("FETCH_PAYMENTS called..", action.payload);
      return {
        ...state,
        payments: action.payload.results,
        hasMoreElements: action.payload.metaDatal?.hasMoreElements,
        nextPageIndex: action.payload.metaDatal?.nextPageIndex,
        filteredPayments: [],
        filterApplied: false,
      };
    case "FETCH_MORE_PAYMENTS":
      console.log("FETCH_MORE_PAYMENTS called..", action.payload);

      return {
        ...state,
        payments: [...state.payments, ...action.payload.results],
        hasMoreElements: action.payload.metaDatal?.hasMoreElements,
        nextPageIndex: action.payload.metaDatal?.nextPageIndex,
        filteredPayments: [],
        filterApplied: false,
      };

    case "FILTER_BY_PAYMENT_STATUS":
      const filteredData = [...state.payments].filter((payment) => {
        return payment.paymentStatus === PAYMENT_STATUS.PENDING_APPROVAL;
      });

      return {
        ...state,
        filterApplied: true,
        filteredPayments: filteredData,
      };
    case "REMOVE_PAYMENT_FILTER":
      return {
        ...state,
        filterApplied: false,
        filteredPayments: [],
      };
    default:
      return state;
  }
};

export default appReducer;
