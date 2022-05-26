import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

export const StyledSubmitGrid = styled(Grid)`
  justify-content: flex-end;
  margin-top: 20px;
`;

export const StyledFileGrid = styled(Grid)`
  padding-right: ${(props) => (props.isMobile ? "3px" : "25vw !important")};
`;

export const StyledItem = styled.div`
  margin-top: 10px;
`;

const useStyles = makeStyles(() => ({
  dateInputs: {
    width: "50%",
  },
}));

export default useStyles;
