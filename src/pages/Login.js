import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import logoImg from "../images/logo.png"
import { useForm } from "react-hook-form";

function Login() {
    const { register, trigger, formState: { errors, isValid }, handleSubmit, watch, reset, resetField } = useForm({
        mode: 'all',
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isError, isLoading, error }] = useLoginMutation();
    function handleLogin(data) {
        setEmail(data.email);
        setPassword(data.password);
        login({ email, password });

    }
    return (
        <div className="flex items-center p-6 bg-[rgb(249,250,251)]">
            <div className="flex-1 h-full max-w-6xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-auto pt-4 md:pt-0 md:w-2/3">
                        <img className=" mx-auto w-2/3 md:w-full h-auto dark:hidden" src={logoImg} alt="image" />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/3">
                        <div className="w-full">
                            <h1 className="mb-6 text-2xl font-semibold text-[rgb(55,65,81)] dark:text-[rgb(229,231,235)]">會員登入</h1>
                            {isError && <Alert variant="danger">{error.data}</Alert>}
                            <form noValidate onSubmit={handleSubmit(handleLogin)}>
                                <div className="mb-3">
                                    <label className="labelField">電郵地址</label>
                                    <input type="text" className={`inputField ${errors.email && 'border-red-1 focus:outline-red-1'}`} placeholder="電郵地址" {...register(`email`, { "required": "請輸入電郵地址" })} onChange={(e) => setEmail(e.target.value)} />
                                    {errors.email && <p className="ml-2 mt-1 mb-0 text-xs text-red-1">{errors.email.message}</p>}
                                </div>
                                <div className="">
                                    <label className="labelField">密碼</label>
                                    <input type="password" className={`inputField ${errors.password && 'border-red-1 focus:outline-red-1'}`} placeholder="密碼" {...register(`password`, { "required": "請輸入密碼" })} onChange={(e) => setPassword(e.target.value)} />
                                    {errors.password && <p className="ml-2 mt-1 mb-0 text-xs text-red-1">{errors.password.message}</p>}
                                </div>
                                <button type="submit" className={`align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-bold focus:outline-none px-4 py-2 rounded-lg text-sm text-white-1 bg-theme-color-1 border border-transparent active:bg-theme-color-1 hover:bg-theme-color-1  focus:ring focus:ring-[rgb(216,180,254)] mt-4 h-12 w-full disabled:opacity-50 disabled:cursor-not-allowed`} disabled={isLoading}>登入</button>
                            </form>
                            <hr className="mt-10" />
                            <p className="mt-1">
                                <a class="text-sm font-bold !text-theme-color-2 hover:!underline" href="/signup">建立帳號</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Container>
                <Row className="py-4">
                    <Col md={6} className="flex flex-col justify-center items-center">
                        <Form style={{ width: "100%" }} onSubmit={handleLogin}>
                            <h1>Login to your account</h1>
                            {isError && <Alert variant="danger">{error.data}</Alert>}
                            <Form.Group>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Button type="submit" disabled={isLoading}>
                                    Login
                                </Button>
                            </Form.Group>

                            <p className="pt-3 text-center">
                                Don't have an account? <Link to="/signup">Create account</Link>{" "}
                            </p>
                        </Form>
                    </Col>
                    <Col md={6}>
                        <img src={logoImg} />
                    </Col>
                </Row>
            </Container> */}
        </div>

    );
}

export default Login;
