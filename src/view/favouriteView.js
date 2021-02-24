import View from "./View.js";

class Favourite extends View {
  _parentElement = document.querySelector(".fav__table");
  _tableContainerClear = document.querySelector(".fav__items");
  _dropDown = document.querySelector(".fa-caret-down");
  _dropdownContainer = document.querySelector(".fav__dropdown--hide");
  constructor() {
    super();
  }
  toggleDropdown() {
    this._dropdownContainer.classList.toggle("fav__dropdown--show");
  }

  addHandlerToDropdown(handler) {
    this._dropDown.addEventListener("click", handler);
  }
}

export default new Favourite();
