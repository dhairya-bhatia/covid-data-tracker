import React, { useState } from "react";
// material-ui
import Box from "@mui/material/Box";
 import Paper from "@mui/material/Paper";
 import Table from "@mui/material/Table";
 import TableBody from "@mui/material/TableBody";
 import TableCell from "@mui/material/TableCell";
 import TableContainer from "@mui/material/TableContainer";
 import TableRow from "@mui/material/TableRow";
 // types
import { CountriesDataKeys, Order, TableDataProps } from "../../types";
// nested components
import TableHeaders from "./TableHeaders";
// fixtures
import { headerCells } from "../../fixtures";

const CountriesTable = ({ rows }: TableDataProps) => {
  /* states */
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof CountriesDataKeys>("country");

  /* helper functions */
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof CountriesDataKeys
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer sx={{ maxHeight: "72vh" }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            stickyHeader
          >
            <TableHeaders
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.sort(getComparator(order, orderBy)).map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    {headerCells.map((item) => {
                      return (
                        <TableCell
                          id={`${row.id}-${item.id}`}
                          align="center"
                          variant="body"
                          scope="row"
                          key={`${row.id}-${item.id}`}
                        >
                          {row[item.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CountriesTable;
