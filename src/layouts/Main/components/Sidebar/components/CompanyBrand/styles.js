import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styled from "styled-components";
import palette from "theme/palette";

export const StyledCompanyBrand = styled(Box)`
  padding: 10px;
  margin-top: 10px;
  text-align: center;
  img {
    max-width: 138px;
    max-height: 68px;
  }
  @media (max-width: 1279px) {
    padding: 0px;
    margin: 10px 0;
  }
`;

export const StyledFormControl = styled(FormControl)`
  margin-bottom: 8px;
`;

export const StyledSelect = styled(Select)`
  height: 36px;
  margin: 20px 0px;
  line-height: inherit !important;
  &:before, &:after{
    border-color: inherit!important;
    border-bottom: inherit!important;
  }
  .MuiSelect-selectMenu{
    display: flex;
    align-items: center;
  }
  p {
    font-weight: bold;
    font-size: 24px;
    white-space: initial;
  }
  .MuiSvgIcon-root{
    width: 35px;
    height: 35px;
    margin-right: -10px;
    margin-top: -5px;
    color: ${palette.text.link};
  }
  .MuiListItem-root.Mui-selected, .MuiSelect-select:focus{
    background-color: transparent;
  }
  @media (max-width: 1279px) {
    margin 10px 0;
  }
`;

export const StyledTypography = styled(Typography)`
  padding: 5px 12px 10px;
`;

export const StyledBrand = styled.img`
  max-height: 45px;
  min-height: 20px;
`;
