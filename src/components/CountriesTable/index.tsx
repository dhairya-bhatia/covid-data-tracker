import React, { useEffect, useState } from "react";
// material-ui
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
// types
import {
  CountriesDataKeys,
  getRowsFun,
  Order,
  TableDataProps
} from "../../types";
// nested components
import TableHeaders from "./TableHeaders";
// fixtures
import { headerCells } from "../../fixtures";
// styles
import useStyles from "./styles";

const CountriesTable = ({ rows, filterValue }: TableDataProps) => {
  const classes = useStyles();
  /* states */
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof CountriesDataKeys>("country");
  const [isSortWithFilter, setSortWithFilter] = useState<boolean>(false); // if user wants to sort after filter is applied

  /* helper functions */
  // sorts column on click of sort button
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof CountriesDataKeys
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc"); // change sort order
    setOrderBy(property);
    setSortWithFilter(true);
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

  // sorts rows if filter is not applied or user wants to sort explicitly
  const getSortedRows: getRowsFun = () => {
    if (filterValue && !isSortWithFilter) {
      return rows;
    }
    return rows.sort(getComparator(order, orderBy));
  };

  useEffect(() => {
    setSortWithFilter(false);
  }, [filterValue]);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.tableContainer}>
        <Table aria-label="covidTable" stickyHeader>
          <TableHeaders
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {getSortedRows().map((row) => {
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
