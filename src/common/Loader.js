import { Button, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const Loader = ({ height }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        height: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress className={classes.numbers} />
    </div>
  );
};

export default Loader;
