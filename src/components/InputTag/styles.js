import styled from "styled-components";
import Autocomplete from "@material-ui/lab/Autocomplete";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Chip from "@material-ui/core/Chip";
import palette, { TABLE } from "theme/palette";

export const CustomAutocomplete = styled(Autocomplete)`
  margin-top: 10px;
`;

export const useStyles = makeStyles((theme) => ({
  checkbox: {
    marginRight: 8,
    "& .MuiIconButton-label": {
      color: theme.palette.text.link,
    },
  },
  addNew: {
    background: TABLE.ODD,
    color: theme.palette.black,
    fontSize: 12,
    "&:hover": {
      cursor: "pointer",
    },
    padding: "10px",
  },
  empty: {
    background: TABLE.ODD,
    color: theme.palette.black,
    fontSize: 12,
    padding: "10px",
  },
}));

export const StyledChip = styled(Chip)`
  &.MuiChip-root {
    height: 24px;
    background-color: ${(props) => (palette.background[props.isActive ? "iconTags" : "inputTags"])};
  }
  .MuiChip-label{
    color: ${(props) => (props.isActive ? palette.white : palette.text.subtitle) };
  }
  .MuiChip-deleteIcon {
    color: ${(props) => (props.isActive ? palette.white : palette.background.iconTags) };
    width: 16px;
    height: 16px;
  }
  &:hover {
    background-color: ${(props) => (palette.background[props.isClickable ? "iconTags" : "inputTags"])};
    cursor: ${(props) => (props.isClickable ? "pointer" : "alias") };
    .MuiChip-label, .MuiChip-deleteIcon {
      color: ${(props) => props.isClickable && palette.white };
    }
  }
`;
