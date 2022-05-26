import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ALIGN_ITEMS, LOCAL_STORAGE_NAMES, VARIANT } from "common/constants";
import { isNullOrUndefined } from "common/helpers";
import { getItemFromLocalStorage, setInLocalStorageAsync } from "common/utils";
import SelectedCompanyModal from "../SelectedCompanyModal";
import {
  StyledCompanyBrand, StyledFormControl, StyledSelect, StyledTypography, StyledBrand,
} from "./styles";

const CompanyBrand = (props) => {
  const { user } = props;
  const { t } = useTranslation("common");
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  const handleChange = () => (event) => {
    const localUser = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user);
    localUser.company_id = event.target.value;
    localUser.company = localUser.companies.find((e) => e.id === event.target.value);
    setInLocalStorageAsync(LOCAL_STORAGE_NAMES.user, localUser);
    setModal(true);
  };

  const getBrand = (brand) => (brand?.logo_img_url ? (
    <StyledBrand alt={ brand?.name || "" } src={ brand?.logo_img_url } />
  ) : (
    <Typography variant={ VARIANT.h3 }>{ brand?.name }</Typography>
  ));

  const items = user.companies?.map((menuItem) => (
    <MenuItem key={ menuItem.id } value={ menuItem.id }>
      { getBrand(menuItem) }
    </MenuItem>
  ));

  const validateCompany = isNullOrUndefined(user?.companies) ? getBrand(user?.company) : (
    <>
      <Typography>{ t("youAreIn") }</Typography>
      <StyledFormControl >
        <StyledSelect
          id={ user.company_id }
          value={ user.company_id }
          onChange={ handleChange() }
          IconComponent={ ExpandMoreIcon }
          MenuProps={ {
            anchorOrigin: {
              vertical: ALIGN_ITEMS.bottom,
              horizontal: ALIGN_ITEMS.right,
            },
            transformOrigin: {
              vertical: ALIGN_ITEMS.top,
              horizontal: ALIGN_ITEMS.left,
            },
            getContentAnchorEl: null,
          } }
        >
          <StyledTypography>{ t("updateCompany") }</StyledTypography>
          { items }
        </StyledSelect>
      </StyledFormControl>
    </>
  );

  return (
    <StyledCompanyBrand>
      { validateCompany }
      <SelectedCompanyModal
        isOpen={ modal }
        onClose={ handleModal }
      />
    </StyledCompanyBrand>
  );
};

CompanyBrand.propTypes = {
  user: PropTypes.object.isRequired,
};

export default CompanyBrand;
