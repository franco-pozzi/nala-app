import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiDialog-paper": {
      padding: "15px",
    },
  },
  buttonActionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "25px",
  },
  buttonActions: {
    marginLeft: "15px",
  },
}));

export default useStyles;
