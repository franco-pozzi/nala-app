import React, { forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import includes from "lodash/includes";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Button from "components/Button";
import SimpleAccordion from "components/SimpleAccordion";
import useStyles from "./styles";

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ ref } style={ { flexGrow: 1 } }>
    <RouterLink { ...props } />
  </div>
));

const SidebarNav = (props) => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();

  const isActiveClass = (href) => {
    const { search } = window.location;

    if (search) {
      if (includes(search, "collaborator") && href === "/collaborators") {
        return true;
      }
      if (includes(search, "candidate") && href === "/onboarding-candidates") {
        return true;
      }
    } else return isEqual(window.location.pathname, href);
  };

  const getSubPages = (subPage) => (
    subPage.isSubmenu ? (
      <SimpleAccordion
        isTitleImage
        title={ subPage.title }
        src={ subPage.icon }
        customImage={ classes.icon }
        customStyles={ {
          accordion: classes.accordion,
          headerContainer: classes.accordionHeader,
          title: classes.accordionTitle,
          container: classes.accordionContainer,
        } }
      >
        {subPage.deepPages.map((deepPage) => (
          <ListItem className={ classes.item } disableGutters>
            <Button
              customStyle={ clsx(
                classes.button,
                isActiveClass(deepPage.href) && classes.active,
              ) }
              component={ CustomRouterLink }
              href={ deepPage.href }
            >
              <div className={ classes.icon }>{deepPage.icon}</div>
              {deepPage.title}
            </Button>
          </ListItem>
        ))}
      </SimpleAccordion>
    ) : (
      <ListItem className={ classes.item } disableGutters>
        <Button
          customStyle={ clsx(
            classes.button,
            isActiveClass(subPage.href) && classes.active,
          ) }
          component={ CustomRouterLink }
          href={ subPage.href }
        >
          <div className={ classes.icon }>{subPage.icon}</div>
          {subPage.title}
        </Button>
      </ListItem>
    )
  );

  return (
    <List { ...rest } className={ clsx(classes.root, className) }>
      {pages.map((page) => (
        <div key={ page.title }>
          {page.divider && <Divider className={ classes.divider } />}
          {page.isSubmenu ? (
            <SimpleAccordion
              isTitleImage
              title={ page.title }
              src={ page.icon }
              customImage={ classes.icon }
              expandedPanel={ "dashboard" }
              customStyles={ {
                accordion: classes.accordion,
                headerContainer: classes.accordionHeader,
                title: classes.accordionTitleMain,
                container: classes.accordionContainer,
              } }
            >
              {page.subPages.map((subPage) => getSubPages(subPage))}
            </SimpleAccordion>
          ) : !page.title ? page.subPages.map((subPage) => getSubPages(subPage)) : (
            <ListItem className={ classes.item } disableGutters>
              <Button
                customStyle={ clsx(
                  classes.button,
                  isActiveClass(page.href) && classes.active,
                ) }
                component={ CustomRouterLink }
                href={ page.href }
              >
                <div className={ classes.icon }>{page.icon}</div>
                {page.title}
              </Button>
            </ListItem>
          )}

        </div>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

export default SidebarNav;
