import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import { SessionContext } from "modules/session/context";
import { ReactComponent as TimeOff } from "assets/images/time-off/time-off.svg";

import {
  ROLES,
} from "common/constants";
import Profile from "./components/Profile";
import SidebarNav from "./components/SidebarNav";
import Brand from "./components/Brand";
import CompanyBrand from "./components/CompanyBrand";
import SidebarMenuButtons from "./components/SidebarMenuButtons";
import useStyles from "./styles";

const Sidebar = (props) => {
  const {
    open, variant, onClose, className,
  } = props;
  const {
    state: { user },
  } = useContext(SessionContext);
  const classes = useStyles();
  const { t } = useTranslation("common");

  let pages = [
    {
      title: t("common:sidebar:subMenu-time-off"),
      href: "/time-off",
      icon: <TimeOff />,
      excludeToSee: [ROLES.CANDIDATE],
    },
  ];

  return (
    <Drawer
      anchor={ window.innerWidth <= "768" ? "right" : "left" }
      classes={ { paper: classes.drawer } }
      onClose={ onClose }
      open={ open }
      variant={ variant }
    >
      <div className={ clsx(classes.root, className) }>
        <Profile onClose={ onClose } />
        <Brand onClose={ onClose } />
        <Box
          display={ {
            xs: "none",
            md: "block",
            lg: "none",
            xl: "none",
          } }
        >
          <Divider className={ classes.divider } />
        </Box>
        <CompanyBrand user={ user } />
        <SidebarNav className={ classes.nav } pages={ pages } />
        <SidebarMenuButtons />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
