class RunningSearchAPI {
  static getRunningSearch(token) {
    const url = `http://api.dailysportboss.com/carapp/search`;
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: token
      }
    });
  }
}

export default RunningSearchAPI;
