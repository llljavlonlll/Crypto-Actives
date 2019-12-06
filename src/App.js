import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import ReactLoading from "react-loading";
import Modal from "react-modal";
import axios from "axios";
import Footer from "./components/Footer";
import Header from "./components/Header";

import "./App.css";

class App extends React.Component {
    initialState = {
        receiveAmount: 0,
        exchangeCurrency: "BTC",
        amountToExchange: "",
        btcRateUSD: null,
        btcRateUZS: null,
        wmzToUZS: 9600,
        err: null,
        walletNum: "",
        currency: "UZS",
        paymentMethod: "cash",
        phone: "",
        submitLoading: false,
        modalIsOpen: true
    };

    state = this.initialState;

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
        let receiveAmount = null;

        if (this.state.exchangeCurrency === "BTC") {
            receiveAmount =
                (parseFloat(value) / this.state.btcRateUZS) * 0.92 || 0;
        } else if (this.state.exchangeCurrency === "WMZ") {
            receiveAmount =
                (parseFloat(value) / this.state.wmzToUZS) * 0.92 || 0;
        }

        this.setState({
            amountToExchange: value,
            receiveAmount
        });
    };

    onChangeWallet = event => {
        const value = event.target.value;
        this.setState({
            walletNum: value
        });
    };

    onChangeCurrency = event => {
        // const value = event.target.value;
        // let receiveAmount = null;
        // if (this.state.exchangeCurrency === "BTC") {
        //     receiveAmount =
        //         (parseFloat(this.state.amountToExchange) /
        //             this.state.btcRateUZS) *
        //             0.92 || 0;
        // } else if (this.state.exchangeCurrency === "WMZ") {
        //     receiveAmount =
        //         (parseFloat(this.state.amountToExchange) /
        //             this.state.wmzToUZS) *
        //             0.92 || 0;
        // }
        // this.setState({
        //     currency: value,
        //     receiveAmount
        // });
    };

    onChangePhone = event => {
        const value = event.target.value;
        this.setState({
            phone: value
        });
    };

    onChangeExchangeCurrency = event => {
        const value = event.target.value;
        let receiveAmount = null;

        if (value === "BTC") {
            receiveAmount =
                (parseFloat(this.state.amountToExchange) /
                    this.state.btcRateUZS) *
                    0.92 || 0;
        } else if (value === "WMZ") {
            receiveAmount =
                (parseFloat(this.state.amountToExchange) /
                    this.state.wmzToUZS) *
                    0.92 || 0;
        }

        this.setState({
            exchangeCurrency: value,
            receiveAmount
        });
    };

    onChangePaymentMethod = event => {
        const value = event.target.value;
        this.setState({
            paymentMethod: value
        });
    };

    onSubmit = event => {
        event.preventDefault();
        this.setState({
            submitLoading: true
        });
        axios
            .post("/send-order", {
                phone: this.state.phone,
                currency: this.state.currency,
                paymentMethod: this.state.paymentMethod,
                amountToExchange: this.state.amountToExchange,
                exchangeCurrency: this.state.exchangeCurrency,
                walletNum: this.state.walletNum,
                btcRateUZS: this.state.btcRateUZS,
                btcRateUSD: this.state.btcRateUSD,
                wmzToUZS: this.state.wmzToUZS,
                receiveAmount: this.state.receiveAmount
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        receiveAmount: 0,
                        exchangeCurrency: "BTC",
                        amountToExchange: "",
                        err: null,
                        walletNum: "",
                        currency: "UZS",
                        paymentMethod: "cash",
                        phone: "",
                        submitLoading: false
                    });
                }

                this.openModal();
            })
            .catch(err => {
                this.setState({
                    submitLoading: false
                });
                console.log(err.message);
            });
    };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render() {
        return (
            <React.Fragment>
                <Header />
                <main>
                    <div className="exchange-form">
                        <Form onSubmit={this.onSubmit} autoComplete="off">
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
                                <FormGroup
                                    tag="fieldset"
                                    value={this.state.paymentMethod}
                                    onChange={this.onChangePaymentMethod}
                                >
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
                                        value={this.state.amountToExchange}
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
                                        value={this.state.exchangeCurrency}
                                        onChange={this.onChangeExchangeCurrency}
                                    >
                                        <option value="BTC">
                                            BTC - Bitcoin
                                        </option>

                                        <option value="WMZ">
                                            WMZ - WebMoney
                                        </option>
                                        {/*
                                    <option value="LTC">Litecoin</option>
                                    */}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Hamyon raqami</Label>
                                    <Input
                                        type="text"
                                        placeholder={`Misol:  ${
                                            this.state.exchangeCurrency ===
                                            "BTC"
                                                ? "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                                                : "Z106185125514"
                                        }`}
                                        value={this.state.walletNum}
                                        onChange={this.onChangeWallet}
                                        required
                                        name="walletNum"
                                    ></Input>
                                </FormGroup>

                                <p className="total">
                                    Siz{" "}
                                    <span className="total-amount">
                                        {this.state.receiveAmount.toFixed(6)}{" "}
                                        {this.state.exchangeCurrency}
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
                                        placeholder="Misol:  +998998559662"
                                        value={this.state.phone}
                                        onChange={this.onChangePhone}
                                        required
                                    />
                                </FormGroup>
                            </div>

                            <button className="btn btn-primary">
                                {this.state.submitLoading ? (
                                    <ReactLoading
                                        color={"white"}
                                        type={"spin"}
                                        width={"6%"}
                                        className="spinner"
                                    />
                                ) : (
                                    "Almashtirish"
                                )}
                            </button>
                        </Form>

                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={{
                                content: {
                                    color: "white",
                                    background: "#2f2cd8",
                                    textAlign: "center",
                                    padding: "3rem 2rem",
                                    top: "50%",
                                    left: "50%",
                                    right: "auto",
                                    bottom: "auto",
                                    marginRight: "-50%",
                                    transform: "translate(-50%, -50%)",
                                    fonrWeight: "bold"
                                }
                            }}
                            contentLabel="Example Modal"
                        >
                            <h1>Rahmat!</h1>
                            <h2>Buyurtmangiz qabul qilindi</h2>
                            <hr
                                style={{
                                    border: "1px solid #eee",
                                    marginBottom: "2rem"
                                }}
                            ></hr>
                            <h2
                                style={{
                                    marginBottom: "4rem"
                                }}
                            >
                                Siz bilan yaqin orada Telegram orqali
                                bog'lanishadi
                            </h2>
                            <button
                                onClick={this.closeModal}
                                style={{
                                    width: "50%",
                                    height: "5rem",
                                    fontSize: "2rem",
                                    color: "black",
                                    background: "white",
                                    border: "none",
                                    borderBottom: "3px solid rgb(150, 150, 150)"
                                }}
                            >
                                Yopish
                            </button>
                        </Modal>
                    </div>
                </main>
                <Footer />
            </React.Fragment>
        );
    }
}

export default App;
