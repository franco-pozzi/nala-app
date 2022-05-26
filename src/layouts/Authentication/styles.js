import makeStyles from "@material-ui/core/styles/makeStyles";
import { SIGN_IN_COLORS } from "theme/palette";
import signInImage from "assets/images/sign-in/hand-rock.svg";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: "100vh",
  },
  languageGrid: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    padding: "40px",
    paddingTop: "20px",
    position: "absolute",
  },
  leftContent: {
    backgroundColor: SIGN_IN_COLORS.blue,
    backgroundImage: `url(${signInImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "42%",
    backgroundPositionX: "center",
    backgroundPositionY: "bottom",
    padding: "40px",
    paddingTop: "60px",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  title: {
    color: `${SIGN_IN_COLORS.titles} !important`,
    fontWeight: 900,
    lineHeight: "54px",
    fontSize: "45px",
    [theme.breakpoints.down("md")]: {
      fontWeight: "800",
      fontSize: "40px",
    },
  },
  subtitle: {
    color: `${SIGN_IN_COLORS.titles} !important`,
    fontWeight: 500,
    lineHeight: "28px",
    fontSize: "23px",
    marginTop: "25px",
    [theme.breakpoints.down("md")]: {
      fontWeight: "400",
      fontSize: "20px",
    },
  },
  rightContent: {
    backgroundColor: SIGN_IN_COLORS.grayBackground,
    display: "flex",
    overflowY: "scroll",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "20px",
    [theme.breakpoints.down("md")]: {
      padding: "20px",
    },
  },
  rightContentCustomStyle: {
    width: "70%",
  }
}));

export default useStyles;
