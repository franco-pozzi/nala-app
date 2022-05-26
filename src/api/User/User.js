import {
  API_URL_BASE_RAILS,
  FUNCTIONS_API_URL_BASE,
  headersWithEmail,
} from "../../common/constants";
import { getValidDate, getCryptoConfig } from "../../common/utils";

const User = {
  async addUsers(users) {
    const validDate = getValidDate();

    return fetch(`${FUNCTIONS_API_URL_BASE}/saveUsers`, {
      method: "POST",
      body: JSON.stringify(users),
      headers: {
        "Content-Type": "application/json",
        "date-time": validDate,
        "request-sign": getCryptoConfig(validDate),
      },
    });
  },

  async getUserNames(email) {
    return fetch(`${FUNCTIONS_API_URL_BASE}/getUserNames`, {
      mode: "cors",
      headers: headersWithEmail(email),
    });
  },
  async getUserByCPF(cpf) {
    return fetch(`${FUNCTIONS_API_URL_BASE}/getUserByCPF?CPF=${cpf}`, {
      mode: "cors",
    });
  },
  async getUserByEmail(email) {
    return fetch(`${FUNCTIONS_API_URL_BASE}/getUserByEmail?email=${email}`, {
      mode: "cors",
    });
  },
  async getUserAreas(email) {
    return fetch(`${FUNCTIONS_API_URL_BASE}/getUserAreas`, {
      mode: "cors",
      headers: headersWithEmail(email),
    });
  },
  async getUserSubareas(email) {
    return fetch(`${FUNCTIONS_API_URL_BASE}/getUserSubareas`, {
      mode: "cors",
      headers: headersWithEmail(email),
    });
  },
  async getUserCities(email) {
    return fetch(`${FUNCTIONS_API_URL_BASE}/getUserCities`, {
      mode: "cors",
      headers: headersWithEmail(email),
    });
  },
  async getUserCountries(email) {
    return fetch(`${FUNCTIONS_API_URL_BASE}/getUserCountries`, {
      mode: "cors",
      headers: headersWithEmail(email),
    });
  },
  async getUserDepartments(email) {
    return fetch(`${FUNCTIONS_API_URL_BASE}/getUserDepartments`, {
      mode: "cors",
      headers: headersWithEmail(email),
    });
  },
  async saveUserImage(email, photoURL) {
    return fetch(
      `${FUNCTIONS_API_URL_BASE}/saveUserImage?email=${email}&photoURL=${photoURL}`,
      {
        mode: "cors",
      },
    );
  },
  async getUserPayrollHistory(email) {
    return fetch(
      `${FUNCTIONS_API_URL_BASE}/getUserPayrollHistory?email=${email}`,
      { mode: "cors" },
    );
  },

  async getActiveCandidates() {
    return fetch(`${API_URL_BASE_RAILS}/api/v1/candidates?company_id=1`, {
      mode: "cors",
    });
  },
};

export default User;
