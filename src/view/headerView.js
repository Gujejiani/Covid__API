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
    this._confirmed.innerHTML = (+confirmed / 1000000).toFixed(3) + ' m';
    this._critical.innerHTML = (+critical / 1000000).toFixed(3) + ' m';
    this._deaths.innerHTML = (+deaths / 1000000).toFixed(3) + ' m';
    this._recovered.innerHTML = (+recovered / 1000000).toFixed(3) + ' m';
  }
  removeHeaderSpinners() {
    this._headerSpinners.forEach((spinner) => {
      spinner.remove();
    });
  }
}

export default new HeaderView();
