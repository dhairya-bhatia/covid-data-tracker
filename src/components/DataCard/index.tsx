import { Card, CardContent, Grid, Typography } from "@mui/material";
// styles
import useStyles from "./styles";

const DataCard = ({ title, value }: DataCardProps) => {
  /* classes */
  const classes = useStyles();
  return (
    <Grid item xs={2}>
      <Card raised className={classes.root}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h6">{value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

interface DataCardProps {
  title: string;
  value: string;
}

export default DataCard;
