import withStyles from "@material-ui/core/styles/withStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import HelpIcon from "@material-ui/icons/Help";
import Tooltip from "@material-ui/core/Tooltip";

export const HelpIconStyled = withStyles((theme) => ({
  root: {
    color: theme.palette.text.darkBlue,
    fontSize: theme.spacing(1.8),
    marginLeft: theme.spacing(0.5),
    cursor: "pointer",
  },
}))(HelpIcon);

export const TooltipStyled = withStyles((theme) => ({
  popper: {
    zIndex: 9999,
  },
  tooltipArrow: {
    background: theme.palette.background.lightBlack,
    fontSize: theme.spacing(1.5),
  },
  arrow: {
    color: theme.palette.background.lightBlack,
  },
}))(Tooltip);

export const useStyles = makeStyles((theme) => ({
  emptySpan: {
    color: theme.palette.text.transparent,
  },
}));
