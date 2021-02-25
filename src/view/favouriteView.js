import View from "./View.js";

class Favourite extends View {
  _parentElement = document.querySelector(".fav__table");

  _dropDown = document.querySelector(".fa-caret-down");
  _dropdownContainer = document.querySelector(".fav__dropdown--hide");

  _favCountryItems = document.querySelectorAll(".container__fav__items");

  _favMessageContainer = document.querySelector(
    ".fav__table__message__parrent"
  );
  constructor() {
    super();
  }
  render(data) {
    console.log(this._favCountryItems);

    const markup = this.generateMarkup(data, true);
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  toggleDropdown() {
    this._dropdownContainer.classList.toggle("fav__dropdown--show");
  }

  addHandlerToDropdown(handler) {
    this._dropDown.addEventListener("click", handler);
  }
  addDefaultMessage() {
    const markup = `<div class="fav__table__message">Favourites is Empty</div>`;
    this._favMessageContainer.insertAdjacentHTML("beforeend", markup);
  }
  clearFavEmptyMessage() {
    const message = document.querySelector(".fav__table__message");
    if (!message) return;
    message.remove();
  }
}

export default new Favourite();
