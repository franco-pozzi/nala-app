import styled from "styled-components";
import palette from "theme/palette";

export const StyledScrollBar = styled.div`
  padding: ${ (props) => props.padding || "0px"};
  overflow: auto;
  overflow-x: clip;
  max-height: ${ (props) => props.maxHeight || "300px"};
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${palette.background.mediumGrey};
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:active {
    background-color: ${palette.scroll.thumbActive};
  }
  ::-webkit-scrollbar-thumb:hover: {
    background: ${palette.scroll.thumbHover};
    box-shadow: ${palette.scroll.boxShadow};
  }
  ::-webkit-scrollbar-track {
    border-radius: 3px;
  }
  ::-webkit-scrollbar-track:hover,::-webkit-scrollbar-track:active {}
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: ${palette.scroll.firefoxColor};
  .MuiAccordionDetails-root {
    display: block;
  }
`;
