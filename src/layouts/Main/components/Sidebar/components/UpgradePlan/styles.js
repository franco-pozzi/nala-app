import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.grey,
  },
  media: {
    paddingTop: theme.spacing(2),
    height: 80,
    textAlign: "center",
    "& > img": {
      height: "100%",
      width: "auto",
    },
  },
  content: {
    padding: theme.spacing(1, 2),
  },
  actions: {
    padding: theme.spacing(1, 2),
    display: "flex",
    justifyContent: "center",
  },
}));

export default useStyles;
