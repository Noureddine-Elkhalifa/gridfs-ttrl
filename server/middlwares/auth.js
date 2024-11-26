import jwt from 'jsonwebtoken';

// const auth  = async (req,res,next)=>{

//     const bearerHeader = req.headers["authorization"];
//     const token = bearerHeader && bearerHeader.split(" ")[1];

   
   

//     if(token === null) return res.sendStatus(401);

//     const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLIC_KEY}\n-----END PUBLIC KEY-----`;

//     const decodedToken = jwt.verify(token,public_key,{
//         algorithms:["RS256"]
//     })

//     const keycloakUrl = `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOACK_REALM}/sessions/${decodedToken.sid}`;
//     const {email} = decodedToken;

//     console.log(keycloakUrl);
//     req.user = email;
//     next();

// }

// export default auth




