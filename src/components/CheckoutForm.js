import { FormControlLabel, Checkbox } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("");
    const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [paying, setPaying] = useState(false);
    const { register, trigger, formState: { errors, isValid }, handleSubmit, watch, reset, resetField } = useForm({
        mode: 'all',

    });

    const handlePay = async (data, e) => {
        console.log(data);
        setAddress(data.address)
        setCountry('Hong Kong')
        e.preventDefault();
        if (!stripe || !elements || user.cart.count <= 0) return;
        setPaying(true);
        const { client_secret } = await fetch("http://156.67.221.40:8080/create-payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ",
            },
            body: JSON.stringify({ amount: user.cart.total * 100 }),
        }).then((res) => res.json());
        const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        setPaying(false);

        if (paymentIntent) {
            createOrder({ userId: user._id, cart: user.cart, address, country }).then((res) => {
                if (!isLoading && !isError) {
                    setAlertMessage(`Payment ${paymentIntent.status}`);
                    setTimeout(() => {
                        navigate("/orders");
                    }, 2000);
                }
            });
        }
    }
    /* async function handlePay(e) {
        e.preventDefault();
        if (!stripe || !elements || user.cart.count <= 0) return;
        setPaying(true);
        const { client_secret } = await fetch("http://localhost:8080/create-payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ",
            },
            body: JSON.stringify({ amount: user.cart.total }),
        }).then((res) => res.json());
        const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });
        setPaying(false);

        if (paymentIntent) {
            createOrder({ userId: user._id, cart: user.cart, address, country }).then((res) => {
                if (!isLoading && !isError) {
                    setAlertMessage(`Payment ${paymentIntent.status}`);
                    setTimeout(() => {
                        // navigate("/orders");
                    }, 3000);
                }
            });
        }
    } */

    return (
        <form noValidate onSubmit={handleSubmit(handlePay)} className="mt-10">

            <div>
                <label className="labelField">聯絡資訊 <span className="absolute -top-1 -right-2 text-red-1 font-bold">*</span></label>
                <input type="text" className={`inputField ${errors.email && 'border-red-1'}`} placeholder="電子郵件" {...register(`email`, { "required": "請輸入" })} />
                {errors.email && <p className="ml-2 mt-1 mb-0 text-xs text-red-1">{errors.email.message}</p>}
            </div>
            <FormControlLabel
                sx={{ marginRight: '0' }}
                control={<Checkbox name="checkbox" size="small" {...register(`checkbox1`)} />}
                label="以電子郵件傳送最新消息和優惠活動給我"

            />
            <h5 className="py-3 mb-0">運送地址（可輸入順豐自取點／智能櫃地址）</h5>
            <div className="grid gap-3">
                <div className="col-span-2">
                    <label className="labelField">國家/地區</label>
                    <input type="text" className="inputField" disabled={true} value="中國香港特別行政區" placeholder="國家/地區" />
                </div>
                <div className="col-span-1">
                    <label className="labelField">名字(選填)</label>
                    <input type="text" className="inputField" placeholder="名字(選填)" {...register(`firstName`)} />

                </div>
                <div className="col-span-1">
                    <label className="labelField">姓氏<span className="absolute -top-1 -right-2 text-red-1 font-bold">*</span></label>
                    <input type="text" className={`inputField ${errors.lastName && 'border-red-1'}`} placeholder="姓氏" {...register(`lastName`, { "required": "請輸入" })} />
                    {errors.lastName && <p className="ml-2 mt-1 mb-0 text-xs text-red-1">{errors.lastName.message}</p>}
                </div>
                <div className="col-span-2">
                    <label className="labelField">地址<span className="absolute -top-1 -right-2 text-red-1 font-bold">*</span></label>
                    <input type="text" className={`inputField ${errors.address && 'border-red-1'}`} placeholder="地址" {...register(`address`, { "required": "請輸入" })} />
                    {errors.address && <p className="ml-2 mt-1 mb-0 text-xs text-red-1">{errors.address.message}</p>}
                </div>
                <div className="col-span-2">
                    <label className="labelField">電話<span className="absolute -top-1 -right-2 text-red-1 font-bold">*</span></label>
                    <input type="text" className={`inputField ${errors.phoneNum && 'border-red-1'}`} placeholder="電話" {...register(`phoneNum`, {
                        "required": "請輸入",
                        "pattern": {
                            "value": "^[0-9]+$",
                            "message": "只接受數字"
                        }
                    })} />
                    {errors.phoneNum && <p className="ml-2 mt-1 mb-0 text-xs text-red-1">{errors.phoneNum.message}</p>}
                </div>

            </div>
            <FormControlLabel
                sx={{ marginRight: '0', marginTop: '10px', display: 'block' }}
                control={<Checkbox name="checkbox" size="small" {...register(`checkbox2`)} />}
                label="儲存此資訊供下次使用"

            />
            <FormControlLabel
                sx={{ marginRight: '0', display: 'block' }}
                control={<Checkbox name="checkbox" size="small" {...register(`checkbox3`)} />}
                label="以簡訊傳送最新消息和優惠活動給我"

            />
            <label htmlFor="card-element">Card</label>
            <CardElement id="card-element" />
            <Button className="mt-3" type="submit" disabled={user.cart.count <= 0 || paying || isSuccess}>
                {paying ? "Processing..." : "Pay"}
            </Button>

            <div className="flex items-center justify-between mt-5">
                <a href="/cart" className="flex gap-x-2 items-center text-base text-theme-color-1 hover:opacity-75" >
                    <ArrowLeftIcon className="w-3 h-3" />
                    返回購物車
                    </a>
                <button
                    disabled={!isValid}
                    type="submit"
                    className="w-fit bg-theme-color-1 text-white text-base rounded-3xl px-10 py-2 mx-0 hover:opacity-80 hover:disabled:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    提交
                </button>
            </div>
            {alertMessage && <Alert>{alertMessage}</Alert>}


            {/* <Col className="cart-payment-container">
                <Form onSubmit={handlePay}>
                    <Row>
                        {alertMessage && <Alert>{alertMessage}</Alert>}
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" value={user.name} disabled />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Email" value={user.email} disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7}>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col md={5}>
                            <Form.Group className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                            </Form.Group>
                        </Col>
                    </Row>

                </Form>
            </Col> */}
        </form>

    );
}

export default CheckoutForm;
