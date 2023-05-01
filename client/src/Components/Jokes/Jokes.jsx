import React, { useState, useEffect } from "react";
import Joke from "./Joke/Joke";

function Jokes() {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        async function fetchJokes() {
            const jokes = await fetch("https://joke-app-api.azurewebsites.net/api/Joke/getAll").then((res) => res.json());
            const reversed = jokes.reverse();
            console.log(reversed);
            setJokes(reversed);
        }
        fetchJokes();
    }, []);
    return (
        <>
            {jokes.map((joke) => (
                <Joke key={joke.id} joke={joke} />
            ))}
        </>
    );
}

export default Jokes;
