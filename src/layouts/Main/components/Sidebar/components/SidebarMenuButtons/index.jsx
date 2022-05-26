import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChangePasswordModal from "../../../ChangePasswordModal";
import { SessionContext } from "modules/session/context";
import Button from "components/Button";
import { useStyles } from "./styles";

const SidebarMenuButtons = (props) => {
  const { className } = props;
  const classes = useStyles();
  const {
    actions: { signOut },
  } = useContext(SessionContext);
  const { t } = useTranslation("common");

  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const onCloseChangePasswordModal = () =>
    setChangePasswordModal(!changePasswordModal);

  return (
    <div className={clsx(classes.root, className)}>
      <Box
        display={{
          xs: "block",
          sm: "block",
          md: "none",
          lg: "none",
          xl: "none",
        }}
      >
        <Divider className={classes.divider} />
        <List>
          <ListItem className={classes.item} disableGutters>
            <Button customStyle={classes.button} onClick={signOut}>
              <ExitToAppIcon className={classes.icon} />
              {t("top-nav-bar.logout")}
            </Button>
          </ListItem>
        </List>
      </Box>

      <ChangePasswordModal
        open={changePasswordModal}
        onClose={onCloseChangePasswordModal}
      />
    </div>
  );
};

SidebarMenuButtons.propTypes = {
  className: PropTypes.string,
};

export default SidebarMenuButtons;
