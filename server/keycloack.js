
// import Keycloak from "keycloak-connect";


// const test = async(req,res,next) => {

//     const keycloakConfig = {
//         realm: "bookRealm",
//         url: "http://localhost:5005/",
//         required: "external",
//         resource: "bookClient",
//       };

//     const keycloak = new Keycloak(keycloakConfig);
//     const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

//     const t = keycloak.validateAccessToken(token);
//     console.log(t);



//     next();
// }


// export default test;