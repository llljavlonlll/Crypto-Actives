import React from "react";
import Recaptcha from "react-recaptcha";
import ReactLoading from "react-loading";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";
import axios from "axios";

class ContactPage extends React.Component {
    state = {
        isVerified: false,
        captchaLoading: true,
        submitLoading: false,
        err: undefined,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    };

    handleCaptchaLoaded = () => {
        this.setState({
            captchaLoading: false
        });
    };

    handleVerify = res => {
        if (res) {
            this.setState({
                isVerified: true
            });
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.isVerified) {
            this.setState({
                submitLoading: true
            });

            axios
                .post("/feedback", {
                    ...this.state
                })
                .then(res => {
                    this.setState({
                        submitLoading: false
                    });
                })
                .catch(err => {
                    this.setState({
                        submitLoading: false
                    });
                    console.log(err.message);
                });
        }
    };

    handleOnChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className="container">
                <Row>
                    <Col sm="12" lg="6">
                        <h1>
                            <strong>Biz bilan bog'laning</strong>
                        </h1>
                        <div className="contact-details">
                            <p>
                                <strong>Ish vaqti:</strong> Du-Sh 10:00 dan
                                18:00 gacha
                            </p>
                            <p>
                                <strong>Telefon:</strong> +998 998024220
                            </p>
                            <p>
                                <strong>Email:</strong> butabaev.o@gmail.com
                            </p>
                            <p>
                                <strong>Manzil:</strong> Crypto Actives, 150701,
                                Uzbekiston Qo'qon sh., Istiqlol k., 16a-uy
                            </p>
                        </div>
                        <div className="office-photo">
                            <h1>
                                <strong>Asosiy ofis</strong>
                            </h1>
                            <img
                                src="../images/office.jpg"
                                className="photo"
                                alt="Office"
                            ></img>
                        </div>
                    </Col>
                    <Col sm="12" lg="6">
                        <h1>
                            <strong>Aloqa formasi</strong>
                        </h1>
                        <Form
                            className="contact-form"
                            onSubmit={this.handleSubmit}
                        >
                            <Row>
                                <Col sm="12" md="6">
                                    <FormGroup>
                                        {/*<Label>Ism</Label>*/}
                                        <Input
                                            type="text"
                                            name="firstName"
                                            value={this.state.firstName}
                                            onChange={this.handleOnChange}
                                            placeholder="Ism"
                                            required
                                        ></Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="12" md="6">
                                    <FormGroup>
                                        {/*<Label>Familiya</Label>*/}
                                        <Input
                                            type="text"
                                            name="lastName"
                                            value={this.state.lastName}
                                            onChange={this.handleOnChange}
                                            placeholder="Familiya"
                                            required
                                        ></Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                {/*<Label>Email</Label>*/}
                                <Input
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleOnChange}
                                    placeholder="Email: misol@mail.uz"
                                ></Input>
                            </FormGroup>
                            <FormGroup>
                                {/*<Label>Telefon</Label>*/}
                                <Input
                                    type="text"
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.handleOnChange}
                                    placeholder="Telefon: +998998559662"
                                    required
                                ></Input>
                            </FormGroup>
                            <FormGroup>
                                {/*<Label>Mavzu</Label>*/}
                                <Input
                                    type="text"
                                    name="subject"
                                    value={this.state.subject}
                                    onChange={this.handleOnChange}
                                    placeholder="Mavzu: Saytdagi noqulayliklar"
                                ></Input>
                            </FormGroup>
                            <FormGroup>
                                {/*<Label>Xabar</Label>*/}
                                <Input
                                    type="textarea"
                                    name="message"
                                    rows="6"
                                    placeholder="Xabar"
                                    required
                                ></Input>
                            </FormGroup>
                            <div className="captcha">
                                {this.state.captchaLoading && (
                                    <ReactLoading
                                        type={"spin"}
                                        color={"blue"}
                                        height={78}
                                    />
                                )}
                                <Recaptcha
                                    sitekey="6LcyxcYUAAAAALM1ms1_RFEA90JhiBhfZvImCioH"
                                    render="explicit"
                                    onloadCallback={this.handleCaptchaLoaded}
                                    verifyCallback={this.handleVerify}
                                />
                            </div>
                            <Button>
                                {this.state.submitLoading ? (
                                    <ReactLoading
                                        color={"white"}
                                        type={"spin"}
                                        width={"6%"}
                                        className="spinner"
                                    />
                                ) : (
                                    "Yuborish"
                                )}
                            </Button>
                        </Form>
                    </Col>
                    <div className="google-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d758.0538618865261!2d70.93254182922843!3d40.53682901793352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMyJzEyLjYiTiA3MMKwNTUnNTkuMSJF!5e0!3m2!1sen!2s!4v1575836381413!5m2!1sen!2s"
                            height="500"
                            frameBorder="0"
                            style={{
                                border: "0",
                                width: "100%",
                                borderRadius: "5px"
                            }}
                            allowFullScreen={true}
                            title="map"
                        ></iframe>
                    </div>
                </Row>
            </div>
        );
    }
}

export default ContactPage;
