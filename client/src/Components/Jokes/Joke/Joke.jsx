import React, { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import ValidateUser from "../../../Helpers/ValidateUser";

function Joke({ joke, editable = false }) {
    const [editView, setEditView] = useState(false);
    const [renderJoke, setRenderJoke] = useState(joke);
    const [jokeDeleted, setJokeDeleted] = useState(false);
    const [showPunchline, setShowPunchline] = useState(false);
    const [showLaugh, setShowLaugh] = useState(false);
    const [publisher, setPublisher] = useState(false);
    const [hasLaughed, setHasLaughed] = useState(false);
    const navigate = useNavigate();
    let newJoke;
    let newPunchline;

    useEffect(() => {
        async function FuckTheseNames() {
            async function GetPublisher() {
                const user = await fetch(`https://joke-app-api.azurewebsites.net/api/Auth/get-user/${joke.publisherId}`).then((res) => res.json());
                return user.username;
            }
            async function ShowLaugh() {
                const user = await ValidateUser();
                if (user.username !== publisher) setShowLaugh(true);
            }
            const publisher = await GetPublisher();
            setPublisher(publisher);
            ShowLaugh();

            async function HasLaughed() {
                const response = await fetch(`https://joke-app-api.azurewebsites.net/api/Joke/has-user-laughed/${joke.id}`, {
                    method: "GET",
                    credentials: "include",
                }).then((res) => res.json());
                setHasLaughed(response);
            }
            HasLaughed();
        }
        FuckTheseNames();
    }, [joke.publisherId, publisher, joke.id]);

    async function sendLaugh() {
        const laughs = await fetch(`https://joke-app-api.azurewebsites.net/api/Joke/updateJoke/laugh/${renderJoke.id}`, {
            method: "PUT",
            credentials: "include",
        }).then((res) => res.text());
        setRenderJoke({ ...renderJoke, laughs: laughs });
        setHasLaughed((prev) => !prev);
    }
    async function updateJoke() {
        if (newJoke && newPunchline) {
            const response = await fetch(`https://joke-app-api.azurewebsites.net/api/Joke/updateJoke/${joke.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    question: newJoke,
                    punchline: newPunchline,
                }),
            });
            if (response.status === 401) navigate("/login");
            if (response.status === 200) {
                const newJoke = await response.json();
                setRenderJoke(newJoke);
            }
        }
        setEditView(false);
    }

    async function deleteJoke() {
        const response = await fetch(`https://joke-app-api.azurewebsites.net/api/Joke/deleteJoke/${joke.id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (response.status === 401) navigate("/login");
        if (response.status === 200) setJokeDeleted(true);
    }
    return (
        <>
            {!jokeDeleted ? (
                <div className="joke_container">
                    {!editView ? (
                        <>
                            <div className="flex">
                                <div>
                                    <span className="joke">{showPunchline ? renderJoke.punchline : renderJoke.question}</span>
                                    <div className="details">
                                        <span>Publisher:{publisher}</span>
                                        <span>Laughs:{renderJoke.laughs}</span>
                                    </div>
                                </div>
                                {showLaugh ? (
                                    <button onClick={sendLaugh} style={{ position: "absolute", right: "100px", backgroundColor: hasLaughed ? "lightblue" : null }}>
                                        {hasLaughed ? "UnLaugh" : "Laugh"}
                                    </button>
                                ) : null}

                                {editable ? (
                                    <>
                                        <button className="edit_button" onClick={() => setEditView(true)}>
                                            Edit
                                        </button>
                                        <button className="edit_button" onClick={deleteJoke}>
                                            Delete
                                        </button>
                                    </>
                                ) : null}
                                <button className="punchline" onClick={() => setShowPunchline((prev) => !prev)}>
                                    {!showPunchline ? "Reveal" : "Joke"}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <input onChange={(e) => (newJoke = e.target.value)} id="newJoke" placeholder="New joke" />
                            <input onChange={(e) => (newPunchline = e.target.value)} style={{ marginLeft: "10px" }} id="newpunchline" placeholder="New punchline" />
                            <button style={{ marginLeft: "10px" }} onClick={updateJoke}>
                                Update joke
                            </button>
                            <button style={{ marginLeft: "10px" }} onClick={() => setEditView(false)}>
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            ) : null}
        </>
    );
}

export default Joke;
