import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

export const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    width: "100%",
  },
  select: {
    height: "37px",
    "label + &": {
      marginTop: theme.spacing(1),
    },
  },
}));

export const InputLabelStyled = withStyles((theme) => ({
  asterisk: {
    display: "none",
  },
}))(InputLabel);
