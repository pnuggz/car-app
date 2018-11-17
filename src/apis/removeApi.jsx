class RemoveAPI {
  static removeSearch(searchid, token) {
    console.log(searchid);
    const url = `http://api.dailysportboss.com/carapp/removesearch/${searchid}`;
    return fetch(url, {
      method: "POST",
      headers: {
        Authorization: token
      }
    });
  }
}

export default RemoveAPI;
