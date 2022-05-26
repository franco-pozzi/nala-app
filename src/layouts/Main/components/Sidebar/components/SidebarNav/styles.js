import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    paddingTop: 5,
    paddingBottom: 5,
  },
  button: {
    color: theme.palette.text.darkBlue,
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
    "&:hover": {
      borderLeft: theme.palette.border.sidebar,
      backgroundColor: theme.palette.background.lightGrey,
      borderRadius: "inherit",
      "& $icon": {
        color: theme.palette.text.link,
      },
    },
  },
  icon: {
    color: theme.palette.text.darkBlue,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  active: {
    backgroundColor: theme.palette.background.lightGrey,
    borderLeft: theme.palette.border.sidebar,
    borderRadius: "inherit",
    "& $icon": {
      color: theme.palette.text.link,
    },
  },
  divider: {
    margin: theme.spacing(1, 1.5),
    color: theme.palette.divider,
    border: theme.palette.border.divider,
  },
  accordion: {
    borderRadius: 0,
    boxShadow: "none",
  },
  accordionHeader: {
    padding: "0 10px",
  },
  accordionTitleMain: {
    fontSize: 14,
    color: theme.palette.text.secondaryTitle,
    textTransform: "uppercase",
  },
  accordionTitle: {
    fontSize: 14,
    color: theme.palette.text.darkBlue,
  },
  accordionContainer: {
    padding: 0,
  }
}));

export default useStyles;
