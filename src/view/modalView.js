import View from "./View.js";

class ModalView extends View {
  _parentElement = document.querySelector(".modal");
  _overlay = document.querySelector(".modal__overlay");
  _container = document.querySelector(".container");
  _toggleElement = document.querySelector(".modal");
  _tableContainerClear = document.querySelector(".modal__overlay");

  constructor() {
    super();
  }

  hideModal() {
    this._toggleModal();
    this.clearModalCounrty();
    this.toggleOverlay();
  }
  _toggleModal() {
    this._toggleElement.classList.toggle("show");
  }

  clearModalCounrty() {
    const countyModal = document.querySelector(".modal__container");
    countyModal ? countyModal.remove() : "";
  }

  addModalOverlayHandler(handler) {
    this._overlay.addEventListener("click", handler);
  }
  addModalToggleHandler(handler) {
    this._container.addEventListener("click", handler);
  }

  toggleOverlay() {
    this._overlay.classList.toggle("overlay__show");
  }

  generateMarkup(data) {
    const flag = data?.flag;
    const country = data?.country;
    const population = this._dataCheck(data?.population);
    const newCases = parseFloat(this._dataCheck(data?.newCases));
    const newDeaths = parseInt(this._dataCheck(data?.newDeaths));
    const totalCases = this._dataCheck(data?.totalCases);
    const totalDeaths = this._dataCheck(data?.totalDeaths);
    const totalRecovered = this._dataCheck(data?.totalRecovered);

    const markup = `
    <div class="modal__container">
    <img
    class="modal__container__img"  src="${flag}"
    alt="country flag"
  />
  <ul class="modal__container__list">
    <li  class="modal__container__list__li modal__container__list__li--country" >${country} </li>
   <li class="modal__container__list__li modal__container__list__li--population" >population: 👫 ${population}</li>
  <li class="modal__container__list__li"> New Cases:  <span class="modal__container__list__li${
    newCases > 0 ? "--new" : ""
  }"> ${newCases > 0 ? "+ " + newCases : newCases}</span></li>
    <li class="modal__container__list__li">New Deaths:  <span class="modal__container__list__li${
      newDeaths > 0 ? "--new" : ""
    }">  ${newDeaths} </span></li>
    <li class="modal__container__list__li">Total Cases:  ${totalCases}</li>
    <li class="modal__container__list__li">Total Deaths:  ${totalDeaths}</li>
    <li class="modal__container__list__li ">Total Recovered: <span class="${
      parseInt(totalRecovered) > 0
        ? "modal__container__list__li--recovered"
        : ""
    } "  >   ${totalRecovered}  </span> </li>
  </ul>
  </div>
      `;
    return markup;
  }
  _dataCheck(data) {
    return data ? data : 0;
  }
}

export default new ModalView();
