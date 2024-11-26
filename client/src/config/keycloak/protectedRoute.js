import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";

export default function ProtectedRoute(){

  
    const {keycloak,initialized} = useKeycloak();
  
   


    axios.interceptors.request.use(
        // configure axios to get the latest token before sending a request
        (config)=>{
            const updatedToken = keycloak.token;
            console.log("test");
            keycloak.updateToken();

            if(updatedToken){
                config.headers.Authorization = `Bearer ${updatedToken}`;
            }
            return config
        },
        (error)=>{
            return Promise.reject(error)
       }
        
    )

    useEffect(()=>{
        if(initialized){
            if(!keycloak.authenticated){
                keycloak.login();
            }
 
        }
    },[keycloak,initialized]);


    if(!initialized){
        return <div></div>
    }



    return <Outlet/>
}


