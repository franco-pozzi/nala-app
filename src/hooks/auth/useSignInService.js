import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  getOne as getUser,
  getUserByToken,
  resetState,
} from "redux/actions/signInActions";
import { resetState as resetStateCountries } from "redux/actions/common/countryActions";
import { resetState as resetStatePositions } from "redux/actions/position/positionActions";
import { resetState as resetStateCities } from "redux/actions/common/cityActions";
import { resetState as resetStateEmploymentRelationship } from "redux/actions/common/employmentRelationshipActions";
import { resetState as resetStateCurrencies } from "redux/actions/common/currencyActions";
import { resetState as resetStateOrgUnits } from "redux/actions/organizationUnits/orgUnitsActions";
import { resetState as resetStateOrgUnitsTypes } from "redux/actions/organizationUnits/orgUnitsTypesActions";
import { resetState as resetStateTypeOfContract } from "redux/actions/typeOfContractActions";
import { resetState as resetStateFollowUp } from "redux/actions/followUpActions";
import { resetState as resetStateTimeOffCategories } from "redux/actions/timeOffCategoriesActions";
import { resetState as resetStateTimeOffTypes } from "redux/actions/timeOffTypesActions";
import { resetState as resetStateCollaborators } from "redux/actions/collaboratorActions";
import {
  AUTH_METHODS, LOCAL_STORAGE_NAMES, LOCATION_PROPS, OBJECT_KEYS,
} from "common/constants";
import { getItemFromLocalStorage, getPropertyByLocation, setInLocalStorageAsync } from "common/utils";
import { isEmpty, isEqual, isNotValid } from "common/helpers";
import { showToast } from "views/SignIn/functions";

const useSignInService = (props = {}) => {
  const { location, authMethod } = props;
  const dispatch = useDispatch();
  const { one: resultSignIn, errorList, isLoading } = useSelector(
    ({ signInReducer }) => signInReducer,
  );
  const { t } = useTranslation(["authentication", "common"]);
  const [isLogout, setIsLogout] = useState(false);

  // States
  const [formData, setFormData] = useState(null);

  // Props management
  const stateLocation = location?.state;
  const emailToRecoverPassword = stateLocation?.emailToRecoverPassword;
  const locationSearch = location && getPropertyByLocation(location, LOCATION_PROPS.search);

  useEffect(() => {
    if (!isNotValid(locationSearch) && isEmpty(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.isMulticompany))) {
      const queryParams = new URLSearchParams(locationSearch);
      const isMulticompany = isEqual(queryParams.get(OBJECT_KEYS.multicompany), "true");
      setInLocalStorageAsync(LOCAL_STORAGE_NAMES.isMulticompany, isMulticompany);
    }
  }, [locationSearch]);

  // This the basic post call to sign in
  useEffect(() => {
    if (formData) {
      if (formData.auth_method === AUTH_METHODS.token) {
        dispatch(getUserByToken(formData));
        setFormData(null);
        return;
      }
      dispatch(getUser(formData));
      setFormData(null);
    }
  }, [dispatch, formData]);

  // When the result is an error we need to show toast with the result
  useEffect(() => {
    if (errorList && authMethod) {
      showToast(errorList, authMethod, emailToRecoverPassword, t);
      dispatch(resetState());
    }
  }, [errorList, authMethod, t, emailToRecoverPassword, dispatch]);

  const resetStates = () => {
    dispatch(resetStateCountries());
    dispatch(resetStatePositions());
    dispatch(resetStateCities());
    dispatch(resetStateOrgUnits());
    dispatch(resetStateOrgUnitsTypes());
    dispatch(resetStateTypeOfContract());
    dispatch(resetStateFollowUp());
    dispatch(resetStateTimeOffCategories());
    dispatch(resetStateTimeOffTypes());
    dispatch(resetStateCollaborators());
    dispatch(resetStateEmploymentRelationship());
    dispatch(resetStateCurrencies());
  };

  const logout = () => {
    dispatch(resetState());
    resetStates();
    setIsLogout(true);
  };

  const clearStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAMES.countries);
    localStorage.removeItem(LOCAL_STORAGE_NAMES.positions);
    localStorage.removeItem(LOCAL_STORAGE_NAMES.cities);
    localStorage.removeItem(LOCAL_STORAGE_NAMES.orgUnits);
    localStorage.removeItem(LOCAL_STORAGE_NAMES.orgUnitsTypes);
    localStorage.removeItem(LOCAL_STORAGE_NAMES.typeOfContract);
    localStorage.removeItem(LOCAL_STORAGE_NAMES.maxFollowUpDays);
    localStorage.removeItem(LOCAL_STORAGE_NAMES.timeOffCategories);
    localStorage.removeItem(LOCAL_STORAGE_NAMES.timeOffTypes);
    localStorage.removeItem(LOCAL_STORAGE_NAMES.managers);
    localStorage.removeItem(LOCAL_STORAGE_NAMES.employmentRelationship);
    localStorage.removeItem(LOCAL_STORAGE_NAMES.currencies);
  };

  return {
    userResult: resultSignIn,
    errorList,
    isLoading,
    signInPost: setFormData,
    logout,
    isLogout,
    resetStates,
    clearStorage,
  };
};

export default useSignInService;
