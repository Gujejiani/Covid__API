"use strict";

import * as model from "./model.js";
import HeaderView from "./view/headerView.js";
import tableView from "./view/tableView.js";
import favouriteView from "./view/favouriteView.js";
import countryModalView from "./view/modalView.js";
import searchView from "./view/searchView.js";
import { GetJSON } from "./helper.js/helper.js";

const loadCovidData = async function () {
  try {
    //1) get favourites from local storage
    const favourites = model.getfavouritesFromLocalStorage()
      ? model.getfavouritesFromLocalStorage()
      : [];

    //2)await to covid data
    await model.getCovidData();
    if (model.state.covidStatistic) {
      //checking if data received successfully to avoid errors if some problem occurred while fetching

      // 3)remove spinners and render header data fields
      HeaderView.removeHeaderSpinners();
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
    }
  } catch (err) {
    tableView.renderErrorMessage(err);
  }
};
loadCovidData();

const countyApplication = function (e) {
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
    favouriteView.removeFavElements(); //removing items from fav countries for update
    //check if user deleted country from favourites
    if (
      el.closest("ul") &&
      el.closest("ul").classList.contains("container__fav__items")
    ) {
      const favCountryOnTable = document.querySelector(
        `.${country.split(" ")[0]}` //getting current star by country name
      );
      tableView.favouritesIconClicked(favCountryOnTable); // and updaiting main table UI
    }

    //sort favourites by alphhabet
    model.state.favourites = sortCovidDataByCountries(model.state.favourites);
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
const showCountryModal = async function (e) {
  try {
    const el = e.target;
    if (
      el.closest("ul") &&
      el.closest("ul").classList.contains("country__info") &&
      e.target.nodeName !== "I"
    ) {
      //show overlay
      countryModalView.toggleOverlay();
      countryModalView.renderSpinner();
      // clicked country Name
      const country = el.closest("ul").dataset.country;
      const countryCovidInfo = getCountryCovidInfo(country); // getting country covid info
      model.state.countryDetail = countryCovidInfo; // storing it in separate object in our state

      const countryInfo = await GetJSON(
        "https://restcountries.eu/rest/v2/name/",
        country
      ); // awaiting to detail info  we need flag and population

      if (!countryInfo) return;
      if (countryInfo) model.addFlagAndPopulationTostate(countryInfo);
      // 1) clear county modal
      countryModalView.clearModalCounrty();
      // 2) put data to country modal
      countryModalView.render(model.state.countryDetail);
      // 3) showing modal
      const modalImg = document.querySelector(".modal__container__img");
      console.log(model.state.countryDetail);

      if (model.state.countryDetail.flag) {
        modalImg.addEventListener("load", function () {
          countryModalView.toggleModal(); // shows only modal
        });
      } else {
        countryModalView.toggleModal(); // shows only modal
      }
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

const searchController = function (e) {
  const searching = "" + e.target.value;
  const searched = model.state.covidStatistic.filter((el) =>
    el.country.toUpperCase().includes(searching.toUpperCase())
  );

  tableView.removeFavElements(true); // with true argument we are removing items from the main table

  searched.map((country) => {
    tableView.render(country); //rendering searched results
  });
};

const showSearch = function () {
  searchView.toggleSearch();
};

const init = function () {
  tableView.addHandlerToMainContainerTable(countyApplication);
  favouriteView.addHandlerToFavOverlay(favOverlayHandler);
  countryModalView.addModalToggleHandler(showCountryModal);
  countryModalView.addModalOverlayHandler(modalOverlayHandler);
  searchView.addSearchHandler(searchController);
  searchView.addToggleSearchHandler(showSearch);
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
