import Paper from "@material-ui/core/Paper";
import EditOutlined from "@material-ui/icons/EditOutlined";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import theme from "theme/palette";
import styled from "styled-components";

export const StyledPaper = styled(Paper)`
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  background-color: ${theme.white};
  border-radius: 4px;
  padding: 22px;
  height: 100%;
  @media (max-width: 960px) {
    box-shadow: none;
  }
`;

export const StyledIconDiv = styled.div`
  display: flex;
  column-gap: ${(props) => (props.isMobile ? "20px" : "5px")};
  margin-right: ${(props) => (props.flexEnd ? "-15px" : "0")};
  justify-content: center;
`;

export const StyledEditIcon = styled(EditOutlined)`
  color: ${theme.table.blue};
  width:  30px;
  height:  30px;
`;

export const StyledDeleteIcon = styled(DeleteOutlined)`
  color: ${theme.table.red};
  width:  30px;
  height:  30px;
`;

export const StyledNumber = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-top: 6px;
`;

export const StyledItem = styled(Box)`
  text-align: center;
  display: inline-block;
  padding-right: 24px;
  @media (max-width: 960px) {
    padding-right: 4px;
    margin: 32px 0 48px;
  }
`;

export const StyledGrid = styled(Grid)`
  &.detail-box{
    margin-top: 41px;
  }
`;
