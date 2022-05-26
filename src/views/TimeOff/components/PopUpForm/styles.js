import styled from "styled-components";
import Modal from "components/Modal";
import Button from "components/Button";

export const StyledModal = styled(Modal)`
  width: auto;
  max-width: 600px;
`;

export const StyledButton = styled(Button)`
  border-radius : ${(props) => (props.isMobile ? "4px 4px 0 0" : "4px")}
`;
