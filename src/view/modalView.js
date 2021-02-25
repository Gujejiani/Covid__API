import View from "./View.js";

class modalView extends View {
  _parentElement = document.querySelector(".modal");
  //   _modal = document.querySelector(".modal");
  _overlay = document.querySelector(".modal__overlay");
  _container = document.querySelector(".container");

  constructor() {
    super();
  }

  toggleModal() {
    //should be showModal
    this._toggleModal();
  }

  hideModal() {
    this._toggleModal();
    this._clearModalCounrty();
  }

  _toggleModal() {
    this._overlay.classList.toggle("overlay__show");
    this._parentElement.classList.toggle("show");
  }

  _clearModalCounrty() {
    const countyModal = document.querySelector(".modal__container");
    countyModal ? countyModal.remove() : "";
  }

  addModalOverlayHandler(handler) {
    this._overlay.addEventListener("click", handler);
  }
  addModalToggleHandler(handler) {
    this._container.addEventListener("click", handler);
  }

  generateMarkup(data) {
    const flag = data?.flag;
    const country = data?.country;
    const population = this._dataCheck(data?.population);
    const newCases = parseInt(this._dataCheck(data?.newCases));
    const newDeaths = parseInt(this._dataCheck(data?.newDeaths));
    const totalCases = this._dataCheck(data?.totalCases);
    const totalDeaths = this._dataCheck(data?.totalDeaths);
    const totalRecovered = this._dataCheck(data?.totalRecovered);

    const markup = `
    <div class="modal__container">
    <img
    class="modal__container__img"  src="${flag}"
    alt="country"
  />
  <ul class="modal__container__list">
    <li
      class="modal__container__list__li modal__container__list__li--country"
    >
      ${country}
    </li>
    <li
      class="modal__container__list__li modal__container__list__li--population"
    >
      👫 population: ${population}
    </li>
    <li class="modal__container__list__li">
      New Cases: 
      <span class="modal__container__list__li${
        newCases > 0 ? "--new" : ""
      }"> ${newCases}</span>
    </li>
    <li class="modal__container__list__li">New Deaths:  <span class="modal__container__list__li${
      newDeaths > 0 ? "--new" : ""
    }">  ${newDeaths} </span></li>
    <li class="modal__container__list__li">Total Cases:  ${totalCases}</li>
    <li class="modal__container__list__li">Total Deaths:  ${totalDeaths}</li>
    <li class="modal__container__list__li">Total Recovered: ${totalRecovered}</li>
  </ul>
  </div>
      `;
    return markup;
  }
  _dataCheck(data) {
    return data ? data : 0;
  }
}

export default new modalView();
