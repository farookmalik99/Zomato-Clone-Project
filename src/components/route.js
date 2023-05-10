import { BrowserRouter, Routes, Route } from 'react-router-dom' ;
import Home from './homepage';
import Filter from './filter';
import Details from './details';
import Header from "./header";
import { useState, useEffect } from "react";

const Router = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:8900/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/JSON",
                    "Content-Type": "application/JSON",
                    "Access-Control-Allow-Credentials": true
                }, 
            })
            .then((response) => {
                if (response.status === 200) return response.json();
                throw new Error("Authentication Failed");
            })
            .then((resObject) => {
                setUser(resObject.user);
            })
            .catch((err) => {
                console.log(err);
            });
        };
        getUser();
    }, []);

    return(
        <BrowserRouter>
            <Header user = { user } />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filter" element={<Filter />} />
                <Route path="/details" element={<Details />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;