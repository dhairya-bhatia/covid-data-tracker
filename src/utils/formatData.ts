import { CountriesData, GlobalData } from "../types";

export const formatGlobalData = (data: GlobalData) => {
  return {
    NewConfirmed: data.NewConfirmed,
    TotalConfirmed: data.TotalConfirmed,
    NewDeaths: data.NewDeaths,
    TotalDeaths: data.TotalDeaths,
    NewRecovered: data.NewRecovered,
    TotalRecovered: data.TotalRecovered
  };
};

export const formatCountryData = (data: CountriesData[]) => {
  return data.map((countryData) => ({
    id: countryData.ID,
    country: countryData.Country,
    newConfirmed: countryData.NewConfirmed,
    totalConfirmed: countryData.TotalConfirmed,
    newDeaths: countryData.NewDeaths,
    totalDeaths: countryData.TotalDeaths,
    newRecovered: countryData.NewRecovered,
    totalRecovered: countryData.TotalRecovered
  }));
};
