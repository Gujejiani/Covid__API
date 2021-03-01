export default class View {
  _errorContainer = document.querySelector(".container__table");
  render(data) {
    this.clearTableContainer();
    const markup = this.generateMarkup(data);
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  clearTableContainer() {
    this._tableContainerClear ? (this._tableContainerClear.innerHTML = "") : "";
  }
  toggleModal() {
    this._toggleModal();
  }

  _toggleModal() {
    this._overlay.classList.toggle("overlay__show");
    this._toggleElement.classList.toggle("show");
  }

  generateMarkup(data, fav = false) {
    if (data.country === "All") return "";
    const markup = `<ul  data-country="${data.country}" class=" country__info ${
      fav ? "container__fav__items" : "container__table__items"
    }">
    <li  class="container__table__items__countries" >${data?.country}</li>
    <li class="container__table__items__total">${data?.totalCases}</li>
    <li class="${
      parseInt(data?.newCases) > 0
        ? "container__table__items__new"
        : "container__table__items__new--null"
    } ${
      fav && !data?.newCases ? "fav-dropdown__container__table__new--null" : ""
    }"> ${data?.newCases ? data?.newCases : 0}</li>
    <li  ><i  data-id="${data.country}" class=" ${
      data.country.split(" ")[0]
    } fas fa-star container__table__items__star fa-lg ${
      data.fav ? "container__table__items--favourite" : " "
    }"></i>
    </li>
</ul>`;

    return markup;
  }
  renderSpinner() {
    const markup = ` <div class="loader">
        <div class="wrapper">
          <div class="loader__img__parent">
            <img
              width="35px"
              class="loader__logo"
              src="./img/Group 15.svg"
              alt="logo__loader"
            />
          </div>
          <div class="dots__parent">
            <span class="dot dot--1"></span>
            <span class="dot dot--2"></span>
            <span class="dot dot--3"></span>
          </div>
        </div>
      </div>`;

    this._tableContainerClear.insertAdjacentHTML("beforeend", markup);
  }
  removeFavElements(tableView) {
    !tableView
      ? (this.favCountryItems = document.querySelectorAll(
          ".container__fav__items"
        ))
      : (this.favCountryItems = document.querySelectorAll(
          ".container__table__items"
        )); // tr elements;; // tr elements;
    this.favCountryItems.forEach((el) => {
      if (el) {
        el.remove();
      }
    });
  }

  renderErrorMessage(message = "can not fetch data, please come back later") {
    const markup = `<div class="error">
    <h3 class="error__message">
      ${message} 😞😞
    </h3>
  </div>
    `;
    this._errorContainer.insertAdjacentHTML("beforeend", markup);
    const error = document.querySelector(".error");
    error.classList.add("show");
  }
}
