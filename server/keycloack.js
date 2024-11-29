
import Keycloak from "keycloak-connect";
import axios from 'axios'

const test = async(req,res,next) => {

    const keycloak = new Keycloak({});
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    try {
        const response = await axios.post('http://localhost:5005/realms/bookRealm/protocol/openid-connect/token/introspect', 
            new URLSearchParams({
              client_id: 'privatBookClient',  // Use the client ID that issued the token
              client_secret: '1eav4Q9dYmvm8jgsyhaLVV9LRbAgGtxq', // Client secret for backend client
              token: token,  // The token to check
            }), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            });

            if(response.data.active){
                console.log(response.data);
                next()
            }else{
                console.log("Session is terminated*********************************************** ");
                res.status(401).json({ error: 'Invalid or expired token. Please login again.' });

            }
    } catch (error) {
        console.error('Error checking token:', error);
        res.status(500).json({ error: 'Internal Server Error. Could not validate token.' });

    }



  
}


export default test;