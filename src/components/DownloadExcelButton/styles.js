import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "5px",
  },
  buttonContainer: {
    flex: "1",
    textAlign: "right",
  },
  downloadButton: {
    color: theme.palette.text.link,
    borderColor: theme.palette.text.link,
    "&.MuiButton-outlinedSizeSmall": {
      padding: theme.spacing(0, 1),
    },
  },
  "@media (max-width: 600px)": {
    downloadButton: {
      "&.MuiButton-outlinedSizeSmall": {
        width: "100%",
      },
    },
  },
}));

export default useStyles;
