import { useState, useEffect } from "react";
// Api Serverless
import { AnalyticsAPI } from "../api";

export const useAnalyticsData = (filters, userEmail) => {
  const [data, setData] = useState({ chartsData: [] });

  useEffect(() => {
    if (filters && typeof (filters) !== "undefined" && filters !== "") {
      setData({ chartsData: [] });
    }
    const getMonthName = (month_number) => {
      const monthNumber = parseInt(month_number);
      const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December",
      ];
      return months.find((month, index) => (index + 1 === monthNumber ? monthNumber : ""));
    };

    // ---> Refactor
    const getFlatCTC = async () => {
      const data = await AnalyticsAPI.getFlatCTC(userEmail, filters);
      const response = await data.text();
      return await JSON.parse(response);
    };

    getFlatCTC().then(async (response) => {
      await setData((prevState) => ({
        chartsData: [...prevState.chartsData,
          {
            title: "FLAT PAYROLL EVOLUTION",
            labels: response.flatCTC.map((month) => getMonthName(month.month)),
            data: response.flatCTC.map((ctc) => ctc.ctc),
          },
        ],
      }));
    }).catch((error) => console.log(error));

    const getCTCMonth = async () => {
      const data = await AnalyticsAPI.getCTCMonth(userEmail, filters);
      const response = await data.text();
      return await JSON.parse(response);
    };

    getCTCMonth().then(async (response) => {
      await setData((prevState) => ({
        chartsData: [...prevState.chartsData,
          {
            title: "P&A PAYROLL EVOLUTION",
            labels: response.CTCMonth.map((month) => getMonthName(month.month)),
            data: response.CTCMonth.map((ctc) => ctc.ctc),
          },
        ],
      }));
    }).catch((error) => console.log(error));

    const getHCEvolution = async () => {
      const data = await AnalyticsAPI.getHCEvolution(userEmail, filters);
      const response = await data.text();
      return await JSON.parse(response);
    };

    getHCEvolution().then(async (response) => {
      await setData((prevState) => ({
        chartsData: [...prevState.chartsData,
          {
            title: "HC EVOLUTION",
            labels: response.hcEvolution.map((month) => getMonthName(month.month)),
            data: response.hcEvolution.map((ctc) => ctc.ctc),
          },
        ],
      }));
    }).catch((error) => console.log(error));

    Promise.all([getFlatCTC, getCTCMonth, getHCEvolution]);
  }, [filters, userEmail]);

  return [data, setData];
};
