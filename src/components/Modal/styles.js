import makeStyles from "@material-ui/core/styles/makeStyles";
import Modal from "@material-ui/core/Modal";
import { default as AvatarMUI } from "@material-ui/core/Avatar";
import styled from "styled-components";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    minWidth: 320,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    fontFamily: "Roboto",
    fontSize: 14,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "@media (max-width: 943px)": {
      maxHeight: 515,
      overflowY: "scroll",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  titleContainer: {
    justifyContent: "space-between",
  },
  content: {
    marginTop: "10px",
  },
  titleStyle: {
    color: theme.palette.title?.subtitleColor,
    fontSize: "18px",
  },
  buttonActionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "25px",
  },
  buttonActions: {
    marginLeft: "15px",
  },
}));

export function modalStyle() {
  const top = 50 + Math.round(Math.random() * 20) - 10;
  const left = 50 + Math.round(Math.random() * 20) - 10;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export const ModalView = styled(Modal)`
  border-radius: 5px;
`;

export const Avatar = styled(AvatarMUI)`
  margin-top: 10px;
  width: 30px;
  height: 30px;
`;
