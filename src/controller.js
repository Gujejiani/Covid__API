import { getCovidData, state } from "./modal.js";
import HeaderView from "./view/headerView.js";
import TableView from "./view/tableView.js";
import FavouritesView from "./view/favouriteView.js";
import tableView from "./view/tableView.js";
import favouriteView from "./view/favouriteView.js";
const loadCovidData = async function () {
  await getCovidData();

  // 1) render header data fields
  HeaderView.renderHeaderData(state.covidTotal);

  // 2) sorting countries by countries alphabet
  sortCovidDataByCountries(state.covidStatistic);

  //3) render countries in the table
  renderTable();
};

loadCovidData();

const controlFavourites = function (e) {
  const el = e.target;

  //1) show favourites section on  dropdown click
  console.log(el.classList.contains("fa-caret-down"));
  if (el.classList.contains("fa-caret-down")) {
    FavouritesView.toggleDropdown();
  }

  //2) add to favourites and remove
  if (e.target.classList.contains("fa-star")) {
    // 1) handle favourites save and remove
    const el = e.target;
    const country = el.dataset.id;
    addAndRemoveFromFavouritesArray(country);
    //change Star UI logicly
    tableView.favouritesIconClicked(el);

    //when users delets country from favourites
    if (el.closest("th") && el.closest("th").classList.contains("fav")) {
      tableView.removeFavElements();
      renderTable();
    }

    favouriteView.removeFavElements(); //removing items fav countries for update
    // 2) add countries to favourites  view
    if (state.favourites.length > 0) {
      FavouritesView.clearFavEmptyMessage();
      state.favourites.map((country) => {
        country.fav = true;
        FavouritesView.render(country);
      });
    } else {
      //if fav is empty render default message
      favouriteView.addDefaultMessage();
    }
  }
};

const controlMainTable = function (e) {};

const init = function () {
  // FavouritesView.addHandlerToDropdown(controlFavourites);
  tableView.addHandlertomainContainerTable(controlFavourites);
};
init();

const sortCovidDataByCountries = function (data) {
  const sorted = data.sort((a, b) => {
    return a.country > b.country ? 1 : -1;
  });

  return sorted;
};

const renderTable = function () {
  state.covidStatistic.map((country) => {
    TableView.render(country);
  });
};

//checks favorite array and adding country into an array if it not exists in an array and removes if it's already there.
const addAndRemoveFromFavouritesArray = function (country) {
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
    }
  } else {
    state.covidStatistic[stateIndex].fav = false;
    state.favourites[findIndex].fav = false;
    state.favourites.splice(findIndex, 1);
  }
  console.log(state.covidStatistic);
};
