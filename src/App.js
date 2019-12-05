import React from "react";
import Header from "./components/Header";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./App.css";
import Footer from "./components/Footer";

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
        paymentType: "cash",
        phone: ""
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
                    0.92 || 0
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
                    0.92 || 0
        });
    };

    onChangePhone = event => {
        const value = event.target.value;
        this.setState({
            phone: value
        });
    };

    // onChangeCryptocurrency = event => {
    //     const value = event.target.value;
    // };

    onHandleSubmit = event => {};

    render() {
        return (
            <React.Fragment>
                <Header />
                <main>
                    <div className="exchange-form">
                        <Form method="POST" action="/send-order">
                            <div style={{ marginBottom: "2rem" }}>
                                <h3>Berasiz</h3>
                                <FormGroup>
                                    <Label>Valyuta turi</Label>
                                    <Input
                                        type="select"
                                        value={this.state.currency}
                                        onChange={this.onChangeCurrency}
                                        name="currency"
                                    >
                                        <option value="UZS">UZS - So'm</option>
                                        {/*<option value="USD">
                                            USD - AQSh Dollar
                                        </option> */}
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
                                        placeholder="Misol:  1500000"
                                        value={this.state.toBeExchanged}
                                        onChange={this.onChangeAmount}
                                        name="amountToExchange"
                                        required
                                    ></Input>
                                </FormGroup>
                            </div>
                            <div
                                style={{
                                    marginBottom: "2rem",
                                    marginTop: "2rem"
                                }}
                            >
                                <hr />
                                <h3>Olasiz</h3>
                                <FormGroup>
                                    <Label>Valyuta turi</Label>
                                    <Input
                                        type="select"
                                        name="exchangeCurrency"
                                    >
                                        <option value="BTC">
                                            BTC - Bitcoin
                                        </option>
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
                                        placeholder="Misol:  1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                                        value={this.state.wallet}
                                        onChange={this.onChangeWallet}
                                        required
                                        name="walletNum"
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
                            </div>
                            <div
                                style={{
                                    marginBottom: "4rem",
                                    marginTop: "2rem"
                                }}
                            >
                                <hr />
                                <h3>Shaxsiy ma'lumotlar</h3>
                                <FormGroup>
                                    <Label for="phone-number">
                                        Telefon raqami
                                    </Label>
                                    <Input
                                        type="phone"
                                        name="phone"
                                        id="phone-number"
                                        placeholder="Misol:  998559662"
                                        value={this.state.phone}
                                        onChange={this.onChangePhone}
                                        required
                                    />
                                </FormGroup>
                            </div>

                            <button
                                onClick={this.onHandleSubmit}
                                className="btn btn-primary"
                                type="submit"
                            >
                                Almashtirish
                            </button>
                        </Form>
                    </div>
                </main>
                <Footer />
            </React.Fragment>
        );
    }
}

export default App;
