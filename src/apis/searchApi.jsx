let url = "http://api.dailysportboss.com/carapp/searchSubmit";

class SearchAPI {
  static submitSearch(make, model, location, minPrice, maxPrice, token) {
    if (!location) {
      location = 1;
    }

    if (!minPrice) {
      minPrice = null;
    }

    if (!maxPrice) {
      maxPrice = null;
    }

    const data = `make_id=${encodeURI(make)}&model_id=${encodeURI(
      model
    )}&location_id=${encodeURI(location)}&min_price=${encodeURI(
      minPrice
    )}&max_price=${encodeURI(maxPrice)}`;

    console.log(data);

    return fetch(url, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    });
  }
}

export default SearchAPI;
