import React from "react";
// material-ui
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
// types
import { CountriesDataKeys, TableHeadersProps } from "../../types";
// fixtures
import { headerCells } from "../../fixtures";
// utils
import { visuallyHidden } from "@mui/utils";
// styles
import useStyles from "./styles";

const TableHeaders = ({ order, orderBy, onRequestSort }: TableHeadersProps) => {
  const classes = useStyles();
  /* helper functions */
  const createSortHandler =
    (property: keyof CountriesDataKeys) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headerCells.map((headCell) => (
          <TableCell
            className={classes.heading}
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              role="button"
            >
              {headCell.label}
            </TableSortLabel>
            {/* for accessibility purpose */}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaders;
