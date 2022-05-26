import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
    letterSpacing: 0,
    color: theme.palette.white,
    fontWeight: 500,
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: "28px",
  },
  blueTheme: {
    color: `${theme.palette.text.link} !important`,
  },
  icon: {
    color: theme.palette.white,
  },
  select: {
    minWidth: 80,
    lineHeight: "inherit !important",
    color: theme.palette.white,
    "&:before": {
      borderColor: "inherit!important",
      borderBottom: "inherit!important",
    },
    "&:after": {
      borderColor: "inherit!important",
      borderBottom: "inherit!important",
    },
  },
}));

export default useStyles;
