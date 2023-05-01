import React, { useEffect, useState } from "react";
import "./styles.css";
import { Navigate, useNavigate } from "react-router-dom";
import ValidateUser from "../../Helpers/ValidateUser";

function PostJoke() {
    const [status, setStatus] = useState();
    const [user, setUser] = useState(true);
    const navigate = useNavigate();
    let joke;
    let punchline;

    useEffect(() => {
        async function Authorize() {
            const response = await ValidateUser();
            if (response) {
                setUser(true);
            } else setUser(false);
        }
        Authorize();
    }, []);

    async function postJoke() {
        if (user && joke && punchline) {
            const response = await fetch("https://joke-app-api.azurewebsites.net/api/Joke/post", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: joke,
                    punchline: punchline,
                }),
            });
            if (response.status === 401) setStatus("Unauthorized");
            if (response.status === 200) {
                setStatus("Joke posted successfully");
                navigate("/my-jokes")
            }
        }
    }
    return (
        <>
            {user ? (
                <div className="joke_container post_joke">
                    <div className="input_container">
                        <div className="input">
                            <label htmlFor="joke">Enter joke: </label>
                            <input
                                id="joke"
                                onChange={(e) => {
                                    joke = e.target.value;
                                }}
                            ></input>
                        </div>
                        <div className="input">
                            <label htmlFor="punchline">Enter punchline: </label>
                            <input
                                id="punchline"
                                onChange={(e) => {
                                    punchline = e.target.value;
                                }}
                            ></input>
                        </div>
                    </div>
                    <span className="status">{status}</span>
                    <button className="submit" onClick={postJoke}>
                        Post Joke
                    </button>
                </div>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
}

export default PostJoke;
