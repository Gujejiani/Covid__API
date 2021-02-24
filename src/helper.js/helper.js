export const CovidDataGetJSON = async function (url, host) {
  try {
    const res = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "bfb310fa81msh4e2b960be765a7bp136cc2jsn98d34540b241",
        "x-rapidapi-host": `${host}`,
      },
    });
    const data = res.json();

    if (!res.ok) throw new Error(`${res.message}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
