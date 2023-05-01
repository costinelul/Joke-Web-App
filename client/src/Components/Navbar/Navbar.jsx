import React, { useEffect } from "react";
import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidateUser from "../../Helpers/ValidateUser";

function Navbar() {
    const [user, setUser] = useState(false);
    const navigate = useNavigate();

    async function Logout() {
        const response = await fetch("https://joke-app-api.azurewebsites.net/api/Auth/logout", {
            method: "GET",
            credentials: "include",
        });
        if (response.status === 200) navigate("/login");
    }
    useEffect(() => {
        async function IsAuth() {
            const user = await ValidateUser();
            if (user) setUser(user);
            else setUser(false);
        }
        IsAuth();
    }, []);

    return (
        <div className="navbar">
            <h1 onClick={() => navigate("/")} className="home">
             Jokes
            </h1>
            <div className="nav_buttons">
                {user ? (
                    <>
                        <button className="nav_button" onClick={() => navigate("/my-jokes")}>
                            My jokes
                        </button>
                        <button className="nav_button" onClick={() => navigate("/post")}>
                            Post a joke
                        </button>
                        <span style={{ right: "10px", position: "absolute" }}>Hello, {user.username}!</span>
                        <button className="logout" onClick={Logout}>
                            Log out
                        </button>
                    </>
                ) : (
                    <>
                        <button className="nav_button" onClick={() => navigate("/register")}>
                            Register
                        </button>
                        <button className="nav_button" onClick={() => navigate("/login")}>
                            Login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
