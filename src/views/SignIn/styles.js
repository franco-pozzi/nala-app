import makeStyles from "@material-ui/core/styles/makeStyles";
import { SIGN_IN_COLORS } from "theme/palette";

const useStyles = makeStyles((theme) => ({
  boxContentContainer: {
    width: "50%",
  },
  signInTitle: {
    marginTop: "15px",
  },
  welcomeSubtitle: {
    lineHeight: "35px",
  },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  divider: {
    width: "40%",
    backgroundColor: SIGN_IN_COLORS.divider,
  },
  recoverPasswordLink: {
    marginTop: "15px",
    marginBottom: "25px",
    color: SIGN_IN_COLORS.blue,
  },
  inputMb20: {
    marginBottom: "20px",
  },
  alertStyle: {
    margin: "10px 0px !important",
  },
}));

export default useStyles;
