export default class View {
  render(data) {
    this.clearTableContainer();
    const markup = this.generateMarkup(data);
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  clearTableContainer() {
    this._tableContainerClear.innerHTML = "";
  }

  generateMarkup(data, fav = false) {
    if (data.country === "All") return "";
    const markup = `
    <tr class="container__table__items ${fav ? "container__fav__items" : ""}">
    <td data-country=${data.country} class="container__table__countries ${
      fav ? "container__table__items__fav__countries" : ""
    }">${data.country}</td>
    <td class="container__table__total">${data?.totalCases}</td>
    <td class="${
      parseInt(data?.newCases) > 0
        ? "container__table__new"
        : "container__table__new--null"
    } ${fav ? "fav__table__new--null" : null}">
       ${data?.newCases ? data?.newCases : 0}
      <span
      
        class="container__table__new__star container__table__new--favourite  " 
        
        ><i  data-id="${data.country}" class="fas fa-star fa-lg ${
      data.fav ? "favourite" : ""
    }"></i>
      </span>
    </td>
    </tr>`;

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
}
