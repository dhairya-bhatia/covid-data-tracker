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
// styles
import useStyles from "./styles";

const CountriesTable = ({ rows }: TableDataProps) => {
  const classes = useStyles();
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
    <Paper className={classes.root}>
      <TableContainer className={classes.tableContainer}>
        <Table aria-labelledby="Countrywise Covid cases table" stickyHeader>
          <TableHeaders
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            aria-labelledby="tableHeader"
          />
          <TableBody>
            {rows.sort(getComparator(order, orderBy)).map((row) => {
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
  );
};

export default CountriesTable;
