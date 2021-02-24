import { getCovidData, state } from "./modal.js";
import HeaderView from "./view/headerView.js";
import TableView from "./view/tableView.js";
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

const sortCovidDataByCountries = function (data) {
  const sorted = data.sort((a, b) => {
    return a.country > b.country ? 1 : -1;
  });

  return sorted;
};
