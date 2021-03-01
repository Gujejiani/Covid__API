import View from "./View.js";

class Favourite extends View {
  _parentElement = document.querySelector(".fav-dropdown__container__table");
  _dropDown = document.querySelector(".fav");

  _favCountryItems = document.querySelectorAll(".container__fav__items");
  _overlay = document.querySelector(".fav-dropdown__overlay");
  _toggleElement = document.querySelector(".fav-dropdown__container--hide");
  _favMessageContainer = document.querySelector(
    ".fav-dropdown__container__table__titles"
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
    const markup = `<div class="fav-dropdown__container__table__titles__message">Favourites is Empty</div>`;
    this._favMessageContainer.insertAdjacentHTML("beforeend", markup);
  }
  clearFavEmptyMessage() {
    const message = document.querySelector(
      ".fav-dropdown__container__table__titles__message"
    );
    if (!message) return;
    message.remove();
  }
}

export default new Favourite();
