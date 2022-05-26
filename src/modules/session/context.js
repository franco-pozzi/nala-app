import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import CryptoJS from "crypto-js";
import includes from "lodash/includes";
import { useTranslation } from "react-i18next";
import { VERSION } from "config";
import {
  CRYPTO_KEY, LOCAL_STORAGE_NAMES, ROLES,
} from "common/constants";
import { isEqual } from "common/helpers";
import { toast, MESSAGE_TYPES } from "components/Toast/functions";
import { getList as getCountriesList } from "redux/actions/common/countryActions";
import { getList as getOrgUnitsTypes } from "redux/actions/organizationUnits/orgUnitsTypesActions";
import { getList as getOrgUnits } from "redux/actions/organizationUnits/orgUnitsActions";
import { getList as getCitiesList } from "redux/actions/common/cityActions";
import { getList as getTypeOfContract } from "redux/actions/typeOfContractActions";
import { getList as getPositions } from "redux/actions/position/positionActions";
import { getList as getPotentialProcesses } from "redux/actions/potential/potentialActions";
import { getList as getGoodLeaderProcesses } from "redux/actions/performance/goodLeaderActions";
import { getList as getDocumentTypes } from "redux/actions/documentTypeActions";
import { getList as getInfoTypes } from "redux/actions/infoTypeActions";
import { getList as getBenefits } from "redux/actions/benefitsActions";
import { getList as getTimeOffCategories } from "redux/actions/timeOffCategoriesActions";
import { getList as getTimeOffTypes } from "redux/actions/timeOffTypesActions";
import { getList as getEmploymentRelationship } from "redux/actions/common/employmentRelationshipActions";
import { getList as getRoles } from "redux/actions/common/roleActions";
import { getList as getCurrencies } from "redux/actions/common/currencyActions";
import { getMainList as getCollaboratorsMainList } from "redux/actions/collaboratorActions";
import { getList as getFollowUpList } from "redux/actions/followUpActions";
import { dispatchIfNotLocalStorage, setInLocalStorage, getUserRoles } from "common/utils";
import useSignInService from "hooks/auth/useSignInService";
import auth from "./api";

const SessionContext = createContext(null);

const SessionProvider = ({ children }) => {
  const { t, i18n } = useTranslation("common");
  const [user, setUser] = useState(
    localStorage.user ? JSON.parse(localStorage.user) : null,
  );
  const { userResult, logout, isLogout } = useSignInService();

  const {
    list: listOrgUnitsTypes,
  } = useSelector(({ orgUnitsTypesReducer }) => orgUnitsTypesReducer);
  const {
    list: listTypeOfContract,
  } = useSelector(({ typeOfContractReducer }) => typeOfContractReducer);

  const { list: listCountries } = useSelector(({ countryReducer }) => countryReducer);
  const { list: listOrgUnits } = useSelector(({ orgUnitsReducer }) => orgUnitsReducer);
  const { list: listCities } = useSelector(({ cityReducer }) => cityReducer);
  const { list: listPositions } = useSelector(({ positionReducer }) => positionReducer);
  const { list: listTimeOffCategories } = useSelector(({ timeOffCategoryReducer }) => timeOffCategoryReducer);
  const { list: listTimeOffTypes } = useSelector(({ timeOffTypeReducer }) => timeOffTypeReducer);
  const { list: listEmploymentRelationship } = useSelector(({ employmentRelationshipReducer }) => employmentRelationshipReducer);
  const { list: listCurrencies } = useSelector(({ currencyReducer }) => currencyReducer);
  const { managersList: listCollaboratorsMain } = useSelector(({ collaboratorReducer }) => collaboratorReducer);
  const { headers } = useSelector(({ signInReducer }) => signInReducer);

  const [cookies] = useCookies(["language"]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.company && localStorage?.user && localStorage.version === VERSION
      && !isEqual(localStorage.getItem(LOCAL_STORAGE_NAMES.logOutError), "true")) {
      if (!includes(getUserRoles(user?.userCookies), ROLES.CANDIDATE)) {
        dispatch(getDocumentTypes());
        dispatch(getInfoTypes());
        dispatch(getBenefits());
        dispatchIfNotLocalStorage(
          LOCAL_STORAGE_NAMES.employmentRelationship,
          getEmploymentRelationship(),
          dispatch,
        );
        dispatchIfNotLocalStorage(
          LOCAL_STORAGE_NAMES.managers,
          getCollaboratorsMainList({ q: { user_roles_name_eq: ROLES.MANAGER } }),
          dispatch,
        );
      }
      dispatch(getPotentialProcesses());
      dispatch(getGoodLeaderProcesses());
      dispatch(getRoles());

      dispatchIfNotLocalStorage(
        LOCAL_STORAGE_NAMES.currencies,
        getCurrencies(),
        dispatch,
      );

      dispatchIfNotLocalStorage(LOCAL_STORAGE_NAMES.orgUnits, getOrgUnits(), dispatch);

      dispatchIfNotLocalStorage(
        LOCAL_STORAGE_NAMES.typeOfContract,
        getTypeOfContract(),
        dispatch,
      );

      dispatchIfNotLocalStorage(
        LOCAL_STORAGE_NAMES.cities,
        getCitiesList(),
        dispatch,
      );
      dispatchIfNotLocalStorage(
        LOCAL_STORAGE_NAMES.countries,
        getCountriesList(),
        dispatch,
      );

      dispatchIfNotLocalStorage(
        LOCAL_STORAGE_NAMES.orgUnitsTypes,
        getOrgUnitsTypes(),
        dispatch,
      );

      dispatchIfNotLocalStorage(
        LOCAL_STORAGE_NAMES.positions,
        getPositions(),
        dispatch,
      );
      dispatchIfNotLocalStorage(
        LOCAL_STORAGE_NAMES.timeOffCategories,
        getTimeOffCategories(),
        dispatch,
      );
      dispatchIfNotLocalStorage(
        LOCAL_STORAGE_NAMES.timeOffTypes,
        getTimeOffTypes(),
        dispatch,
      );
      dispatch(getFollowUpList());
    }
  }, [dispatch, user]);

  useEffect(() => {
    setInLocalStorage(
      LOCAL_STORAGE_NAMES.typeOfContract,
      listTypeOfContract,
    );
    setInLocalStorage(LOCAL_STORAGE_NAMES.managers, listCollaboratorsMain);
    setInLocalStorage(LOCAL_STORAGE_NAMES.cities, listCities);
    setInLocalStorage(
      LOCAL_STORAGE_NAMES.countries,
      listCountries,
    );
    setInLocalStorage(
      LOCAL_STORAGE_NAMES.orgUnitsTypes,
      listOrgUnitsTypes,
    );
    setInLocalStorage(
      LOCAL_STORAGE_NAMES.orgUnits,
      listOrgUnits,
    );
    setInLocalStorage(
      LOCAL_STORAGE_NAMES.currencies,
      listCurrencies,
    );
    setInLocalStorage(
      LOCAL_STORAGE_NAMES.employmentRelationship,
      listEmploymentRelationship,
    );
    setInLocalStorage(
      LOCAL_STORAGE_NAMES.positions,
      listPositions,
    );
    setInLocalStorage(
      LOCAL_STORAGE_NAMES.timeOffCategories,
      listTimeOffCategories,
    );
    setInLocalStorage(
      LOCAL_STORAGE_NAMES.timeOffTypes,
      listTimeOffTypes,
    );
  }, [
    listTypeOfContract,
    listCollaboratorsMain,
    listCountries,
    listCities,
    listOrgUnitsTypes,
    listOrgUnits,
    listCurrencies,
    listEmploymentRelationship,
    listPositions,
    listTimeOffCategories,
    listTimeOffTypes,
  ]);

  useEffect(() => {
    if (cookies.language) {
      i18n.changeLanguage(cookies.language);
    }
    if (!userResult && !localStorage.user) {
      return;
    }

    let data = null;
    if (localStorage.user) {
      data = JSON.parse(localStorage.user);
      if (data?.user) {
        data = null;
        localStorage.clear();
      }
      setUser(data ? { ...data } : null);
    }

    if (!userResult?.user?.userCookies && userResult?.user?.roles.length > 0) {
      // in order to "keep save" the roles names
      // we decided to encrypt the string with this format:
      // company_id + user.id + role.name

      // keep this code close to the
      const userData = userResult.user;
      const companyId = userResult.user.company_id;
      const userId = userResult.user.id;
      const roles = userResult?.user?.roles;
      let userCookies = [];
      userCookies = roles.map((role) => {
        const roleName = role.name;
        const validString = `${companyId}-${userId}-${roleName}`;
        const encrypted = CryptoJS.AES.encrypt(validString, CRYPTO_KEY);
        const cryptText = encrypted.toString();
        return cryptText;
      });
      userData.userCookies = userCookies;
      userData.sessionCookies = headers;
      localStorage.setItem(LOCAL_STORAGE_NAMES.user, JSON.stringify(userData));
      localStorage.setItem(LOCAL_STORAGE_NAMES.version, VERSION);
      setUser({ ...userData });
    }
    if ((
      !userResult && user && !user?.userCookies)
      || !isEqual(localStorage.getItem(LOCAL_STORAGE_NAMES.version), VERSION)
      || isEqual(localStorage.getItem(LOCAL_STORAGE_NAMES.logOutError), "true")) {
      const toastMessage = isEqual(localStorage.getItem(LOCAL_STORAGE_NAMES.logOutError), "true")
        ? { title: t("common.api_responses.error.unauthorized"), message: t("common.api_responses.error.unauthorized_message") }
        : { title: t("common.api_responses.info.token_expired"), message: t("common.api_responses.info.token_expired_message") };
      toast(MESSAGE_TYPES.info, toastMessage);

      auth.signOut();
      localStorage.clear();
      setUser(null);
      logout();
    }
  // eslint-disable-next-line
  }, [i18n, cookies, userResult]);

  const state = { user };
  const actions = {
    signOut: () => {
      auth.signOut();
      localStorage.clear();
      setUser(null);
      logout();
    },
  };

  return (
    <SessionContext.Provider value={ { state, actions, isLogout } }>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider, SessionContext };
