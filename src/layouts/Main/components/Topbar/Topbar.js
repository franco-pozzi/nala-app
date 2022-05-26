import React, {
  useContext,
  useState,
  useEffect,
  useCallback
} from "react";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Button from "components/Button";
import { SessionContext } from "modules/session/context";
import NalaLogoBlue from "assets/images/top-bar-minimal/logo-white.svg";
import { LANGUAGES, LANGUAGES_NAMES } from "common/constants";
import ChangePasswordModal from "../ChangePasswordModal";
import {
  StyledAppBar,
  StyledLinkButton,
  StyledSelect,
  StyledProfileButton,
  StyledContainerMenuItem,
} from "./styles";

const Topbar = (props) => {
  const {
    actions: { signOut },
    state: { user },
  } = useContext(SessionContext);
  const { onSidebarOpen, ...rest } = props;
  const { t } = useTranslation("common");
  const [openSelect, setopenSelect] = useState(false);
  const [cookies, setCookie] = useCookies(["language"]);
  const [language, setLanguage] = useState(null);
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dataUser] = useState(user);

  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const handleChange = (event) => {
    setCookie("language", event.target.value);
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  const handleClose = () => {
    setopenSelect(false);
  };

  const handleOpen = () => {
    setopenSelect(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosedProfile = () => {
    setAnchorEl(null);
  };

  const setLanguageByCompany = useCallback((companyLanguage) => {
    setLanguage(companyLanguage);
    setCookie("language", companyLanguage);
  }, [setCookie]);

  useEffect(() => {
    let companyLanguage = user?.company?.language;
    if (cookies.language) {
      setLanguage(cookies.language);
    } else if (companyLanguage) {
      companyLanguage = companyLanguage === LANGUAGES.pt ? LANGUAGES.pr : companyLanguage;
      setLanguageByCompany(companyLanguage);
    } else {
      setLanguage(LANGUAGES.es);
    }
  }, [cookies, user, setLanguageByCompany]);

  const onCloseChangePasswordModal = () => setChangePasswordModal(!changePasswordModal);

  const expandIcon = anchorEl !== null ? <ExpandLessIcon /> : <ExpandMoreIcon />;

  return (
    <StyledAppBar>
      <AppBar { ...rest }>
        <Toolbar>
          <Box display={ {
            xs: "none", md: "block", lg: "none", xl: "none",
          } }
          >
            <IconButton onClick={ onSidebarOpen }>
              <MenuIcon />
            </IconButton>
          </Box>
          <Button>
            <StyledLinkButton to={ "/" }>
              <img alt={ "Logo Nala" } src={ NalaLogoBlue } width={ 72 } height={ 34 } />
            </StyledLinkButton>
          </Button>
          <div className={ "flexGrow" } />
          <Button onClick={ handleOpen } className={ "gTranslateIcon" }>
            <GTranslateIcon />
          </Button>
          <FormControl>
            <StyledSelect
              open={ openSelect }
              onClose={ handleClose }
              onOpen={ handleOpen }
              value={ language }
              onChange={ handleChange }
            >
              <MenuItem value={ LANGUAGES.es }>{LANGUAGES_NAMES.spanish}</MenuItem>
              <MenuItem value={ LANGUAGES.en }>{LANGUAGES_NAMES.english}</MenuItem>
              <MenuItem value={ LANGUAGES.pr }>{LANGUAGES_NAMES.portuguese}</MenuItem>
            </StyledSelect>
          </FormControl>
          <Box px={ 2 } />
          <Hidden smDown>
            <StyledProfileButton
              aria-controls={ "simple-menu" }
              aria-haspopup={ "true" }
              onClick={ handleClick }
            >
              {dataUser?.full_name || ""}
              {expandIcon}
              <Avatar
                alt={ dataUser?.full_name || "" }
                src={ dataUser?.profile_img_url || "" }
              />
            </StyledProfileButton>
            <Menu
              id={ "simple-menu" }
              anchorEl={ anchorEl }
              keepMounted
              open={ Boolean(anchorEl) }
              onClose={ handleClosedProfile }
            >
              <StyledContainerMenuItem>
                <Typography className={ "menuItemName" }>
                  {dataUser?.full_name}
                </Typography>
                <Typography className={ "menuItemCPF" }>
                  {dataUser?.personal_id}
                </Typography>
                <Divider />
                <MenuItem onClick={ signOut }>
                  <ExitToAppIcon />
                  {t("top-nav-bar.logout")}
                </MenuItem>
              </StyledContainerMenuItem>
            </Menu>
          </Hidden>
          <Hidden mdUp>
            <IconButton onClick={ onSidebarOpen }>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      <ChangePasswordModal
        open={ changePasswordModal }
        onClose={ onCloseChangePasswordModal }
      />
    </StyledAppBar>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
