import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    }
  }
}));
