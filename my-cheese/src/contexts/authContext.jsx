"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../lib/api-config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);

                if (decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem("token");
                    setUser(null);
                    setToken(null);
                } else {
                    setToken(storedToken);
                    setUser(decoded);
                }
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem("token");
            }
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            const newToken = response.data.token;
            localStorage.setItem("token", newToken);

            const decoded = jwtDecode(newToken);
            setToken(newToken);
            setUser(decoded);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login failed",
            };
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await api.post("/auth/register", {
                username,
                email,
                password,
            });

            const newToken = response.data.token;
            localStorage.setItem("token", newToken);

            const decoded = jwtDecode(newToken);
            setToken(newToken);
            setUser(decoded);

            return { success: true };
        } catch (error) {
            return {
            success: false,
            message: error.response?.data?.message || "Registration failed",
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
            user,
            token,
            loading,
            login,
            register,
            logout,
            isAuthenticated: !!token,
        }}
    >
        {children}
    </AuthContext.Provider>
    );
}

export function useAuth() {
  return useContext(AuthContext);
}