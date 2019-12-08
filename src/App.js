import React from "react";
import ExchangeToBTC from "./components/ExchangeToBTC";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

export default function App() {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <ExchangeToBTC />
                    </Route>
                    <Route path="/sell">
                        <div>Sell your bitcoin here</div>
                    </Route>
                    <Route path="/contact">
                        <div>Contact information on this page</div>
                    </Route>
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}
