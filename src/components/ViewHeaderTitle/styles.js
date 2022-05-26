import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  titleText: {
    marginTop: "15px",
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "28px",
    color: theme.palette.black,
  },
  subtitle: {
    marginBottom: "15px",
  },
  btnRight: {
    textAlign: "right",
  },
}));
