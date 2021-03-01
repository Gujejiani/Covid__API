import View from "./View.js";

class SearchView extends View {
  _searchInput = document.querySelector(".search__input");
  _searchIcon = document.querySelector(".search__icon");
  constructor() {
    super();
  }

  toggleSearch() {
    this._searchInput.classList.toggle("show");
    this._searchInput.focus();
  }

  addTogleSearchHandler(handler) {
    this._searchIcon.addEventListener("click", handler);
  }

  addSearchHandler(handler, blurHandler) {
    this._searchInput.addEventListener("input", handler);
  }
}

export default new SearchView();
