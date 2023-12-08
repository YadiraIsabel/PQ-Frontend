import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest, profileRequest } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth debe de estar en un contexto')
    } return context
}
export const AuthProvieder = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);


    const signUp = async (user) => {
        /* console.log(user); */

        try {
            const res = await registerRequest(user)
            /*  console.log(res); */
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data.message)
        }
    }
    const signIn = async (user) => {
        try {
            const res = await loginRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            /* console.log(error); */
            setErrors(error.response.data.message)
        }
    }

    const profile = async () => {
        try {
            const res = await profileRequest()     
            setUser(res.data)
        } catch (error) {
            /* console.log(error); */
            setErrors(error.response.data.message)
        }
    }

    const logout = () => {
        logoutRequest();
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null)
    }

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }

            try {
                const res = await verifyTokenRequest(cookies.token)
                console.log(res);
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false)
                setLoading(false)
                setUser(null)
            }
        }
        checkLogin();
    }, [])

    return (
        <AuthContext.Provider value={{ user, signUp, isAuthenticated, errors, signIn, logout, loading, profile }} >
            {children}
        </AuthContext.Provider>
    )
}