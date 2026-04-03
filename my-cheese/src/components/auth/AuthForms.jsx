"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import toast from "react-hot-toast";

export function LoginForm({ switchToSignup, onClose }) {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            toast.success("Login successful");
            onClose();
        } else {
            toast.error(result.message || "Login failed");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 text-black outline-none"
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 text-black outline-none"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-black p-3 text-white hover:opacity-90"
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <button
                    type="button"
                    onClick={switchToSignup}
                    className="font-semibold text-blue-600"
                >
                    Sign up
                </button>
            </p>
        </form>
    );
}

export function SignupForm({ switchToLogin, onClose }) {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await register(
        formData.username,
        formData.email,
        formData.password
    );

    if (result.success) {
        toast.success("Registration successful");
        onClose();
    } else {
        toast.error(result.message || "Registration failed");
    }

    setLoading(false);
};

return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black outline-none"
            required
        />

        <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black outline-none"
            required
        />

        <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black outline-none"
            required
        />

        <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black p-3 text-white hover:opacity-90"
        >
            {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
                type="button"
                onClick={switchToLogin}
                className="font-semibold text-blue-600"
            >
                Login
            </button>
        </p>
    </form>
);}
