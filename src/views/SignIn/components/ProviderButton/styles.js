import makeStyles from "@material-ui/core/styles/makeStyles";
import { SIGN_IN_COLORS } from "theme/palette";

const useStyles = makeStyles(() => ({
  buttonContainer: {
    borderColor: SIGN_IN_COLORS.blue,
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    paddingTop: "3px",
    paddingBottom: "3px",
  },
  gridIcon: {
    padding: "5px 10px 0px",
  },
  gridText: {
    paddingLeft: 15,
  },
}));

export default useStyles;
