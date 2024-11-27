import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";

export default function ProtectedRoute() {
    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                // Refresh token if it's about to expire
                keycloak.updateToken(3600).catch(() => keycloak.logout());
     
                
                if (keycloak.token) {
                    config.headers.Authorization = `Bearer ${keycloak.token}`;
                } else {
                    keycloak.logout();
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            // Cleanup the interceptor on unmount
            axios.interceptors.request.eject(requestInterceptor);
        };
    }, [keycloak]);

    useEffect(() => {
        if (initialized && !keycloak.authenticated) {
            keycloak.login().catch((err) => console.error("Login failed", err));
        }
    }, [keycloak, initialized]);

    if (!initialized) {
        return <div>Loading...</div>; // Replace with a spinner or loader
    }

    return <Outlet />;
}
