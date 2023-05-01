import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Jokes from "./Components/Jokes/Jokes";
import PostJoke from "./Components/PostJoke/PostJoke";
import MyJokes from "./Components/MyJokes/MyJokes";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <Jokes />
                        </>
                    }
                />
                <Route
                    path="/post"
                    element={
                        <>
                            <Navbar />
                            <PostJoke />
                        </>
                    }
                />
                <Route
                    path="/my-jokes"
                    element={
                        <>
                            <Navbar />
                            <MyJokes />
                        </>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
