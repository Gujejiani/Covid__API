class HeaderView {
  #confirmed = document.querySelector(".total__info__cases--confirmed");
  #critical = document.querySelector(".total__info__cases--critical");
  #deaths = document.querySelector(".total__info__cases--deaths");
  #recovered = document.querySelector(".total__info__cases--recovered");

  renderHeaderData(data) {
    if (!data[0]) return;
    const { confirmed, critical, deaths, recovered } = data[0];
    this.#confirmed.innerHTML = confirmed;
    this.#critical.innerHTML = critical;
    this.#deaths.innerHTML = deaths;
    this.#recovered.innerHTML = recovered;
  }
}

export default new HeaderView();
