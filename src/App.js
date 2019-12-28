import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ExchangeToBTC from "./components/ExchangeToBTC";
import ExchangeToUZS from "./components/ExchangeToUZS";
import Playmobile from "./components/Paymobile";
import ContactPage from "./components/ContactPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

class App extends React.Component {
    state = {
        btcRateUSD: null,
        btcRateUZS: null,
        wmzToUZS: null,
        err: null
    };
    componentDidMount() {
        axios
            .get("https://api.coindesk.com/v1/bpi/currentprice/UZS.json")
            .then(response => {
                this.setState({
                    btcRateUSD: response.data.bpi.USD.rate_float,
                    btcRateUZS: response.data.bpi.UZS.rate_float
                });
            })
            .catch(err => {
                this.setState({
                    err: err.message
                });
            });

        axios
            .get(
                `https://openexchangerates.org/api/latest.json?app_id=47d1cc1a479f434cb22c7ddecd8bc3b1&base=USD&symbols=UZS&prettyprint=true`
            )
            .then(response => {
                this.setState({
                    wmzToUZS: response.data.rates.UZS
                });
            })
            .catch(err => {
                this.setState({
                    err: err.message
                });
            });
    }

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <ExchangeToBTC {...this.state} />
                        </Route>
                        <Route path="/sell">
                            <ExchangeToUZS {...this.state} />
                        </Route>
                        <Route exact path="/paymobile">
                            <Playmobile {...this.state} />
                        </Route>
                        <Route path="/contact">
                            <ContactPage />
                        </Route>
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
