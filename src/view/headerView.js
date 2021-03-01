class HeaderView {
  _confirmed = document.querySelector(
    ".total-info__cases__quantity--confirmed"
  );
  _critical = document.querySelector(".total-info__cases__quantity--critical");
  _deaths = document.querySelector(".total-info__cases__quantity--deaths");
  _recovered = document.querySelector(
    ".total-info__cases__quantity--recovered"
  );
  _headerSpinners = document.querySelectorAll(
    ".total-info__cases__loader--show"
  );
  renderHeaderData(data) {
    if (!data) return;

    const { confirmed, critical, deaths, recovered } = data[0];
    this._confirmed.innerHTML = confirmed;
    this._critical.innerHTML = critical;
    this._deaths.innerHTML = deaths;
    this._recovered.innerHTML = recovered;
  }
  removeHeaderSpinners() {
    this._headerSpinners.forEach((spinner) => {
      spinner.remove();
    });
  }
}

export default new HeaderView();
