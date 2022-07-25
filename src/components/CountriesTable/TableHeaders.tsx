import React from "react";
// material-ui
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
// types
import { CountriesDataKeys, TableHeadersProps } from "../../types";
// fixtures
import { headerCells } from "../../fixtures";

const TableHeaders = ({ order, orderBy, onRequestSort }: TableHeadersProps) => {
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
            sx={{ fontSize: 18, fontWeight: "bold", width: 220 }}
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaders;
