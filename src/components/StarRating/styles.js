import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Rating from "@material-ui/lab/Rating";

export const StyledRating = withStyles((theme) => ({
  root: {
    "& span": {
      zIndex: 0,
    },
  },
  iconFilled: {
    color: theme.palette.iconRating.default,
  },
  iconEmpty: {
    color: theme.palette.iconRating.empty,
  },
}))(Rating);

export const useStyles = makeStyles((theme) => ({
  labelCaption: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.iconRating.mediumGrey,
  },
}));

export const StyledTypography = styled(Typography)`
  display: flex;
  align-items: center;
`;
