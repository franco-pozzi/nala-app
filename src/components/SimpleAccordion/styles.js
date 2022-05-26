import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  customStyleNoDataMessage: {
    padding: 0,
    paddingBottom: "40px",
    "& div": {
      padding: 0,
    },
  },
  image: {
    marginRight: "18px",
    width: "43px",
    height: "43px",
  },
  detailsRoot: {
    flexDirection: "column",
    padding: "20px",
    paddingTop: "0px",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
}));

export default useStyles;
