import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import logoImg from "../images/logo.png"
import "./Signup.css";
import { useSignupMutation } from "../services/appApi";
import { useForm } from "react-hook-form";
import { Checkbox } from "@mui/material";

function Signup() {
    const { register, trigger, formState: { errors, isValid }, handleSubmit, watch, reset, resetField } = useForm({
        mode: 'all',
    });
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signup, { error, isLoading, isError }] = useSignupMutation();

    function handleSignup(data) {

        signup({ name, email, phone, password });
    }

    return (
        <div className="flex items-center p-6 bg-[rgb(249,250,251)]">
            <div className="flex-1 h-full max-w-6xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-auto my-auto pt-4 md:pt-0 md:w-2/3">
                        <img className="mx-auto w-2/3 md:w-full h-auto dark:hidden" src={logoImg} alt="image" />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-6 text-2xl font-semibold text-[rgb(55,65,81)] dark:text-[rgb(229,231,235)]">會員註冊</h1>
                            {isError && <Alert variant="danger">{error.data}</Alert>}
                            <form noValidate onSubmit={handleSubmit(handleSignup)}>
                            <div className="mb-3">
                                    <label className="labelField">稱謂</label>
                                    <input type="text" className={`inputField ${errors.name && 'border-red-1 focus:outline-red-1'}`} placeholder="稱謂" {...register(`name`, { "required": "請輸入稱謂", minLength: 3, maxLength: 20 })} onChange={(e) => setName(e.target.value)} />
                                    {errors.name && <p className="ml-2 mt-1 mb-0 text-xs text-red-1">{errors.name.message}</p>}
                                    {errors.name?.type === 'maxLength' && (
                                        <div className="text-xs text-red-1 text-left mt-1 ml-2">不可超過20個字</div>
                                    )}
                                    {errors.name?.type === 'minLength' && (
                                        <div className="text-xs text-red-1 text-left mt-1 ml-2">不可少於3個字</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="labelField">電郵地址</label>
                                    <input type="text" className={`inputField ${errors.email && 'border-red-1 focus:outline-red-1'}`} placeholder="電郵地址" {...register(`email`, { "required": "請輸入電郵地址", pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} onChange={(e) => setEmail(e.target.value)} />
                                    {errors.email && <p className="ml-2 mt-1 mb-0 text-xs text-red-1">{errors.email.message}</p>}
                                    {errors.email?.type === 'pattern' && (
                                        <div className="text-xs text-red-1 text-left mt-1 ml-2">請輸入有效電郵地址</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="labelField">電話</label>
                                    <input type="text" className={`inputField ${errors.phone && 'border-red-1 focus:outline-red-1'}`} placeholder="電話" {...register(`phone`, { "required": "請輸入電話"})} onChange={(e) => setPhone(e.target.value)} />
                                    {errors.phone && <p className="ml-2 mt-1 mb-0 text-xs text-red-1">{errors.phone.message}</p>}
                                    {errors.phone?.type === 'pattern' && (
                                        <div className="text-xs text-red-1 text-left mt-1 ml-2">請輸入有效電話</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="labelField">密碼</label>
                                    <input type="password" className={`inputField ${errors.password && 'border-red-1 focus:outline-red-1'}`} placeholder="密碼" {...register(`password`, { "required": "請輸入密碼", minLength: 3, maxLength: 20 })} onChange={(e) => setPassword(e.target.value)} />
                                    {errors.password && <p className="ml-2 mt-1 mb-0 text-xs text-red-1">{errors.password.message}</p>}
                                    {errors.password?.type === 'maxLength' && (
                                        <div className="text-xs text-red-1 text-left mt-1 ml-2">不可超過20個字</div>
                                    )}
                                    {errors.password?.type === 'minLength' && (
                                        <div className="text-xs text-red-1 text-left mt-1 ml-2">不可少於3個字</div>
                                    )}
                                </div>
                                <div className="">
                                    <label className="labelField">確認密碼</label>
                                    <input type="password" className={`inputField ${errors.confirm_password && 'border-red-1 focus:outline-red-1'}`} placeholder="確認密碼" {...register(`confirm_password`, { "required": "請確認密碼", validate: {matchPw: (value) => value === watch('password') || '兩組密碼不相符'} })} onChange={(e) => setPassword(e.target.value)} />
                                    {errors.confirm_password && <p className="ml-2 mt-1 mb-0 text-xs text-red-1">{errors.confirm_password.message}</p>}
                                </div>
                                <button type="submit" className={`align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-bold focus:outline-none px-4 py-2 rounded-lg text-sm text-white-1 bg-theme-color-1  border border-transparent active:bg-theme-color-1  hover:bg-theme-color-1  focus:ring focus:ring-[rgb(216,180,254)] mt-4 h-12 w-full disabled:opacity-50 disabled:cursor-not-allowed`} disabled={isLoading}>建立帳號</button>
                            </form>
                            <hr className="mt-10" />
                            <p className="mt-1 flex text-sm items-center">
                                已經是會員？
                                <a class="text-sm font-bold !text-theme-color-2 hover:!underline" href="/login">按此登入</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        {/* <Container>
            <Row>
                <Col md={6} className="flex flex-col justify-center items-center h-[calc(100vh-59px)]">
                    <Form style={{ width: "100%" }} onSubmit={handleSignup}>
                        <h1>Create an account</h1>
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Your name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

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
                                Create account
                            </Button>
                        </Form.Group>
                        <p className="pt-3 text-center">
                            Don't have an account? <Link to="/login">Login</Link>{" "}
                        </p>
                    </Form>
                </Col>
                <Col md={6} className="bg-[url(https://images.unsplash.com/photo-1612690669207-fed642192c40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dGVjaHxlbnwwfDF8MHx3aGl0ZXw%3D&auto=format&fit=crop&w=800&q=60)] h-[calc(100vh-56px)] bg-cover hidden md:block"></Col>
            </Row>
        </Container> */}
        </div>

    );
}

export default Signup;
