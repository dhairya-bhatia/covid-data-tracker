import { makeStyles } from "@mui/styles";

export default makeStyles((theme: { spacing: (arg0: number) => any }) => ({
  root: {
    padding: theme.spacing(4)
  },
  loaderContainer: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center"
  },
  filter: {
    minWidth: theme.spacing(25)
  }
}));
