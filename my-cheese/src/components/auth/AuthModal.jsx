"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { LoginForm, SignupForm } from "@/components/auth/AuthForms";

export default function AuthModal({ isOpen, onClose, defaultMode = "login" }) {
    const [mode, setMode] = useState(defaultMode);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === "login" ? "Login" : "Create Account"}
        >
            {mode === "login" ? (
                <LoginForm
                    onClose={onClose}
                    switchToSignup={() => setMode("signup")}
                />
            ) : (
            <SignupForm
                onClose={onClose}
                switchToLogin={() => setMode("login")}
            />
            )}
        </Modal>
    );
}