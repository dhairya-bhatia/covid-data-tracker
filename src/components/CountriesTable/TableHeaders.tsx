import React from "react";
// material-ui
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
// types
import { CountriesDataKeys, TableHeadersProps } from "../../types";
// fixtures
import { headerCells } from "../../fixtures";

const TableHeaders = ({ order, orderBy, onRequestSort }: TableHeadersProps) => {
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
            sx={{ fontSize: 18, fontWeight: "bold" }}
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaders;
