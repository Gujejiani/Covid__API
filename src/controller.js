import { getCovidData, state } from "./modal.js";
import HeaderView from "./view/headerView.js";
import TableView from "./view/tableView.js";
import FavouritesView from "./view/favouriteView.js";
import tableView from "./view/tableView.js";
const loadCovidData = async function () {
  await getCovidData();
  const { covidTotal, covidInfo } = state;

  // 2) render header data fields
  HeaderView.renderHeaderData(covidTotal);

  // 3) sorting countries by countries alphabet
  const sorted = sortCovidDataByCountries(state.covidInfo);
  console.log(sorted);
  //render countries in the table
  covidInfo.map((country) => {
    TableView.render(country);
  });
};

loadCovidData();

const controlFavourites = function () {
  //1) show favourites section
  FavouritesView.toggleDropdown();
  console.log("favourites");
};

const controlMainTable = function (e) {
  // 1) handle favourites

  if (e.target.classList.contains("fa-star")) {
    const el = e.target;
    const country = el.dataset.id;

    addAndRemoveFromFavouritesArray(country);
    console.log(state.favourites);
    tableView.favouritesIconClicked(el);
  }
};

const init = function () {
  FavouritesView.addHandlerToDropdown(controlFavourites);
  tableView.addHandlertomainContainerTable(controlMainTable);
};
init();

const sortCovidDataByCountries = function (data) {
  const sorted = data.sort((a, b) => {
    return a.country > b.country ? 1 : -1;
  });

  return sorted;
};

const addAndRemoveFromFavouritesArray = function (country) {
  const findIndex = state.favourites.findIndex((el) => el.country === country);

  if (findIndex < 0) {
    const favCountry = state.covidInfo.find((el) => {
      return el.country === country;
    });
    if (favCountry) {
      state.favourites.push(favCountry);
    }
  } else {
    state.favourites.splice(findIndex, 1);
  }
};
