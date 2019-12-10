import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import ReactLoading from "react-loading";
import Modal from "react-modal";
import axios from "axios";
import numeral from "numeral";

class App extends React.Component {
    initialState = {
        amountBeforeBonus: 0,
        receiveAmount: 0,
        amountToExchange: "",
        exchangeCurrency: "UZS",
        err: this.props.err,
        cardNum: "",
        currency: "BTC",
        paymentMethod: "card",
        phone: "",
        submitLoading: false,
        modalIsOpen: false
    };

    state = this.initialState;

    onChangeAmount = event => {
        const value = event.target.value;
        let amountBeforeBonus;
        let receiveAmount;

        if (this.state.currency === "BTC") {
            amountBeforeBonus = parseFloat(value) * this.props.btcRateUZS || 0;
            receiveAmount = amountBeforeBonus * 0.98;
        } else if (this.state.currency === "WMZ") {
            amountBeforeBonus = parseFloat(value) * this.props.wmzToUZS || 0;
            receiveAmount = amountBeforeBonus;
        }

        this.setState({
            amountToExchange: value,
            amountBeforeBonus,
            receiveAmount
        });
    };

    onChangeCardNum = event => {
        const value = event.target.value;
        this.setState({
            cardNum: value
        });
    };

    onChangeCurrency = event => {
        const value = event.target.value;
        let amountBeforeBonus;
        let receiveAmount;

        if (value === "BTC") {
            amountBeforeBonus =
                parseFloat(this.state.amountToExchange) *
                    this.props.btcRateUZS || 0;
            receiveAmount = amountBeforeBonus * 0.98;
        } else if (value === "WMZ") {
            amountBeforeBonus =
                parseFloat(this.state.amountToExchange) * this.props.wmzToUZS ||
                0;
            receiveAmount = amountBeforeBonus;
        }

        this.setState({
            currency: value,
            amountBeforeBonus,
            receiveAmount
        });
    };

    onChangePhone = event => {
        const value = event.target.value;
        this.setState({
            phone: value
        });
    };

    onChangeExchangeCurrency = event => {
        const value = event.target.value;
        let amountBeforeBonus;
        let receiveAmount;

        if (value === "UZS") {
            if (this.state.currency === "BTC") {
                amountBeforeBonus =
                    parseFloat(this.state.amountToExchange) *
                        this.props.btcRateUZS || 0;
                receiveAmount = amountBeforeBonus * 0.98;
            } else if (this.state.currency === "WMZ") {
                amountBeforeBonus =
                    parseFloat(this.state.amountToExchange) *
                        this.props.wmzToUZS || 0;
                receiveAmount = amountBeforeBonus;
            }
        } else if (value === "USD") {
            if (this.state.currency === "BTC") {
                amountBeforeBonus =
                    parseFloat(this.state.amountToExchange) *
                        this.props.btcRateUSD || 0;
                receiveAmount = amountBeforeBonus * 0.98;
            } else if (this.state.currency === "WMZ") {
                // amountBeforeBonus =
                //     parseFloat(this.state.amountToExchange) *
                //         this.props.wmzToUSD || 0;
                // receiveAmount = amountBeforeBonus;

                receiveAmount = this.state.amountToExchange;
            }
        }

        this.setState({
            exchangeCurrency: value,
            amountBeforeBonus,
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
                cardNum: this.state.cardNum,
                btcRateUZS: this.props.btcRateUZS,
                btcRateUSD: this.props.btcRateUSD,
                wmzToUZS: this.props.wmzToUZS,
                receiveAmount: this.state.receiveAmount
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState(this.initialState);
                }

                this.openModal();
            })
            .catch(err => {
                this.setState({
                    submitLoading: false,
                    err: err.message
                });
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
                <section className="container">
                    <main>
                        <div className="exchange-form">
                            <Form onSubmit={this.onSubmit} autoComplete="off">
                                <div style={{ marginBottom: "2rem" }}>
                                    <h3>Berasiz</h3>
                                    <FormGroup>
                                        <Label>Valyuta turi</Label>
                                        <Input
                                            type="select"
                                            name="currency"
                                            value={this.state.currency}
                                            onChange={this.onChangeCurrency}
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
                                        <Label>Miqdori</Label>
                                        <Input
                                            type="text"
                                            placeholder={`Misol:  ${
                                                this.state.currency === "BTC"
                                                    ? "0.0250"
                                                    : "150"
                                            }`}
                                            value={this.state.amountToExchange}
                                            onChange={this.onChangeAmount}
                                            name="amountToExchange"
                                            required
                                        ></Input>
                                    </FormGroup>

                                    <p className="total-spend">
                                        Jami berasiz:{" "}
                                        <span className="total-amount-spend">
                                            {this.state.amountToExchange || "0"}{" "}
                                            {this.state.currency}
                                        </span>
                                    </p>

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
                                                value={
                                                    this.state.exchangeCurrency
                                                }
                                                onChange={
                                                    this
                                                        .onChangeExchangeCurrency
                                                }
                                                name="exchangeCurrency"
                                            >
                                                <option value="UZS">
                                                    UZS - So'm
                                                </option>
                                                {/*<option value="USD">
                                            USD - AQSh Dollar
                                        </option> */}
                                            </Input>
                                        </FormGroup>
                                        <FormGroup
                                            tag="fieldset"
                                            value={this.state.paymentMethod}
                                            onChange={
                                                this.onChangePaymentMethod
                                            }
                                        >
                                            <Label className="tolov-turi">
                                                To'lov qabul turi:
                                            </Label>
                                            {/*<FormGroup check inline>
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
                                            </FormGroup>*/}
                                            <FormGroup check inline>
                                                <Label check>
                                                    <Input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="card"
                                                        required
                                                        defaultChecked
                                                    ></Input>
                                                    Plastik
                                                </Label>
                                            </FormGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Plastik karta raqami</Label>
                                            <Input
                                                type="text"
                                                placeholder={
                                                    "Misol:  0000 1111 2222 3333"
                                                }
                                                value={this.state.cardNum}
                                                onChange={this.onChangeCardNum}
                                                required
                                                name="cardNum"
                                            ></Input>
                                        </FormGroup>

                                        <p className="total">
                                            Jami olasiz:{" "}
                                            <span className="total-amount">
                                                {numeral(
                                                    this.state.receiveAmount
                                                ).format("0,0") || "0"}{" "}
                                                So'm
                                            </span>
                                        </p>
                                    </div>
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
                                    bog'lanamiz
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
                                        borderBottom:
                                            "3px solid rgb(150, 150, 150)"
                                    }}
                                >
                                    Yopish
                                </button>
                            </Modal>
                        </div>
                    </main>
                </section>
            </React.Fragment>
        );
    }
}

export default App;
