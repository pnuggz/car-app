class MakesAPI {
  static getMakes(token) {
    const url = `http://api.dailysportboss.com/carapp/makes`;
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: token
      }
    });
  }
}

export default MakesAPI;
