import { setClient } from "../../actions/client";

function checkAuthorization(dispatch) {
  const userInfo = sessionStorage.getItem("userInfo");
  const storedToken = userInfo.token;
  console.log("test");
  if (storedToken) {
    const token = JSON.parse(storedToken);

    const createdDate = new Date(token.created);
    const created = Math.round(createdDate.getTime() / 1000);
    const ttl = 1209600;
    const expiry = created + ttl;

    if (created > expiry) return false;

    dispatch(setClient(token));
    return true;
  }

  return false;
}

export function checkIndexAuthorization({ dispatch }) {
  console.log("checkAuthorization success");
  return (nextState, replace, next) => {
    console.log("checkAuthorization success");
    if (checkAuthorization(dispatch)) {
      replace("landing");

      return next();
    }

    replace("login");
    return next();
  };
}

export function checkAppAuthorization({ dispatch, getState }) {
  console.log("checkAuthorization success");
  return (nextState, replace, next) => {
    const client = getState().client;

    if (client && client.token) return next();

    if (checkAuthorization(dispatch)) return next();

    if (checkAuthorization(dispatch)) {
      replace("landing");

      return next();
    }

    replace("login");
    return next();
  };
}
