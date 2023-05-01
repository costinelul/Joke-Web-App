import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function Register() {
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    let email;
    let password;

    async function Register() {
        if (email && password) {
            const response = await fetch("https://joke-app-api.azurewebsites.net/api/Auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            if (response.status === 200) navigate("/login");
            if (response.status === 400) setError(true);
        }
    }
    return (
        <>
            <span onClick={()=> navigate("/")} className="gotohome">
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
                {error ? <span>User already exists!</span> : null}
                <button onClick={Register}>Register</button>
            </div>
        </>
    );
}
export default Register;
