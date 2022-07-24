import { headers } from "../types";

export const headerCells: headers[] = [
  {
    id: "country",
    numeric: false,
    disablePadding: false,
    label: "Country Name"
  },
  {
    id: "newConfirmed",
    numeric: true,
    disablePadding: false,
    label: "New Confirmed"
  },
  {
    id: "totalConfirmed",
    numeric: true,
    disablePadding: false,
    label: "Total Confirmed"
  },
  {
    id: "newDeaths",
    numeric: true,
    disablePadding: false,
    label: "New Deaths"
  },
  {
    id: "totalDeaths",
    numeric: true,
    disablePadding: false,
    label: "Total Deaths"
  },
  {
    id: "newRecovered",
    numeric: true,
    disablePadding: false,
    label: "New Recovered"
  },
  {
    id: "totalRecovered",
    numeric: true,
    disablePadding: false,
    label: "Total Recovered"
  }
];
