import React from "react";
import { createKey, renderCell } from "../utils/helper";

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data.map((item) => (
        <>
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={createKey(item, column)}>{renderCell(item, column)}</td>
            ))}
          </tr>
        </>
      ))}
    </tbody>
  );
};

export default TableBody;
