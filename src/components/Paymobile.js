import React, { useState } from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupAddon
} from "reactstrap";
import ReactLoading from "react-loading";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Modal from "react-modal";
import axios from "axios";
import numeral from "numeral";

export default function Paymobile(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [amountToPay, setAmountToPay] = useState(0);
    const [paymentAmountUZS, setPaymentAmountUZS] = useState("");
    const [phoneNum, setPhoneNum] = useState("+998");
    const [operator, setOperator] = useState("empty");
    const [copied, setCopied] = useState(false);
    const [copyButtonColor, setCopyButtonColor] = useState("danger");

    const onPaymentAmountChange = event => {
        const value = event.target.value;
        if (/^[0-9]*$/.test(value)) {
            setPaymentAmountUZS(value);

            if (parseInt(value) >= 10000) {
                setAmountToPay(
                    ((parseFloat(value) / props.btcRateUZS) * 0.98).toFixed(8)
                );
            } else {
                setAmountToPay(0);
            }
        }
    };

    const onPhoneNumChange = event => {
        const value = event.target.value;
        if (/^\+998\d{0,9}$/.test(value)) {
            setPhoneNum(value);

            if (value.length > 4) {
                if (
                    value.substr(4, 2) === "90" ||
                    value.substr(4, 2) === "91"
                ) {
                    setOperator("beeline");
                } else if (
                    value.substr(4, 2) === "93" ||
                    value.substr(4, 2) === "94"
                ) {
                    setOperator("ucell");
                } else if (value.substr(4, 2) === "98") {
                    setOperator("perfectum");
                } else if (
                    value.substr(4, 2) === "99" ||
                    value.substr(4, 2) === "95"
                ) {
                    setOperator("uzmobile");
                } else if (value.substr(4, 2) === "97") {
                    setOperator("mobiuz");
                }
            } else {
                setOperator("empty");
            }
        }
    };

    const closeModal = () => setModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);

    const onCopy = () => {
        setCopied(true);
        setCopyButtonColor("basic");
        setTimeout(() => {
            setCopied(false);
            setCopyButtonColor("danger");
        }, 3000);
    };

    const onSubmit = event => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <section className="container">
                <main>
                    <div className="exchange-form">
                        <Form onSubmit={() => {}} autoComplete="off">
                            <div style={{ marginBottom: "2rem" }}>
                                <h3>Mobil xisobingizni to'ldiring</h3>

                                <FormGroup>
                                    <Label>Telefon raqamingiz</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <img
                                                src={`../images/mobile/${operator}.png`}
                                                alt="Operator logo"
                                                style={{
                                                    maxWidth: "50px",
                                                    maxHeight: "50px"
                                                }}
                                            />
                                        </InputGroupAddon>
                                        <Input
                                            type="text"
                                            placeholder="Misol:  +998991234567"
                                            name="phoneNum"
                                            value={phoneNum}
                                            onChange={onPhoneNumChange}
                                            required
                                        ></Input>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        To'lov miqdori{" "}
                                        <span style={{ fontSize: 14 }}>
                                            (min. 10,000 so'm)
                                        </span>
                                    </Label>
                                    <Input
                                        type="text"
                                        required
                                        name="paymentAmount"
                                        placeholder="Misol:  50000"
                                        value={paymentAmountUZS}
                                        onChange={onPaymentAmountChange}
                                    ></Input>
                                </FormGroup>
                                <div
                                    style={{
                                        marginBottom: "2rem",
                                        marginTop: "1rem"
                                    }}
                                >
                                    <p className="total-spend">
                                        Jami berasiz:{" "}
                                        <span className="total-amount-spend">
                                            {amountToPay} BTC
                                        </span>
                                    </p>
                                    <hr />
                                </div>
                                <div className="walletContainer">
                                    <div className="walletNumContainer">
                                        <div style={{ fontWeight: "bold" }}>
                                            Bitcoin hamyon raqami
                                        </div>
                                        <div className="walletNum">
                                            <div>
                                                3FgjkbujeTtNGRcPFKunbv2cWr4N85LfaW
                                            </div>
                                            <CopyToClipboard
                                                text="3FgjkbujeTtNGRcPFKunbv2cWr4N85LfaW"
                                                onCopy={onCopy}
                                            >
                                                <button
                                                    onClick={event =>
                                                        event.preventDefault()
                                                    }
                                                    style={{
                                                        fontSize: "16px",
                                                        width: "30%",
                                                        height: "3rem",
                                                        color: `${
                                                            copyButtonColor ===
                                                            "danger"
                                                                ? "white"
                                                                : "black"
                                                        }`
                                                    }}
                                                    className={`btn btn-${copyButtonColor}`}
                                                >
                                                    {copied
                                                        ? "Ko'chirildi!"
                                                        : "Ko'chirish"}
                                                </button>
                                            </CopyToClipboard>
                                        </div>
                                    </div>
                                    <img
                                        src="../images/qr-wallet.png"
                                        alt="Bitcoin wallter qr code"
                                        className="walletImage"
                                    />
                                </div>
                            </div>

                            <button
                                className="btn btn-primary"
                                onClick={onSubmit}
                            >
                                To'lovni amalga oshirish
                            </button>
                        </Form>

                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            ariaHideApp={false}
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
                                onClick={closeModal}
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
            </section>
        </React.Fragment>
    );
}
