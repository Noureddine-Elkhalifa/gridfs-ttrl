// import { useEffect, useState,useRef } from "react"
// import keycloak from 'keycloak-js'




//  const useAuth = ()=>{

//     const client = new keycloak({
//         url:process.env.REACT_APP_KEYCLOAK_URL,
//         realm:process.env.REACT_APP_KEYCLOACK_REALM,
//         clientId:process.env.REACT_APP_KEYCLOAK_CLIENT
//     })

//     const [isLogin,setLogin] = useState(false);
//     const isRun = useRef(false);
//     const [token,setToken] = useState(null);

//     useEffect(()=>{
//         if(isRun.current) return;
//         isRun.current = true;
//         //KeyCloack instance
//         client.init({onLoad:"login-required"})
//         .then((res)=>{
//             setLogin(res);
//             setToken(client.token);
//         })
//         .catch(error => console.error("Error initializing keycloack: ",error))
        
//     },[])

//     return [isLogin,token];
// }


// export default useAuth;