import { ChangeEvent, useCallback, useEffect, useState } from "react";
// material-ui
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
// mui-icons
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from "@mui/icons-material/Clear";
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
import { IconButton, InputAdornment } from "@mui/material";

const Home = () => {
  /* classes */
  const classes = useStyles();

  /* states */
  const [globalData, setGlobalData] = useState<GlobalData>();
  const [countriesData, setCountriesData] = useState<FormattedCountriesData[]>(
    []
  );
  const [filteredData, setFilteredData] = useState<FormattedCountriesData[]>(
    []
  );
  const [filter, setFilter] = useState<Filter>({
    filterName: "country",
    value: ""
  });
  const [loading, setLoading] = useState<boolean>(false);

  /* helper functions */

  // filters table data according to the applied Filter
  const handleFilterRecords = useCallback(() => {
    const filteredRecords = countriesData
      .filter((dataObj) => {
        if (
          dataObj[filter.filterName]
            .toString()
            .toLowerCase()
            .includes(filter.value)
        ) {
          return dataObj;
        } else {
          return false;
        }
      })
      .sort(
        (a, b) =>
          a[filter.filterName].toString().toLowerCase().indexOf(filter.value) -
          b[filter.filterName].toString().toLowerCase().indexOf(filter.value)
      );
    setFilteredData(filteredRecords);
  }, [countriesData, filter.filterName, filter.value]);

  const handleFilterChange = (filter: Filter) => {
    setFilter(filter);
  };

  const fetchCovidData = () => {
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
  };

  /* Use Effects */
  useEffect(() => {
    fetchCovidData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // this will run everytime the filter is updated
  useEffect(() => {
    if (countriesData.length) {
      handleFilterRecords();
    }
  }, [countriesData, filter.filterName, filter.value, handleFilterRecords]);

  // UI loading state
  if (loading) {
    return (
      <Box className={classes.loaderContainer}>
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
                  value={filter.value}
                  label="Add Filter"
                  variant="outlined"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleFilterChange({
                      ...filter,
                      value: event.target.value
                    })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="clearFilterButton"
                          onClick={() =>
                            handleFilterChange({ ...filter, value: "" })
                          }
                          edge="end"
                          role="button"
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  role="searchbox"
                />
              </Grid>
              <Grid item>
                <Select
                  value={filter.filterName}
                  onChange={(event) =>
                    handleFilterChange({
                      ...filter,
                      filterName: event.target.value as keyof CountriesDataKeys
                    })
                  }
                  className={classes.filter}
                  role="menu"
                >
                  {headerCells.map((item) => (
                    <MenuItem
                      value={item.id}
                      key={`${item.id}`}
                      role="menuitem"
                    >
                      {splitStrings(item.id, true)}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              aria-label="refreshButton"
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
          <CountriesTable rows={filteredData} filterValue={filter.value} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
