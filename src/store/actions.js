//define the action creators

export const loadPayments = (payload) => ({
  type: "FETCH_PAYMENTS",
  payload,
});

export const loadMorePayments = (payload) => ({
  type: "FETCH_MORE_PAYMENTS",
  payload,
});

export const filterByPaymentStatus = (payload) => ({
  type: "FILTER_BY_PAYMENT_STATUS",
  payload,
});

export const removePaymentFilter = () => ({
  type: "REMOVE_PAYMENT_FILTER",
});
