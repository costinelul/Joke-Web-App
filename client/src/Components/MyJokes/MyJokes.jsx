import React, { useEffect, useState } from "react";
import Joke from "../Jokes/Joke/Joke";
import ValidateUser from "../../Helpers/ValidateUser";
import FetchJokes from "../../Helpers/FetchJokes";

function MyJokes() {
    const [myJokes, setMyJokes] = useState([]);

    useEffect(() => {
        async function getMyJokes() {
            const userId = await ValidateUser().then((user) => user.id);
            if (userId) {
                const jokes = await FetchJokes();
                return jokes.filter((joke) => joke.publisherId === userId);
            }
        }
        getMyJokes().then((jokes) => setMyJokes(jokes));
    }, []);
    return (
        <>
            {myJokes?.map((joke) => (
                <Joke key={joke.id} joke={joke} editable={true} />
            ))}
        </>
    );
}

export default MyJokes;
