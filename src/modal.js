import { covidStatistic, covidTotal } from "./config.js";
import { CovidDataGetJSON } from "./helper.js/helper.js";

export const state = {
  favourites: [],
};

export const getCovidData = async function () {
  try {
    // using Promise All to improve the time of performance and to send two API request simultaneously
    await Promise.all([
      CovidDataGetJSON(covidStatistic.url, covidStatistic.host),
      CovidDataGetJSON(covidTotal.url, covidTotal.host),
    ]).then((resultArr) => {
      state.covidStatistic = resultArr[0].result;
      state.covidTotal = resultArr[1] ?? [];
      console.log(state);
    });
  } catch (err) {
    console.log(err);
  }
};
