import View from "./View.js";

class TableView extends View {
  _parentElement = document.querySelector(".container__table");
  _tableContainerClear = document.querySelector(".container__table__items");
  constructor() {
    super();
    this.renderSpinner();
  }

  favouritesIconClicked(el) {
    el.classList.toggle("container__table__items--favourite");
  }
  addHandlerToMainContainerTable(handler) {
    this._parentElement.addEventListener("click", handler);
    
  }
 
}

export default new TableView();
