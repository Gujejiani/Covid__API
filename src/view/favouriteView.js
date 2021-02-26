import View from "./View.js";

class Favourite extends View {
  _parentElement = document.querySelector(".fav__table");
  _dropDown = document.querySelector(".fav");

  _favCountryItems = document.querySelectorAll(".container__fav__items");
  _overlay = document.querySelector(".fav__overlay");
  _toggleElement = document.querySelector(".fav__dropdown--hide");
  _favMessageContainer = document.querySelector(
    ".fav__table__message__parrent"
  );
  constructor() {
    super();
  }
  render(data) {
    const markup = this.generateMarkup(data, true);
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  addHandlerToFavOverlay(handler) {
    this._overlay.addEventListener("click", handler);
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
