import styled from "styled-components";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import theme from "theme/palette";

export const StyledBadge = styled(Badge)`
  margin-right: 7px;
  height: fit-content;
`;
export const StyledAvatar = styled(Avatar)`
  background-color: ${(props) => (props.src ? null : theme.table.blue)};
`;

export const StyledBold = styled.p`
  font-weight: 700;
`;

export const StyledLabels = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledAvatarCell = styled.div`
  display: flex;
`;
