class ModelsAPI {
  static getModels(token) {
    const url = `http://api.dailysportboss.com/carapp/models`;
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: token
      }
    });
  }
}

export default ModelsAPI;
