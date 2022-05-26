//  NOTE: all commented code will be used as the refactor progresses
import axios from "axios";
import i18n from "i18next";
import { isUndefined } from "common/helpers";

// import {
//   // TOKEN_KEY, TOKEN_STRING,
// } from "../config";
import {
  API_URL_RAILS_V1,
  LOCAL_STORAGE_NAMES,
  LANGUAGES,
} from "common/constants";
import {
  getItemFromLocalStorage,
  getValidDate,
  getCryptoConfig,
  setInLocalStorageAsync,
} from "common/utils";

// const TOKEN = localStorage.getItem(TOKEN_KEY);
const baseURL = API_URL_RAILS_V1; //  FIXME: we should use a proxy

// BIGNOTE: deleteItem from orgUnitsActions is beeing used as old arch.

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// if (TOKEN) {
//   instance.defaults.headers.common.Authorization = TOKEN_STRING + TOKEN;
// } else {
instance.interceptors.request.use((config) => {
  const validDate = getValidDate();
  const { params, headers } = config;
  const locale = i18n.language === LANGUAGES.pr ? LANGUAGES.pt : i18n.language;
  const accessToken = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.accessToken);
  const client = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.client);
  const uid = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.uid);
  const user = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user);

  const formattedConfig = {
    ...config,
    params: {
      ...params,
      locale,
    },
    headers: {
      ...headers,
      "date-time": validDate,
      "request-sign": getCryptoConfig(validDate),
      "access-token": accessToken,
      client,
      uid,
    },
  };

  if (user?.companies && isUndefined(user?.company?.is_main)) {
    formattedConfig.params.company_id = user?.company_id;
  }

  return formattedConfig;
});

instance.interceptors.response.use(async (response) => {
  if (response.headers["access-token"]) {
    setInLocalStorageAsync(LOCAL_STORAGE_NAMES.accessToken, response.headers["access-token"]);
  }
  return response;
});
// }

// export const updateToken = (token) => {
//   instance.defaults.headers.common.Authorization = TOKEN_STRING + token;
//   instance.interceptors.request.use((config) => {
//     return config;
//   });
// };

export default instance;
