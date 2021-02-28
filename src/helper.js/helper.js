import { DATA__FETCH__TIMEOUT__SEC } from "../config.js";

const responseTimeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! please, try later`));
    }, sec * 1000);
  });
};

export const CovidDataGetJSON = async function (url, host, key) {
  try {
    const realData = fetch(`${url}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": `${key}`,
        "x-rapidapi-host": `${host}`,
      },
    });

    const res = await Promise.race([
      realData,
      responseTimeout(DATA__FETCH__TIMEOUT__SEC), // = 10 sec
    ]); // handling error in case of bad internet connection

    if (!res.ok) throw new Error(`${res.statusText}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
