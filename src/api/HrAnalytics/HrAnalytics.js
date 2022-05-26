import {
  FUNCTIONS_API_URL_BASE,
  headersWithEmail,
} from "../../common/constants";

let query = "";

function addFilterBy(filterBy, filter, index) {
  if (filter) {
    index > 0
      ? (query += `&${filterBy}=${filter.id}`)
      : (query = `&${filterBy}=${filter.id}`);
  }
}

const HrAnalytics = {
  async getFlatCTC(email, filters) {
    query = "";
    if (filters && typeof filters !== "undefined" && filters !== "") {
      query = this.formatQuery(filters);
    }
    return fetch(`${FUNCTIONS_API_URL_BASE}/getFlatCTC?filters=${query}`, {
      mode: "cors",
      headers: headersWithEmail(email),
    });
  },
  async getCTCMonth(email, filters) {
    query = "";
    if (filters && typeof filters !== "undefined" && filters !== "") {
      query = this.formatQuery(filters);
    }
    return fetch(`${FUNCTIONS_API_URL_BASE}/getCTCMonth?filters=${query}`, {
      mode: "cors",
      headers: headersWithEmail(email),
    });
  },
  async getHCEvolution(email, filters) {
    query = "";

    if (filters && typeof filters !== "undefined" && filters !== "") {
      query = this.formatQuery(filters);
    }
    return fetch(`${FUNCTIONS_API_URL_BASE}/getHCEvolution?filters=${query}`, {
      mode: "cors",
      headers: headersWithEmail(email),
    });
  },
  formatQuery(filters) {
    filters.forEach((filter, index) => {
      addFilterBy(filter.tag, filter, index);
    });

    return query;
  },
};

export default HrAnalytics;
