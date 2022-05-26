import styled from "styled-components"
import FormControl from "@material-ui/core/FormControl";

export const FormControlStyled = styled(FormControl)`
  &.MuiFormControl-root {
    margin-top: 8px;

    .MuiFormControl-marginDense{
      margin-top: 0;
    }
  }
`;
