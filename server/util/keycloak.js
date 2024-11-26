
import session from "express-session";
import keycloak from 'keycloak-connect';

const keycloak = () => {

    let memoryStore = new session.MemoryStore();
    return new Keycloak({ store: memoryStore });

}

export default keycloak;
