import _ from "lodash";

export const formatTableData = (tableData) => {
  let paymentStatusObj = {
    P: "Pending",
    A: "Approved",
    C: "Cancelled",
  };

  tableData.map((data, idx) => {
    data["paymentStatusLabel"] = paymentStatusObj[data.paymentStatus];
    data["_id"] = idx;
    return data;
  });

  return tableData;
};

export const createKey = (item, column) => {
  return item._id + (column.path || column.key);
};

export const renderCell = (item, column) => {
  if (column.content) return column.content(item);

  return _.get(item, column.path);
};
