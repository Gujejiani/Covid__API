import { covidStatistic, covidTotal } from "./config.js";
import { CovidDataGetJSON } from "./helper.js/helper.js";

export const state = {
  favourites: [],
  countryDetail: {},
};

export const getCovidData = async function () {
  try {
    // using Promise All to improve the time of performance and to send two API request simultaneously
    await Promise.all([
      CovidDataGetJSON(covidStatistic.url, covidStatistic.host),
      CovidDataGetJSON(covidTotal.url, covidTotal.host),
    ]).then((resultArr) => {
      console.log(state);
      state.covidStatistic = resultArr[0].result;
      state.covidTotal = resultArr[1] ?? [];
      console.log(state);
    });
  } catch (err) {
    console.log(err);
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
  console.log("favourite saved");
  localStorage.setItem("favourites", JSON.stringify(state.favourites));
};

export const getfavouritesFromLocalStorage = function () {
  const fav = JSON.parse(localStorage.getItem("favourites"));
  return fav;
};

export const storeDataFromLocalStorageToFavourites = function (favourites) {
  state.favourites = favourites;

  favourites.forEach((fav) => {
    state.covidStatistic.find((el) => {
      if (el.country === fav.country) {
        el.fav = true;
      }
    });
  });
};
