import { getCovidData, state } from "./modal.js";
import HeaderView from "./view/headerView.js";

const loadCovidData = async function () {
  await getCovidData();

  //rended header data fields
  const { covidTotal } = state;
  HeaderView.renderHeaderData(covidTotal);
};

loadCovidData();
