import { getItemFromLocalStorage } from "common/utils";
import { LOCAL_STORAGE_NAMES } from "common/constants";
export const VERSION = "1.30.0";
export const resetAccessToken = (currentHeaders, accessToken) => {
  const updatedHeader = { ...currentHeaders, "access-token": accessToken };
  const userLS = getItemFromLocalStorage(LOCAL_STORAGE_NAMES.user);
  localStorage.removeItem(LOCAL_STORAGE_NAMES.user);
  delete userLS.sessionCookies;
  userLS.sessionCookies = updatedHeader;
  localStorage.setItem(LOCAL_STORAGE_NAMES.user, JSON.stringify(userLS));
};

// module.export = {
//   TOKEN_KEY: "nalaapp:token", // TODO: implement this latter,
//   TOKEN_STRING: "Bearer ", // TODO: implement this latter (Json Web Token!! :D ),
//   URL_OAUTH: "/oauth/v1", // TODO: implement this latter,
//   URL_BASE: "/api/v1", // TODO: implement this latter,
// };

// NOTE: WE SHOULD USE A PROXY
