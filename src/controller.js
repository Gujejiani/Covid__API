import { getCovidData, state } from "./modal.js";
import HeaderView from "./view/headerView.js";
import TableView from "./view/tableView.js";
import FavouritesView from "./view/favouriteView.js";
import tableView from "./view/tableView.js";
import favouriteView from "./view/favouriteView.js";
import countryModalView from "./view/modalView.js";
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

const controApplication = function (e) {
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
      tableView.removeFavElements(true);
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
  console.log(el.classList.contains("container__table__countries"));
  console.log(el);
};
const showModal = async function (e) {
  const el = e.target;
  if (el.classList.contains("container__table__countries")) {
    const country = el.dataset.country; // clicked country Name
    const countryCovidInfo = getCountryCovidInfo(country); // getting country covid info
    state.countryDetail = countryCovidInfo; // storing it in seperate object
    const countryInfo = await getCountryInfo(country); // awaiting to deatil info  we need flag and population
    let { flag, population } = countryInfo[0];
    population = `${(population / 1000000).toFixed(1)} M`;
    state.countryDetail.flag = flag;
    state.countryDetail.population = population;
    //flag and population added two our more detail object

    // 2) show county modal
    countryModalView.render(state.countryDetail);
    countryModalView.toggleModal();
  }
};

const modalOverlayHandler = function () {
  console.log("modalCliccked");
  countryModalView.hideModal();
};
const init = function () {
  // FavouritesView.addHandlerToDropdown(controApplication);
  tableView.addHandlertomainContainerTable(controApplication);
  countryModalView.addModalToggleHandler(showModal);
  countryModalView.addModalOverlayHandler(modalOverlayHandler);
};
init();

const getCountryCovidInfo = function (country) {
  const countryData = state.covidStatistic.find((el) => el.country === country);

  console.log(countryData);
  return countryData;
};

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
