import React from "react";
import Header from "./components/Header";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./App.css";

class App extends React.Component {
    state = {
        receiveAmount: 0,
        receiveCryptocurrency: "BTC",
        toBeExchanged: "",
        btcRateUSD: null,
        btcRateUZS: null,
        err: null,
        wallet: "",
        currency: "UZS",
        paymentType: "cash"
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

    onChangeAmount = event => {
        const value = event.target.value;
        this.setState({
            toBeExchanged: value,
            receiveAmount:
                (parseFloat(value) /
                    (this.state.currency === "USD"
                        ? this.state.btcRateUSD
                        : this.state.btcRateUZS)) *
                    1.08 || 0
        });
    };

    onChangeWallet = event => {
        const value = event.target.value;
        this.setState({
            wallet: value
        });
    };

    onChangeCurrency = event => {
        const value = event.target.value;
        this.setState({
            currency: value,
            receiveAmount:
                (parseFloat(this.state.toBeExchanged) /
                    (value === "USD"
                        ? this.state.btcRateUSD
                        : this.state.btcRateUZS)) *
                    1.08 || 0
        });
    };

    // onChangeCryptocurrency = event => {
    //     const value = event.target.value;
    // };

    onHandleSubmit = event => {
        event.preventDefault();
    };

    render() {
        return (
            <React.Fragment>
                <Header />
                <main>
                    <div className="exchange-form">
                        <Form>
                            <div style={{ marginBottom: "4rem" }}>
                                <h3>Berasiz</h3>
                                <FormGroup>
                                    <Label>Valyuta turi</Label>
                                    <Input
                                        type="select"
                                        value={this.state.currency}
                                        onChange={this.onChangeCurrency}
                                    >
                                        <option value="UZS">UZS - So'm</option>
                                        <option value="USD">
                                            USD - AQSh Dollar
                                        </option>
                                    </Input>
                                </FormGroup>
                                <FormGroup tag="fieldset">
                                    <Label className="tolov-turi">
                                        To'lov turi:
                                    </Label>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cash"
                                                required
                                                defaultChecked
                                            ></Input>
                                            Naqd
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input
                                                type="radio"
                                                name="paymentMethod"
                                                value="card"
                                            ></Input>
                                            Plastik
                                        </Label>
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Miqdori</Label>
                                    <Input
                                        type="text"
                                        placeholder="Misol: 1500000"
                                        value={this.state.toBeExchanged}
                                        onChange={this.onChangeAmount}
                                    ></Input>
                                </FormGroup>
                            </div>
                            <h3>Olasiz</h3>
                            <FormGroup>
                                <Label>Kriptovalyuta turi</Label>
                                <Input type="select">
                                    <option value="BTC">BTC - Bitcoin</option>
                                    {/*
                                    <option value="ETH">Ethereum</option>
                                    <option value="LTC">Litecoin</option>
                                    */}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Hamyon raqami</Label>
                                <Input
                                    type="text"
                                    placeholder="Misol: 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                                    value={this.state.wallet}
                                    onChange={this.onChangeWallet}
                                ></Input>
                            </FormGroup>

                            <p>
                                Siz{" "}
                                <span className="total-amount">
                                    {this.state.receiveAmount.toFixed(6)}{" "}
                                    {this.state.receiveCryptocurrency}
                                </span>{" "}
                                olasiz
                            </p>

                            <button
                                onClick={this.onHandleSubmit}
                                className="btn btn-primary"
                            >
                                Almashtirish
                            </button>
                        </Form>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
