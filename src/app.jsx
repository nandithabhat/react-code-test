import React, { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./app.scss";
import { getPayments } from "./services/api";
import { connect } from "react-redux";
import {
  loadPayments,
  loadMorePayments,
  filterByPaymentStatus,
  removePaymentFilter,
} from "./store/actions";
import { PAYMENT_STATUS } from "./utils/constants";
import Table from "./components/Table";
import { formatTableData } from "./utils/helper";
const columns = [
  {
    path: "fromAccount.accountNumber",
    label: "From Acc.",
  },
  { path: "toAccaunt.accountNumber", label: "To Acc." },
  { path: "paymentAmount", label: "Amount" },
  { path: "paymentDate", label: "Date" },
  { path: "paymentStatusLabel", label: "Status" },
];
const App = ({
  appState,
  loadMoreData,
  loadData,
  filterData,
  removeFilter,
}) => {
  useEffect(() => {
    fetchPayments();
  }, []);

  const {
    payments = [],
    filteredPayments = [],
    hasMoreElements = false,
    filterApplied = false,
    nextPageIndex = "",
  } = appState;

  const fetchPayments = async () => {
    const response = await getPayments();
    loadData(response.data);
  };

  const handleLoadMore = async () => {
    if (hasMoreElements) {
      const response = await getPayments(nextPageIndex);
      loadMoreData(response.data);
    }
  };
  const handleFilter = async () => {
    if (!filterApplied) {
      filterData(PAYMENT_STATUS.PENDING_APPROVAL);
    } else {
      removeFilter();
    }
  };

  return (
    <>
      <input
        className="ml-1 my-2"
        type={"checkbox"}
        onChange={handleFilter}
        value={filterApplied}
        id="filter"
      />
      <label className="ml-1" htmlFor="filter">
        Filter Pending Approval
      </label>
      <Table
        data={formatTableData(
          filterApplied ? filteredPayments : payments
        )}
        columns={columns}
      />
      <button className="btn btn-primary" onClick={handleLoadMore}>
        Load More Payments
      </button>
    </>
  );
};

const mapStateToProps = (state) => ({
  appState: state,
});

const mapDispatchToProps = (dispatch) => ({
  loadMoreData: (pageIndex) => dispatch(loadMorePayments(pageIndex)),
  loadData: (response) => dispatch(loadPayments(response)),
  filterData: (paymentStatus) => dispatch(filterByPaymentStatus(paymentStatus)),
  removeFilter: () => dispatch(removePaymentFilter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
