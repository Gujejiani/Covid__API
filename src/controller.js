"use strict";

import * as model from "./model.js";
import HeaderView from "./view/headerView.js";
import tableView from "./view/tableView.js";
import favouriteView from "./view/favouriteView.js";
import countryModalView from "./view/modalView.js";
const loadCovidData = async function () {
  const favourites = model.getfavouritesFromLocalStorage()
    ? model.getfavouritesFromLocalStorage()
    : [];
  await model.getCovidData();

  console.log(favourites);
  // 1) render header data fields
  HeaderView.renderHeaderData(model.state.covidTotal);

  // 2) sorting countries by countries alphabet
  sortCovidDataByCountries(model.state.covidStatistic);

  // 3) storing favourites data from local storage
  model.storeDataFromLocalStorageToFavourites(favourites);

  //4) render countries in the table
  renderTable();

  //update favourites UI if there are counties
  if (model.state.favourites.length > 0) {
    favouriteView.clearFavEmptyMessage();
    model.state.favourites.map((country) => {
      favouriteView.render(country);
    });
  }
};

loadCovidData();

const controApplication = function (e) {
  const el = e.target;

  //1) show favourites section on  dropdown click

  if (el.closest("th") && el.closest("th").classList.contains("fav")) {
    favouriteView.toggleModal();
  }

  //2) add to favourites and remove
  if (el.classList.contains("fa-star")) {
    // 1) handle favourites save and remove
    const el = e.target;
    const country = el.dataset.id;
    model.addAndRemoveFromFavouritesArray(country);
    //change Star UI logicly
    tableView.favouritesIconClicked(el);

    //when users delets country from favourites
    if (el.closest("th") && el.closest("th").classList.contains("fav")) {
      tableView.removeFavElements(true);
      renderTable();
    }

    favouriteView.removeFavElements(); //removing items fav countries for update
    // 2) add countries to favourites  view
    if (model.state.favourites.length > 0) {
      favouriteView.clearFavEmptyMessage();
      model.state.favourites.map((country) => {
        country.fav = true;
        favouriteView.render(country);
      });
    } else {
      //if fav is empty render default message
      favouriteView.addDefaultMessage();
    }
  }
};

const showModal = async function (e) {
  const el = e.target;
  if (el.classList.contains("container__table__countries")) {
    const country = el.dataset.country; // clicked country Name
    const countryCovidInfo = getCountryCovidInfo(country); // getting country covid info
    model.state.countryDetail = countryCovidInfo; // storing it in seperate object
    const countryInfo = await getCountryInfo(country); // awaiting to deatil info  we need flag and population
    let { population } = countryInfo[0];
    const flag = countryInfo[0]?.flag;

    population = `${(population / 1000000).toFixed(1)} M`;
    model.state.countryDetail.flag = flag;
    model.state.countryDetail.population = population;
    //flag and population added two our more detail object
    // 2) show county modal
    countryModalView.clearModalCounrty();
    countryModalView.render(model.state.countryDetail);

    countryModalView.toggleModal();
  }
};

const modalOverlayHandler = function () {
  countryModalView.hideModal();
};

const favOverlayHandler = function () {
  favouriteView.toggleModal(); //hide favourites and overlay
};
const init = function () {
  tableView.addHandlertomainContainerTable(controApplication);
  favouriteView.addHandlerToFavOverlay(favOverlayHandler);
  countryModalView.addModalToggleHandler(showModal);
  countryModalView.addModalOverlayHandler(modalOverlayHandler);
};
init();

const getCountryCovidInfo = function (country) {
  const countryData = model.state.covidStatistic.find(
    (el) => el.country === country
  );

  return countryData;
};

const sortCovidDataByCountries = function (data) {
  const sorted = data.sort((a, b) => {
    return a.country > b.country ? 1 : -1;
  });

  return sorted;
};

const renderTable = function () {
  model.state.covidStatistic.map((country) => {
    tableView.render(country);
  });
};

const getCountryInfo = function (country) {
  const countryInfo = fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
  return countryInfo;
};
