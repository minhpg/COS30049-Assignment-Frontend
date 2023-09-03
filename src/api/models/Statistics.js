import { makeRequest } from "../api";
import { mergeResult } from "../utils";

// Importing JSON data for the purpose of portability
import response from "../data/yearly-volume.json";

// Fetching yearly transaction volume
const getYearlyVolume = async (limit) => {
  const query = `MATCH (t:Transaction)
      RETURN t.Datetime_updated.year AS year,
             count(*) AS transactions,
             sum(t.Price_USD) AS totalVolume,
             avg(t.Price_USD) AS averagePrice
      ORDER BY year`;

  const body = {
    statements: [
      {
        statement: query,
      },
    ],
  };

  //   const { errors, results } = await makeRequest(body);

  const { errors, results } = response;

  const results_parsed = [];
  for (const result of results) {
    const first_result = mergeResult(result);
    results_parsed.push(first_result);
  }

  return results_parsed[0];
};

// Fetching daily transaction volume
const getDailyVolume = async (limit) => {
  const query = `MATCH (t:Transaction)
        RETURN t.Datetime_updated.year AS year,
               count(*) AS transactions,
               sum(t.Price_USD) AS totalVolume,
               avg(t.Price_USD) AS averagePrice
        ORDER BY year`;

  const body = {
    statements: [
      {
        statement: query,
      },
    ],
  };

  //   const { errors, results } = await makeRequest(body);

  const { errors, results } = response;

  const results_parsed = [];
  for (const result of results) {
    const first_result = mergeResult(result);
    results_parsed.push(first_result);
  }

  return results_parsed[0];
};

export { getYearlyVolume, getDailyVolume };
