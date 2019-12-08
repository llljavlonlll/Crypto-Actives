import React from "react";
import axios from "axios";
import ExchangeToBTC from "./components/ExchangeToBTC";
import ExchangeToUZS from "./components/ExchangeToUZS";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

class App extends React.Component {
    state = {
        btcRateUSD: null,
        btcRateUZS: null,
        wmzToUZS: 9600,
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
                        <Route path="/contact">
                            <div>Contact information on this page</div>
                        </Route>
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
