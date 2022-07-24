import { ChangeEvent, useCallback, useEffect, useState } from "react";
// material-ui
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import RefreshIcon from "@mui/icons-material/Refresh";
// components
import DataCard from "../../components/DataCard";
import CountriesTable from "../../components/CountriesTable";
// utils
import splitStrings from "../../utils/splitStrings";
// types
import {
  CountriesDataKeys,
  Filter,
  FormattedCountriesData,
  GlobalData
} from "../../types";
// utils
import { formatCountryData, formatGlobalData } from "../../utils/formatData";
// styles
import useStyles from "./styles";
import { headerCells } from "../../fixtures";

const Home = () => {
  /* classes */
  const classes = useStyles();

  /* states */
  const [countriesData, setCountriesData] = useState<FormattedCountriesData[]>(
    []
  );
  const [globalData, setGlobalData] = useState<GlobalData>();
  const [filteredData, setFilteredData] = useState<FormattedCountriesData[]>(
    []
  );
  const [filter, setFilter] = useState<Filter>({
    filterName: "country",
    value: ""
  });
  const [loading, setLoading] = useState<boolean>(false);

  /* helper functions */
  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter({
      ...filter,
      filterName: event.target.value as keyof CountriesDataKeys
    });
  };

  const handleFilterData = useCallback(
    (inputValue: string) => {
      setFilter({ ...filter, value: inputValue });
      const filteredRecords = countriesData.filter((dataObj) => {
        if (
          dataObj[filter.filterName]
            .toString()
            .toLowerCase()
            .includes(inputValue)
        ) {
          return dataObj;
        } else {
          return false;
        }
      });
      setFilteredData(filteredRecords);
    },
    [countriesData, filter]
  );

  const fetchCovidData = useCallback(() => {
    setLoading(true);
    fetch("https://api.covid19api.com/summary")
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setGlobalData(formatGlobalData(result.Global));
        setCountriesData(formatCountryData(result.Countries));
        setFilteredData(formatCountryData(result.Countries));
        setFilter({ filterName: filter.filterName, value: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter.filterName]);

  /* Use Effects */
  useEffect(() => {
    fetchCovidData();
  }, []);

  // for filtering the data if user changes the filter while input value is not empty
  useEffect(() => {
    if (filter.value) {
      handleFilterData(filter.value);
    }
  }, [filter.value, handleFilterData]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  }
  return (
    <Box className={classes.root}>
      <Grid container spacing={8} direction="column">
        <Grid container item spacing={2}>
          {/* Global Covid Cases */}
          {Object.entries(globalData || {}).map(([key, val]) => {
            return (
              <DataCard
                title={splitStrings(key) as string}
                value={val.toLocaleString()} // for adding commas
                key={key}
              />
            );
          })}
        </Grid>
        <Grid
          container
          item
          xs={12}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  label="Add Filter"
                  variant="outlined"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleFilterData(event.target.value)
                  }
                />
              </Grid>
              <Grid item>
                <Select
                  value={filter.filterName}
                  onChange={handleFilterChange}
                  className={classes.filter}
                >
                  {headerCells.map((item) => (
                    <MenuItem value={item.id} key={`${item.id}`}>
                      {splitStrings(item.id, true)}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              aria-label="refresh"
              startIcon={<RefreshIcon />}
              variant="contained"
              color="primary"
              onClick={fetchCovidData}
            >
              Refresh Data
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <CountriesTable rows={filteredData} />
        </Grid>
      </Grid>
    </Box>
  );
};;;;

export default Home;
