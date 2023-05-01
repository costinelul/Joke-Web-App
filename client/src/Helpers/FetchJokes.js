async function FetchJokes() {
    const jokes = await fetch("https://joke-app-api.azurewebsites.net/api/Joke/getAll").then((res) => res.json());
    return jokes;
}

export default FetchJokes;
