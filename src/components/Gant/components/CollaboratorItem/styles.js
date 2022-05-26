import styled from "styled-components";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import theme from "theme/palette";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  height: 70px;
`;

export const StyledContent = styled.div`
  display: block;
  line-height: 20px;
  margin-left: 10px;
  white-space: normal;
  p {
    margin: 0;
    color: ${theme.text.content};
    font-size: 12px;
  }

  strong {
    color: ${theme.text.secondaryTitle};
    font-size: 14px;
  }
`;

export const StyledBadge = styled(Badge)`
  margin-right: 7px;
  height: fit-content;
`;

export const StyledCustomAvatar = styled(Avatar)`
  margin-left: 8px;
`;
