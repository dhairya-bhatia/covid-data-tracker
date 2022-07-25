export interface headers {
  id: keyof CountriesDataKeys;
  label: string;
}

export interface TableDataProps {
  rows: FormattedCountriesData[];
  filterValue: string;
}

export interface CountriesData {
  ID: string;
  Country: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

export interface FormattedCountriesData {
  id: string;
  country: string;
  newConfirmed: number;
  totalConfirmed: number;
  newDeaths: number;
  totalDeaths: number;
  newRecovered: number;
  totalRecovered: number;
}

export interface CountriesDataKeys {
  country: string;
  newConfirmed: number;
  totalConfirmed: number;
  newDeaths: number;
  totalDeaths: number;
  newRecovered: number;
  totalRecovered: number;
}

export interface GlobalData {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

export type Order = "asc" | "desc";

export interface TableHeadersProps {
  order: Order;
  orderBy: string;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof CountriesDataKeys
  ) => void;
}
export interface Filter {
  filterName: keyof CountriesDataKeys;
  value: string;
}
export type getRowsFun = () => FormattedCountriesData[];

