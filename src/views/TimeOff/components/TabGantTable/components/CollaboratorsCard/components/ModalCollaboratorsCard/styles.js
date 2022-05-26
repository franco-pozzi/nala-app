import styled from "styled-components";
import Modal from "components/Modal";
import makeStyles from "@material-ui/core/styles/makeStyles";

export const StyledModal = styled(Modal)`
  width: 650px;
  max-width: 600px;
  width: 90vw;
`;

export const useStyles = makeStyles(() => ({
  mobileModal: {
    width: "90vw",
  },
}));
