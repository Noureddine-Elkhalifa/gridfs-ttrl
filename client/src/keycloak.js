import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  "realm": "bookRealm",
  "url": "http://localhost:5005",
  "ssl-required": "external",
  "clientId": "bookClient"
});

export default keycloak;