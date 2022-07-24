import { makeStyles } from "@mui/styles";

export default makeStyles((theme: { spacing: (arg0: number) => any }) => ({
  root: {
    padding: theme.spacing(4)
  },
  filter: {
    minWidth: theme.spacing(25)
  }
}));
