import React from "react";
import i18next from "i18next";
import AsyncLocalStorage from "@createnextapp/async-local-storage";
import FileSaver from "file-saver";
import moment from "moment";
import crypto from "crypto";
import CryptoJS from "crypto-js";
import XLSX from "xlsx";
import { Workbook } from "exceljs";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import includes from "lodash/includes";
import lodashRound from "lodash/round";
import isUndefined from "lodash/isUndefined";
import isNull from "lodash/isNull";
import isString from "lodash/isString";
import find from "lodash/find";
import divide from "lodash/divide";
import gte from "lodash/gte";
import some from "lodash/some";
import charts from "theme/charts";
import {
  UNITS, CONTRACT_TYPES, CITIES, POSITIONS, ADDITIONAL_FIELDS,
} from "views/GeneralAdministrator/functions";
import { getCountry } from "views/GeneralAdministrator/functions/cities";
import {
  WEEK_DAYS,
  MONTHS,
  SUCCESS,
  ERROR,
  ERROR_TYPE,
  XLSX_EXTENSION,
  FILE_TYPE_EXCEL,
  PASSWORD_VALIDATION_UTILS,
  ROLES,
  FULLDATE_FORMATS,
  DEFAULT_MIN_DECIMAL,
  ROUND,
  PERCENTAGE,
  KEY_PRESS,
  LOCAL_STORAGE_NAMES,
  DOWNLOAD_TYPE,
  EXCEL_PROPS,
  OBJECT_KEYS,
  COUNTRIES,
  INDEX,
  RADIX_PARAMETER,
  MIN_VALUE,
  API_URL_RAILS_V1,
  METHODS,
  CRYPTO_KEY,
  DATE_PARTS,
} from "./constants";
import { isNullOrUndefined } from "./helpers";

export const historyPush = (history, path, search, state) => {
  history.push({
    pathname: path,
    search,
    state,
  });
};

export const formatDate = (date, format = FULLDATE_FORMATS.dash) => moment(date).utc().format(format);

export const formatDateExcel = (date) => moment(moment(date).add(INDEX.one, "d").utc()).toDate();

export const formatDateAsUTC = (date) => moment(date)
  .utc()
  .format(FULLDATE_FORMATS.dash);

export const formatDateMonthYear = (date) => moment(date).format("MM/YY");

export const formatDateStringShort = (date) => moment(date).format("MMM D");

export const getPercent = (value, hasSymbol = false, round = ROUND.min) => {
  const result = lodashRound(value * PERCENTAGE.max, round);
  return hasSymbol ? `${result}%` : result;
};

export const getNoRoundPercent = (value, hasSymbol = false) => {
  const result = value * PERCENTAGE.max;
  return hasSymbol ? `${result}%` : result;
};

export const getCurrentLanguage = () => i18next.language;

export const getMonthName = (date, t) => t(`common:months.${MONTHS[date.getMonth()]}`);

export const getUtilsFromDate = (date, t) => {
  date = new Date(date);
  const dayName = t(`common:week_days.${WEEK_DAYS[date.getDay()]}`);
  const monthName = getMonthName(date, t);
  return date && `${dayName}, ${date.getUTCDate()} ${monthName} ${date.getFullYear()}`;
};

export const getMonthYear = (date, t) => {
  date = new Date(date);
  const monthName = getMonthName(date, t);
  return date && `${monthName}/${date.getFullYear()}`;
};

export const handleAlertAutohide = (
  errorStatus,
  setAlertAutohide,
  t,
  customSuccessText,
) => {
  const title = errorStatus
    ? "common:common.api_responses.error.title"
    : "common:common.api_responses.success.title";
  const message = errorStatus
    ? `${errorStatus}`
    : customSuccessText || "common:common.api_responses.success.save";

  setAlertAutohide({
    open: true,
    title: t(title),
    message: t(message),
    type: errorStatus ? ERROR : SUCCESS,
  });
};

export const onCloseAlertAutohide = (setAlertAutohide) => () => {
  setAlertAutohide({
    open: false,
    title: "",
    message: "",
    type: ERROR,
  });
};

export const isNotNull = (toValidate) => !isEqual(toValidate, null);

export const isUnauthorized = (errors) => isEqual(errors.toLowerCase(), ERROR_TYPE.unauthorized);

export const setInLocalStorage = (localStorageName, reducer) => {
  const isInLocalStorage = localStorage.getItem(localStorageName);

  if (isNotNull(reducer) && !isInLocalStorage) {
    return localStorage.setItem(localStorageName, JSON.stringify(reducer));
  }
  return null;
};

export const setInLocalStorageAsync = (localStorageName, values) => {
  if (isNotNull(values)) {
    return AsyncLocalStorage.setItem(localStorageName, JSON.stringify(values));
  }
  return null;
};

export const dispatchIfNotLocalStorage = (
  nameLocalStorage,
  action,
  dispatch,
) => {
  const isInLocalStorage = localStorage.getItem(nameLocalStorage);
  if (!isInLocalStorage) {
    dispatch(action);
  }
};

export const getItemFromLocalStorage = (name) => JSON.parse(localStorage.getItem(name)) || [];

export const multipleWorksheet = (allDataToDownload) => {
  const allSheets = {};
  const allSheetsName = [];
  allDataToDownload.forEach((item) => {
    allSheets[item.name] = XLSX.utils.json_to_sheet(item.data);
    allSheetsName.push(item.name);
  });
  return { Sheets: allSheets, SheetNames: allSheetsName };
};

export const mainDownloadExcel = (dataToDownload, fileName, isMultiple = false) => {
  const fileExtension = `.${XLSX_EXTENSION}`;
  const wb = isMultiple
    ? multipleWorksheet(dataToDownload)
    : { Sheets: { data: XLSX.utils.json_to_sheet(dataToDownload) }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, {
    bookType: XLSX_EXTENSION,
    type: "array",
  });
  const data = new Blob([excelBuffer], { type: FILE_TYPE_EXCEL });
  FileSaver.saveAs(data, fileName + fileExtension);
};

export const validatePassword = (password, passwordConfirmation) => {
  let validPassword = {
    isValid: false,
    typeOfError: "",
  };

  if (
    isEqual(password, passwordConfirmation)
    && gte(password.length, PASSWORD_VALIDATION_UTILS.minLength)
  ) validPassword = { isValid: true };
  else {
    validPassword = {
      isValid: false,
      typeOfError: !gte(password.length, PASSWORD_VALIDATION_UTILS.minLength)
        ? PASSWORD_VALIDATION_UTILS.length
        : PASSWORD_VALIDATION_UTILS.confirmation,
    };
  }

  return validPassword;
};

export const getUserRoles = (userCookies) => {
  let userRoles = [];
  if (userCookies) {
    userRoles = userCookies.map((userCookie) => {
      const decrypted = CryptoJS.AES.decrypt(userCookie, CRYPTO_KEY);
      const decryptText = decrypted.toString(CryptoJS.enc.Utf8);
      return decryptText.split("-")[INDEX.two];
    });
  }

  return userRoles;
};

export const isNotCandidate = (from, userCookies) => !includes(from, ROLES.CANDIDATE) && !includes(getUserRoles(userCookies), ROLES.CANDIDATE);

// FIXME: this function will be modified, please do not care about it!
export const getAmountFormat = (
  amount,
  decimalLength = DEFAULT_MIN_DECIMAL,
  decimal = ".",
  thousands = ",",
) => {
  decimalLength = Math.abs(decimalLength);
  decimalLength = isNaN(decimalLength) ? DEFAULT_MIN_DECIMAL : decimalLength;

  const negativeSign = amount < 0 ? "-" : "";

  const i = parseFloat(
    (amount = Math.abs(Number(amount) || 0).toFixed(decimalLength)),
  ).toString();
  const haveDecimal = i.indexOf(decimal) > -1;
  const len = haveDecimal ? i.substring(0, i.search(/\./)).length : i.length;
  const j = len > 3 ? len % 3 : 0;

  return (
    negativeSign
    + (j ? i.substr(0, j) + thousands : "")
    + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`)
  );
};

export const getCurrencyFormat = (value, currency, currencies) => {
  if (currency && currencies) {
    const exchange = find(currencies, { name_with_code: currency })?.value;
    value = exchange ? divide(value, exchange) : "";
  }
  return value;
};

export const hasEmptyInput = (control, objKey, validateAllFields) => includes(validateAllFields(control.getValues()), objKey);

export const hasAllValidatedFields = (arrayWithKeys) => isUndefined(
  Object.keys(arrayWithKeys).find((key) => isEqual(arrayWithKeys[key], true)),
);

export const preventEnter = (e) => isEqual(e.key, KEY_PRESS.enter) && e.preventDefault();

export const getEmployeeCompanyId = (user) => user?.company?.id || user?.person?.employee?.company_id;

export const getUserId = (user) => user?.id;

export const getEmployeeId = (user) => user?.employee?.id;

export const getEmployeeCompanySlug = (user) => user?.company?.slug;

export const getEmployeeCompanyName = (user) => user?.company?.name;

export const getAutocompleteAttr = (newValue, nameOfAttr) => (isNull(newValue) || isString(newValue) ? newValue : newValue[nameOfAttr]);

export const getDivisionAndAreaType = () => {
  const organizationUnitsTypes = getItemFromLocalStorage(
    LOCAL_STORAGE_NAMES.orgUnitsTypes,
  );

  return {
    division: organizationUnitsTypes.find((type) => type.level === INDEX.one),
    area: organizationUnitsTypes.find((type) => type.level === INDEX.two),
  };
};

export const getDivisions = (orgUnits) => {
  const organizationUnitsTypes = getDivisionAndAreaType();
  const orgUnitTypeDivisionId = organizationUnitsTypes?.division?.id;
  return (!isEmpty(orgUnits)
    ? orgUnits.filter((orgUnit) => orgUnit.organization_unit_type_id === orgUnitTypeDivisionId)
    : []);
};

export const getCities = (countrySelected) => {
  const allCities = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.cities);
  const citiesSelected = allCities.filter((city) => isEqual(city.country_id, countrySelected));
  return citiesSelected;
};

export const getAreas = (organizationUnits, divisionSelected) => {
  const organizationUnitsTypes = getDivisionAndAreaType();
  const orgUnitTypeAreaId = organizationUnitsTypes?.area?.id;
  const allOrgUnits = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.orgUnits);
  const areasSelected = allOrgUnits.filter((orgUnit) => orgUnit.parent_id === divisionSelected
  && orgUnit.organization_unit_type_id === orgUnitTypeAreaId);
  return areasSelected;
};

export const getElementNewValue = (value, name) => (!isNull(value) ? name : "");

export const roles = localStorage.user
  ? JSON.parse(localStorage.user).roles_name
  : null;

export const isAdminNala = (userCookies) => includes(getUserRoles(userCookies), ROLES.ADMIN_NALA);

// note: idk why isAdmin function includes all those options, should be ONLY admin, please do a refactor of this
export const isAdmin = (userCookies) => some(getUserRoles(userCookies), (rol) => isEqual(rol, ROLES.ADMIN) || isEqual(rol, ROLES.ADMIN_NALA) || isEqual(rol, ROLES.TALENT_MANAGER) || isEqual(rol, ROLES.ADMIN_COLOMBIA));

export const isMainAdmin = (userCookies) => some(getUserRoles(userCookies), (rol) => isEqual(rol, ROLES.ADMIN));

export const isCandidate = (userCookies) => !isEmpty(getUserRoles(userCookies)?.filter((role) => isEqual(role, ROLES.CANDIDATE)));

export const getDownloadTypes = (t) => [
  { value: DOWNLOAD_TYPE.none, label: t("performance:dashboard.download") },
  { value: DOWNLOAD_TYPE.excel, label: t("performance:dashboard.excel") },
  { value: DOWNLOAD_TYPE.pdf, label: t("performance:dashboard.download_pdf") },
];

export const getPropertyByLocation = (location, propName) => location[propName];

// Receives an array and the name of the key to be listed
// Returns an array
export const getStringList = (data, name) => data?.map((item) => item[name]);

const excelStyleByRequiredColumn = (cell, isListType) => {
  const border = EXCEL_PROPS.style.border.thin;
  cell.fill = {
    type: EXCEL_PROPS.type.pattern,
    pattern: EXCEL_PROPS.pattern.solid,
    fgColor: { argb: EXCEL_PROPS.style.colors.fgColorRequired },
    bgColor: { argb: EXCEL_PROPS.style.colors.bgColorRequired },
  };
  cell.border = {
    top: { style: border },
    left: { style: border },
    bottom: { style: border },
    right: { style: border },
  };
  cell.font = {
    bold: isListType,
    name: EXCEL_PROPS.font,
  };
};

export const getLetters = (value) => value.replace(/\d/g, "");

export const getExcelFormula = (columName, dataList) => `=${OBJECT_KEYS.listings}!$${columName}$${EXCEL_PROPS.position.one}:$${columName}${dataList.length}`;

export const mainDownloadExcelCustom = (dataToDownload, fileName, t) => {
  const header = dataToDownload.map((item) => item.name);
  const fileExtension = `.${XLSX_EXTENSION}`;
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet(fileName);
  // Add worksheet hidden for lists
  const worksheetList = workbook.addWorksheet(OBJECT_KEYS.listings);
  worksheetList.state = EXCEL_PROPS.state.hidden;
  // Add Header Row
  worksheet.addRow(header);
  // Custom cells by column
  worksheet.columns.forEach((column, index) => {
    const columnData = dataToDownload[index];
    const dataList = getStringList(columnData.list, columnData.keyList);
    let maxLength = EXCEL_PROPS.style.minLength;
    column[EXCEL_PROPS.eachCell]({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value
        ? cell.value.toString().length
        : EXCEL_PROPS.style.minWidth;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
      // Styles only if required column
      columnData.isRequired
        && excelStyleByRequiredColumn(cell, !isEmpty(dataList));
      // Only list type
      if (!isEmpty(dataList)) {
        const columName = getLetters(cell._address);
        // Add list to worksheet hidden
        worksheetList.getColumn(index + 1).values = dataList;
        worksheet.dataValidations.add(
          `${cell._address}:${cell._address}${EXCEL_PROPS.plusCell}`,
          {
            type: EXCEL_PROPS.type.list,
            allowBlank: false,
            formulae: [getExcelFormula(columName, dataList)],
            showErrorMessage: true,
            errorStyle: EXCEL_PROPS.errorStyle.error,
            error: t("common:common.excel.selectError"),
          },
        );
      }
    });
    column.width = maxLength < EXCEL_PROPS.style.minWidth
      ? EXCEL_PROPS.style.minWidth
      : maxLength + EXCEL_PROPS.style.maxLength;
  });
  workbook.xlsx.writeBuffer().then((data) => {
    const dataToSave = new Blob([data], {
      type: XLSX_EXTENSION,
    });
    FileSaver.saveAs(dataToSave, `${fileName}${fileExtension}`);
  });
};

export const getAllExceptSelected = (allItems, findByKey) => allItems?.filter((item) => item.id !== findByKey && item.parent_id !== findByKey);

export const getObjectStructure = (module, data) => {
  let dataStructure;
  switch (module) {
  case UNITS:
    dataStructure = { organization_unit: data };
    break;
  case CONTRACT_TYPES:
    dataStructure = { type_of_contract: data };
    break;
  case CITIES:
    dataStructure = { city: data };
    break;
  case POSITIONS:
    dataStructure = { position: data };
    break;
  case ADDITIONAL_FIELDS:
    dataStructure = { dynamic_attribute: data };
    break;
  default:
    break;
  }
  return dataStructure;
};

export const isColombianAdmin = (userCookies) => !isEmpty(getUserRoles(userCookies)?.filter((role) => isEqual(role, ROLES.ADMIN_COLOMBIA)));

export const isColombianEmployee = (country) => country === COUNTRIES.colombia;

export const handleAlertDetail = (
  reducer,
  setAlert,
  t,
) => {
  if (reducer.error) {
    setAlert({
      open: true,
      title: t("common:common.api_responses.error.title"),
      message:
        reducer.error.data.errors_messages?.join("\n")
        || reducer.error.data.detail,
      type: ERROR,
    });
  } else {
    setAlert({
      open: true,
      title: t("common:common.api_responses.success.title"),
      message: t("common:common.api_responses.success.save"),
      type: SUCCESS,
    });
  }
};

export const getFormattedItems = (localStorageName, list) => {
  const localStorageElements = localStorageName ? getItemFromLocalStorage(localStorageName) : list;
  const formattedElements = localStorageElements?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  return formattedElements;
};

export const isDateGreaterThanToday = (value) => value > moment();

export const capitalizeFirstLetter = (string) => string[INDEX.zero].toUpperCase() + string.slice(INDEX.one);

export const getPositionId = (positionName) => {
  const allPositions = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.positions);
  return positionName && allPositions.find((item) => item.name === positionName);
};

export const getFirstThreeLetter = (word) => word.slice(0, 3).toUpperCase();

export const getListMonthName = ((monthNum, t) => {
  const monthIndex = monthNum - 1;
  const monthToReturn = MONTHS[monthIndex];
  return getFirstThreeLetter(t(`common:months.${monthToReturn}`));
});

export const getLabelCharts = (reducer, t) => {
  const label = reducer?.map((item) => getListMonthName(item?.month, t));
  return label;
};

export const getDataCharts = (reducer, dataToExtract) => reducer?.map((item) => item[dataToExtract]);

// Get acknowledgement Icon given an ID
export const getAcknowledgementIcon = (id, list) => list.find((item) => item.id === id);

export const getNormalizedString = (string) => string?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const getFormattedTags = (options, nameAttr, hasValidation = false) => {
  const formattedElements = options?.map((item) => {
    const formattedItem = {
      id: item.id,
      value: item[nameAttr],
      label: item[nameAttr],
    };

    if (item?.country_id) {
      formattedItem.country = getCountry(item.country_id)?.name;
    }
    if (hasValidation) {
      formattedItem.email = item.email;
      formattedItem.isActive = item.is_active;
    }

    return formattedItem;
  });
  return formattedElements;
};

export const getOptionListId = (tags) => {
  let elements = [];
  if (tags) {
    elements = tags?.map((tag) => tag.id);
  }

  return elements;
};

export const getOptionsFormat = (options) => options?.map((item) => {
  const newItem = {
    value: item.id,
    label: item.name || item.description || item.full_name, // note: add here all posible ways the read the label for an autocomplete
  };
  return newItem;
});

export const isManager = (userCookies) => some(getUserRoles(userCookies), (rol) => rol === ROLES.MANAGER);

export const isAdminOrManager = (userCookies) => isAdmin(userCookies) || isManager(userCookies);

export const getCompanyCountriesList = (countriesList, collaborators) => {
  const companyCountriesList = countriesList.filter(
    (country) => collaborators?.find((collaborator) => collaborator.country_name === country.name),
  );
  return companyCountriesList;
};

export const getMaxYLabel = (dataList = []) => {
  const maxData = Math.floor(Math.max(...dataList) * 1.25);
  return maxData;
};

export const renderCustomLabelTicks = (props) => {
  const {
    payload, x, y, textAnchor, stroke, radius,
  } = props;
  return (
    <g>
      <text
        radius={ radius }
        stroke={ stroke }
        x={ x }
        y={ y }
        textAnchor={ textAnchor }
        fill={ charts.colors.lightText }
        fontSize={ charts.labels.standar }
      >
        {`${payload.value}%`}

      </text>
    </g>
  );
};

export const enableComponent = (companySlug, companyList) => !companyList.includes(companySlug);

export const isCurrentCompanySlug = (user, companySlug) => user?.company?.slug === companySlug;
export const isCurrentRole = (user, role) => getUserRoles(user?.userCookies)?.some((roleItem) => roleItem === role);

// note:
// The radix parameter is used to specify which numeral system to be used, for example, a radix of 16 (hexadecimal) indicates that the number in the string should be parsed from a hexadecimal number to a decimal number.
// If the radix parameter is omitted, JavaScript assumes the following:
// If the string begins with any other value, the radix is 10 (decimal)
export const getParamEmployeeId = (user, params) => parseInt(params?.collaborator, RADIX_PARAMETER) || parseInt(params?.candidate, RADIX_PARAMETER) || user?.employee?.id;

export const getMainRoute = () => {
  const user = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user);
  return isCurrentRole(user, ROLES.CANDIDATE) ? "preboarding" : "time-off";
};

export const getSkillSeccion = (score, scale) => scale.find((item) => score >= item.bottom && score <= item.top).result;

export const getAverageScore = (results) => results.reduce((total, next) => total + next.score, INDEX.zero) / results.length || results.length;

export const getAverageResult = (results) => {
  const averageResults = results.filter((item) => !isNull(item))
    .map((result) => result?.average_result?.toFixed(DEFAULT_MIN_DECIMAL));
  return averageResults;
};

export const getLastProcessId = (processes) => processes.find((process) => process.average_result !== null)?.id;

export const calculateLossRisk = (list, collaboratorId) => {
  const attritionLossRisk = list?.map((item) => {
    let verticeValues = MIN_VALUE;
    let calculatedAttrition = MIN_VALUE;
    if (item.employee_id === collaboratorId) {
      verticeValues = item.attrition_axis_values
        .filter((vertice) => vertice.value !== null)
        .map((vertice) => {
          const sumatory = vertice.value * vertice.weighing;
          return { sumatory, weight: vertice.weighing };
        });

      const sumatoryOfVertices = verticeValues.reduce((currentValue, vertice) => currentValue + vertice.sumatory, MIN_VALUE);
      const weightOfVertices = verticeValues.reduce((currentValue, vertice) => currentValue + vertice.weight, MIN_VALUE);
      calculatedAttrition = 1 - sumatoryOfVertices / weightOfVertices;
    }
    return calculatedAttrition;
  });
  return attritionLossRisk;
};

export const hexToRgbA = (hexCode, opacity = 1) => {
  let hex = hexCode.replace("#", "");
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity})`;
};

export const isValidRole = (userCookies, role) => getUserRoles(userCookies)?.filter((item) => item === role).length !== 0;

export const getValidDate = () => `${moment(new Date(), "MM-DD-YYYY HH:mm:ss").utc().format("YYYY-MM-DD HH:mm:ss")} GMT`;

export const getCryptoConfig = (validDate) => {
  const companyName = getEmployeeCompanyName(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user)); // FIXME: remove this after TOKEN implementation
  const validString = `${companyName}${validDate}`;
  const hash = crypto
    .createHmac("sha1", CRYPTO_KEY)
    .update(validString)
    .digest("base64");
  return hash;
};

export const getAxiosDeleteConfig = (mainUrl, id, data) => {
  const deleteConfig = {
    method: METHODS.delete,
    url: `${API_URL_RAILS_V1}${mainUrl}/${id}`,
  };

  if (data) {
    deleteConfig.data = data;
  }
  return deleteConfig;
};

export const getActiveList = (list) => list?.filter((collaborator) => collaborator?.is_active);

export const formatDateUTC = (date) => moment(date).utc();

export const excelHeader = (key, name, isRequired, format, list = [], keyList) => ({
  key, name, isRequired, format, list, keyList,
});

export const sumDaysFromDate = (date, followUpDays, isFormatted = false) => {
  const formattedDate = formatDateUTC(date);
  const newDate = formattedDate.add(followUpDays, "d");
  return isFormatted ? formatDateAsUTC(newDate) : newDate;
};

export const getDaysFromToday = (startingDate) => {
  const today = formatDateUTC(new Date());
  const startingDateFormatted = formatDateUTC(startingDate);
  return today.diff(startingDateFormatted, DATE_PARTS.days);
};

export const hasPreviewImage = (collaborator) => collaborator.profile_img_url_thumb && collaborator.profile_img_url;

export const mergeListsOfObjects = (firstList, secondList) => {
  const ids = new Set(firstList.map((item) => item.id));
  return [...firstList, ...secondList.filter((item) => !ids.has(item.id))];
};

export const removeById = (list, id) => list.filter((item) => item.id !== id);

export const getSelectCollaboratorOptions = (collaborators) => collaborators?.map((item) => ({
  value: item.id,
  label: item.full_name,
  avatar: item.profile_img_url,
}));
export const getFormatMulticompany = (data) => {
  const index = data.companies?.findIndex(
    (e) => isEqual(e.id, data.company_id),
  );
  data.companies[index][OBJECT_KEYS.isMain] = true;
  return {
    user: {
      ...data,
      company: data.companies[index],
    },
  };
};

export const isMainCompany = (user) => !isUndefined(user?.company?.is_main) || isUndefined(user?.companies);

export const getMaxFollowUpDays = (followUpProcess) => !isEmpty(followUpProcess) && followUpProcess[INDEX.zero]?.max_follow_up_days;

export const normalizeText = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const toSnakeCase = (name) => name.replace(/\W+/g, " ")
  .split(/ |\B(?=[A-Z])/)
  .map((word) => word.toLowerCase())
  .join("_");

export const convertSnakeCase = (name) => toSnakeCase(normalizeText(name).toLowerCase());

export const isValidScope = (user, employeeScope, scopeName = OBJECT_KEYS.name) => {
  const scopes = user?.roles_with_scope?.find((role) => isEqual(role.name, ROLES.ADMIN));
  const hasValidScope = isNullOrUndefined(employeeScope) || isEmpty(scopes?.managed_countries) || !isUndefined(scopes?.managed_countries.find((scope) => isEqual(scope[scopeName], employeeScope)));
  return hasValidScope;
};

export const isMulticompanyUser = () => isEqual(getItemFromLocalStorage(LOCAL_STORAGE_NAMES.isMulticompany), true);
