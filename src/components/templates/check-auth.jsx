import { setClient } from "../../actions/client";

export default function checkAuthorization() {
  const userInfo = sessionStorage.getItem("userInfo");
  const jsonUserInfo = JSON.parse(userInfo);

  if (userInfo) {
    const token = jsonUserInfo.token;
    const createdDate = new Date(token.created);
    const created = Math.round(createdDate.getTime() / 1000);
    const ttl = 1209600;
    const expiry = created + ttl;

    if (created > expiry) return false;

    setClient(token);

    return true;
  }

  return false;
}
