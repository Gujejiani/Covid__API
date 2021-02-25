import View from "./View.js";

class SearchView extends View {
  _searchInput = document.querySelector(".search__input");
  _searchIcon = document.querySelector(".search__icon");
  _search;
  constructor() {
    super();
  }

  toggleSearch() {
    this._searchInput.classList.toggle("show");
  }

  addTogleSearchHandler(handler) {
    this._searchIcon.addEventListener("click", handler);
  }

  addSearchHandler(handler) {
    this._searchInput.addEventListener("input", handler);
  }
}

export default new SearchView();
