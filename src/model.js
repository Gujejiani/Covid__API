import { covidStatistic, covidTotal, key } from "./config.js";
import { GetJSON } from "./helper.js/helper.js";

export const state = {
  favourites: [],
  countryDetail: {},
};

export const getCovidData = async function () {
  try {
    // using Promise All to improve the time of performance and to send two API request simultaneously
    await Promise.all([
      GetJSON(covidStatistic.url, covidStatistic.host, key),
      GetJSON(covidTotal.url, covidTotal.host, key),
    ]).then((resultArr) => {
      if (!resultArr) return new Error("error accured");
      state.covidStatistic = resultArr[0].result;
      state.covidTotal = resultArr[1] ?? [];
    });
  } catch (err) {
    throw err;
  }
};

//checks favorite array and adding country into an array if it not exists in an array and removes if it's already there.
export const addAndRemoveFromFavouritesArray = function (country) {
  const findIndex = state.favourites.findIndex((el) => el.country === country);
  const stateIndex = state.covidStatistic.findIndex(
    (el) => el.country === country
  );
  if (findIndex < 0) {
    const favCountry = state.covidStatistic.find((el) => {
      return el.country === country;
    });
    if (favCountry) {
      state.covidStatistic[stateIndex].fav = true;
      state.favourites.push(favCountry);
      saveFavouritesToLocalStorage();
    }
  } else {
    state.covidStatistic[stateIndex].fav = false;
    state.favourites[findIndex].fav = false;
    state.favourites.splice(findIndex, 1);
    saveFavouritesToLocalStorage();
  }
};
export const saveFavouritesToLocalStorage = function () {
  localStorage.setItem("favourites", JSON.stringify(state.favourites));
};

export const getfavouritesFromLocalStorage = function () {
  const fav = JSON.parse(localStorage.getItem("favourites"));
  return fav;
};

//flag and population added two our conutryDetail object
export const addFlagAndPopulationTostate = function (countryInfo) {
  const flag = countryInfo[0]?.flag ?? "";
  let population = countryInfo[0]?.population ?? "0";
  population = `${(population / 1000000).toFixed(1)} m`;
  state.countryDetail.flag = flag;
  state.countryDetail.population = population;
};

export const storeDataFromLocalStorageToFavourites = function (favourites) {
  favourites.forEach((fav) => {
    state.covidStatistic.find((el) => {
      if (el.country === fav.country) {
        state.favourites.push(el);
        el.fav = true;
      }
    });
  });
};
