import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import palette from "theme/palette";

// migrate this when Input tag component will refactorized
export const useStyles = makeStyles((theme) => ({
  filter: {
    background: theme.palette.white,
    width: "calc(100% - 15px)",
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
}));

export const FilterIconContainer = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  svg{
    margin-right: 5px;
  }
`;

export const StyledFilterButton = styled(Button)`
  width: calc(100% - 15px);
  text-transform: capitalize;
  margin-top: 8px;
  background-color: ${ (props) => (props.showFilters ? palette.background.filterButton : "transparent")};
  &:hover{
    background: ${palette.background.filterButton};
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;
