"use strict";

import * as model from "./model.js";
import HeaderView from "./view/headerView.js";
import tableView from "./view/tableView.js";
import favouriteView from "./view/favouriteView.js";
import countryModalView from "./view/modalView.js";
import searchView from "./view/searchView.js";
const loadCovidData = async function () {
  try {
    //1) get favourites from local storage
    const favourites = model.getfavouritesFromLocalStorage()
      ? model.getfavouritesFromLocalStorage()
      : [];

    //2)await to covid data
    await model.getCovidData();

    // 3) render header data fields
    HeaderView.renderHeaderData(model.state.covidTotal);

    // 4) sorting countries by countries alphabet
    sortCovidDataByCountries(model.state.covidStatistic);

    // 5) storing favourites data from local storage to our state
    model.storeDataFromLocalStorageToFavourites(favourites);

    //6) render countries in the table
    renderTable();

    //update favourites UI if there are counties
    if (model.state.favourites.length > 0) {
      favouriteView.clearFavEmptyMessage();
      model.state.favourites.map((country) => {
        favouriteView.render(country);
      });
    }
  } catch (err) {
    tableView.renderErrorMessage(err.message);
  }
};
loadCovidData();

const controApplication = function (e) {
  const el = e.target;

  //check if dropdown was clicked
  if (el.closest("li") && el.closest("li").classList.contains("fav")) {
    //1) show favourites section on  dropdown click
    favouriteView.toggleModal();
  }

  //check if star icon is clicked
  if (el.classList.contains("fa-star")) {
    // handle favourites save and remove
    const el = e.target;
    const country = el.dataset.id;
    model.addAndRemoveFromFavouritesArray(country);
    //change Star UI logicly
    tableView.favouritesIconClicked(el);

    //check if user deleted country from favourites
    if (
      el.closest("ul") &&
      el.closest("ul").classList.contains("container__fav__items")
    ) {
      //if so update table ui
      tableView.removeFavElements(true);
      renderTable();
    }

    favouriteView.removeFavElements(); //removing items from fav countries for update

    if (model.state.favourites.length > 0) {
      // 2) add countries to favourites  view if they exist
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

//showing detail info of country with modal window
const showCountyModal = async function (e) {
  try {
    const el = e.target;
    if (
      el.closest("ul") &&
      el.closest("ul").classList.contains("container__table__items") &&
      e.target.nodeName !== "I"
    ) {
      // clicked country Name
      const country = el.closest("ul").dataset.country;
      const countryCovidInfo = getCountryCovidInfo(country); // getting country covid info
      model.state.countryDetail = countryCovidInfo; // storing it in seperate object in our state
      const countryInfo = await getCountryInfo(country); // awaiting to deatil info  we need flag and population
      const flag = countryInfo[0]?.flag ?? "";
      let population = countryInfo[0]?.population ?? "0";
      population = `${(population / 1000000).toFixed(1)} m`;
      model.state.countryDetail.flag = flag;
      model.state.countryDetail.population = population;
      //flag and population added two our more detail object
      // 1) clear county modal
      countryModalView.clearModalCounrty();
      // 2) show county modal
      countryModalView.render(model.state.countryDetail);
      // 3) showing modal
      countryModalView.toggleModal();
    }
  } catch (err) {
    console.log(err);
  }
};

const modalOverlayHandler = function () {
  countryModalView.hideModal();
};

const favOverlayHandler = function () {
  favouriteView.toggleModal(); //hide favourites and overlay
};

const searchControler = function (e) {
  const searching = "" + e.target.value;
  const searched = model.state.covidStatistic.filter((el) =>
    el.country.toUpperCase().includes(searching.toUpperCase())
  );
  tableView.removeFavElements(true); //

  searched.map((country) => {
    tableView.render(country);
  });
};

const showSearch = function () {
  searchView.toggleSearch();
};

const init = function () {
  tableView.addHandlertomainContainerTable(controApplication);
  favouriteView.addHandlerToFavOverlay(favOverlayHandler);
  countryModalView.addModalToggleHandler(showCountyModal);
  countryModalView.addModalOverlayHandler(modalOverlayHandler);
  searchView.addSearchHandler(searchControler);
  searchView.addTogleSearchHandler(showSearch);
};
init();

const getCountryCovidInfo = function (country) {
  const countryData = model.state.covidStatistic.find(
    (el) => el.country === country
  );

  return countryData;
};

const sortCovidDataByCountries = function (data) {
  if (!data) return [];
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
