import axios from 'axios';


const keyCloakConfig = {
    realm: "bookRealm",
    url: "http://localhost:5005",
    clientId: "backEndBook",
    clientSecret: "R8KMF6hGvNhGlZC2WgE4WniP5iTiXcak",
    introspectionUrl: "http://localhost:5005/auth/realms/bookRealm/protocol/openid-connect/token/introspect"
  }


  const introspectionTest = async (req,res,next) =>{
    const token = req.headers["authorization"];

    if(!token) return res.status(400).json({error:'Acess token is required'})

    try{
        const response = await axios.post(keyCloakConfig.introspectionUrl,null,{
            params:{
                client_id:keyCloakConfig.clientId,
                client_secret: keyCloakConfig.clientSecret,
                token: token.replace('Bearer ',"")
            }
        });

        if(response.data.active){
            console.log("active")
            next();
        }else{
            console.log("Token not active or invalid")
        }
    }catch(error){
        console.log("Error during introspection:" , error);
    }
  }
export default introspectionTest;