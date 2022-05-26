import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  input: {
    padding: "25px 10px",
    display: "flex",
    alignItems: "flex-end",
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  iconHover: {
    "& :hover": {
      cursor: "pointer",
    },
  },
  iconDisabled: {
    color: theme.palette.text.iconDisabled,
  },
}));

export default useStyles;
