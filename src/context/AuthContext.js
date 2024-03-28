// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    setIsAuthenticated: () => { },
    setUser: () => { },
    login: () => { },
    logout: async () => { },
});

const AuthProvider = ({ children }) => {
    //console.log("\x1b[32m 2.- Carga AuthProvider\x1b[0m")
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [lsToken, setLSToken] = useLocalStorage('authToken', null);
    const [lsUser, setLSUser] = useLocalStorage('authUser', null);

    //console.log("\x1b[32m -------------------------------------------\x1b[0m")
    //console.log("\x1b[32m AuthProvider obtiene ls-token\x1b[0m", {lsToken})
    //console.log("\x1b[32m AuthProvider obtiene ls-user\x1b[0m", {lsUser})

    // Replace with your actual logic to check for existing authentication
    // (e.g., checking local storage, token expiration, etc.)
    // checks for existing authentication upon component mount
    useEffect(() => {
        //console.log("\x1b[92m 3.- Carga useEffect\x1b[0m")
        //console.log("\x1b[92m -------------------------------- \x1b[0m")
        //console.log("\x1b[92m lstokennnn \x1b[0m", {lsToken})
        //console.log("\x1b[92m lsuserrrr \x1b[0m", {lsUser})


        if (lsToken) {
            
            // Assuming successful storage format, extract data
            setIsAuthenticated(true);
            setUser(lsUser);
            //console.log("NAVIGATE DASHBOARD")
            navigate('/dashboard');
        }
    },[lsToken, lsUser, navigate]);

    const login = async (credentials) => {
        //console.log("\x1b[36m 3.- Carga LoginContext\x1b[0m")
        //console.log("\x1b[36m -------------------------------- \x1b[0m")
        try {
            // Replace with your actual login logic and API call

            const response = await axios.post('http://localhost:8002/api/login', credentials);
            //console.log('\x1b[35m response login \x1b[0m', response);


            // Handle successful login
            if (response.data.success) {
                setIsAuthenticated(true);
                setUser(response.data.data); // Assuming user data in response
                // Store the token in localStorage
                setLSToken(response.data.data.token);
                setLSUser(response.data.data);  // Example: store token
                //console.log("\x1b[33m Navigate dashboard\x1b[0m")
                navigate('/dashboard');
            } else {
                alert('Invalid username or password');
            }

        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = async () => {
        //console.log("\x1b[91m 3.- Carga LogoutContext\x1b[0m")
        //console.log("\x1b[91m -------------------------------- \x1b[0m")
        try {

            //console.log("\x1b[91m lsToken \x1b[0m", lsToken)
            if (lsToken) {
                // Replace with your actual logout API call (if needed)
                const response = await axios.post('http://localhost:8002/api/logout', null, { // Send token in headers
                    headers: {
                        Authorization: `Bearer ${lsToken}`,
                    },
                }); // Replace with your actual logout endpoint


                if (response.data.success) {
                    //console.log("logout is correct")
                    //console.log("setisauthenticated and user object")
                    setIsAuthenticated(false);
                    setUser(null);
                    //console.log({isAuthenticated, user})
                    //console.log("set local storage/remove")
                    setLSToken(null); // Clear token from storage
                    setLSUser(null); // Clear token from storage
                    //console.log("redirect to login", {isAuthenticated, user})
                    console.log("\x1b[91m Navigate Login \x1b[0m", lsToken)
                    navigate('/login'); // Redirect to login after successful logout
                } else {
                    console.error('Logout error:', response.data.error); // Handle errors gracefully
                }
            } else {
                // Handle the case where no token is found in localStorage
                console.warn('No token found for logout');
                navigate('/login'); // User might be already logged out, redirect to login
            }





        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;