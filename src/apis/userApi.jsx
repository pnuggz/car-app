console.log("draftPlayersApi");
class UserAPI {
  static getUser(token) {
    const url = `http://api.dailysportboss.com/users`;
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: token
      }
    });
  }
}

export default UserAPI;
