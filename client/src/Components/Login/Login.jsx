import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    let email;
    let password;
    const navigate = useNavigate();
    const [status, setStatus] = useState("");

    async function Login() {
        if (email && password) {
            const response = await fetch("https://joke-app-api.azurewebsites.net/api/Auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                credentials: "include",
            });
            console.log(response.status);
            if (response.status === 404) setStatus("Wrong credentials");
            if (response.status === 200) {
                setStatus("Login successful. Redirecting...");
                navigate("/");
            }
        }
    }
    return (
        <>
            <span onClick={() => navigate("/")} className="gotohome">
                Jokes
            </span>
            <div className="register_container">
                <div className="field">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" onChange={(e) => (email = e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" onChange={(e) => (password = e.target.value)} />
                </div>
                <span>{status}</span>
                <button onClick={Login}>Login</button>
            </div>
        </>
    );
}

export default Login;
