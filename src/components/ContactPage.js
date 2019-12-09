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
        err: undefined
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
            axios
                .post("/feedback", {})
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err.message));
        }
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col sm="12" lg="6">
                        <h1>Aloqa ma'lumotlari</h1>
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
                                <strong>Manzil:</strong> Crypto Actives, 150700,
                                Uzbekiston Toshkent sh., Istiqlol k., 16a-uy
                            </p>
                        </div>
                        <div className="office-photo">
                            <h1>Asosiy ofis</h1>
                            <img
                                src="../images/office.jpg"
                                className="photo"
                                alt="Office"
                            ></img>
                        </div>
                    </Col>
                    <Col sm="12" lg="6">
                        <Form
                            className="contact-form"
                            onSubmit={this.handleSubmit}
                        >
                            <Row>
                                <Col sm="12" md="6">
                                    <FormGroup>
                                        <Label>Ism</Label>
                                        <Input
                                            type="text"
                                            name="firstName"
                                        ></Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="12" md="6">
                                    <FormGroup>
                                        <Label>Familiya</Label>
                                        <Input
                                            type="text"
                                            name="lastName"
                                        ></Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="email" name="email"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Telefon raqam</Label>
                                <Input type="text" name="phone"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Mavzu</Label>
                                <Input type="text" name="subject"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Xabar</Label>
                                <Input
                                    type="textarea"
                                    name="message"
                                    rows="6"
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
                            <Button>Yuborish</Button>
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
            </Container>
        );
    }
}

export default ContactPage;
