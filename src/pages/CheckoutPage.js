import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from 'react'
import CheckoutForm from '../components/CheckoutForm'
import { useSelector } from "react-redux";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography } from "@mui/material";
import { ArrowDownIcon, ChevronDownIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";


const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC}`);

function CheckoutPage() {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);

    const { register, trigger, formState: { isValid }, handleSubmit, watch, reset, resetField } = useForm({
        mode: 'all',

    });
    const onSubmit = async (data, e) => {
        e.preventDefault()
        Object.keys(data).forEach(function (key) {
            if (data[key] === undefined) {
                data[key] = ""
            }

        });
        const noError = await trigger();
        if (noError) {



        }
    }
    return (
        <div>
            {cart.length === 0 && (
                <div className="py-32">
                    <div className="text-center">
                        <div className="relative">
                            <PlusIcon className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-3  w-16 aspect-[1/1] rotate-45 block" />
                            <ShoppingBagIcon className="relative w-32 aspect-[1/1] mx-auto" />
                        </div>

                        <h3 className=" py-8">購物車暫時沒有產品</h3>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-y-5 md:gap-y-0 md:gap-x-7">
                            <a href="/" className="inline-flex justify-center items-center px-5 py-2 text-white bg-theme-color-1 rounded-3xl transition-opacity duration-100 hover:opacity-70 ">返回主頁</a>
                            <a href="/category" className="inline-flex justify-center items-center px-5 py-2 text-white bg-theme-color-1 rounded-3xl transition-opacity duration-100 hover:opacity-70 ">繼續購物</a>
                        </div>

                    </div>
                </div>
            )}
            {cart.length > 0 && (
                <div className='flex flex-col-reverse md:flex-row min-h-[95vh]'>
                    <div className='flex-1 flex justify-center md:justify-end '>
                        <div className="p-6 md:p-16 md:border-r-[1px] border-light-gray max-w-xl justify-end">
                            <a href="/" className='text-xl block'>
                                毛孩物語Pets Thing｜香港寵物貓狗用品專門店：IATA寵物飛機籠、寵物手推車、貓爬架貓樹
                            </a>

                            <Elements stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>

                        </div>

                    </div>
                    <div className="block md:hidden mt-10">
                        <Accordion sx={{ border: '1px solid gray', mb: '20px !important', maxWidth: '700px', mx: '20px !important', px: '10px' }}>
                            <AccordionSummary
                                expandIcon={<ArrowDownIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                                <div className="flex items-center">
                                    <Typography sx={{ fontWeight: 'bold' }}>訂單摘要</Typography>
                                    <ChevronDownIcon className="w-5 h-5 ml-1" />
                                </div>

                                <Typography sx={{ fontWeight: 'bold' }}>${user.cart.total}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="w-full md:w-auto">
                                    {user.cart.total !== 0 ? (
                                        <div className='pb-3 border-b-[1px] border-light-gray flex flex-col gap-y-4'>
                                            {cart.map((item, index) => {
                                                return (
                                                    <div key={index} className='flex justify-between items-center gap-x-5'>
                                                        <div className='relative bg-white-1 rounded-lg border-light-gray border-[1px] max-w-[64px] min-w-[64px]'>
                                                            <img className="aspect-[1/1] object-contain rounded-lg" src={item.pictures[0].url} alt="product_img" />
                                                            <span className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gray text-white-1 rounded-full flex justify-center items-center text-xs font-bold">{user.cart[item._id]}</span>
                                                        </div>
                                                        <h6 className="!font-normal mb-0 w-full">{item.name}</h6>
                                                        <h6 className="text-sm ml-10 mb-0">${item.price}</h6>
                                                    </div>
                                                )

                                            })}
                                        </div>
                                    ) : (
                                        <p>購物車暫時沒有產品</p>
                                    )}

                                    <div className='py-3 border-b-[1px] border-light-gray'>
                                        <form noValidate method="post" className="flex items-center justify-between">
                                            <div className="w-3/4 mr-3">
                                                <label className="labelField">禮品卡或折扣碼</label>
                                                <input type="text" className="inputField" placeholder="禮品卡或折扣碼" {...register(`discountCode`, { "required": "請輸入禮品卡或折扣碼" })} />
                                            </div>
                                            <button
                                                disabled={!isValid}
                                                onClick={handleSubmit(onSubmit)}
                                                type="button"
                                                className="flex justify-center font-bold mt-6 bg-theme-color-1 text-white text-base rounded-lg px-3 py-2 mx-0 hover:opacity-80 hover:disabled:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[70px]"
                                            >
                                                套用
                                            </button>
                                        </form>
                                    </div>
                                    <div className='py-3 border-b-[1px] border-light-gray text-sm'>
                                        <div className="flex mb-3 justify-between ">
                                            <span>小計</span>
                                            <span className="font-bold">${user.cart.total}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>運送</span>
                                            <span className="text-gray">於下一步計算</span>
                                        </div>
                                    </div>
                                    <div className="py-3">
                                        <div className="flex justify-between">
                                            <span>總計</span>
                                            <span className="font-bold text-lg">HKD ${user.cart.total}</span>
                                        </div>
                                    </div>
                                </div>

                            </AccordionDetails>
                        </Accordion>
                    </div>


                    <div className='flex-1 bg-[#F9F9F9] hidden md:flex justify-center md:justify-start '>
                        <div className="w-full md:w-auto p-10 md:p-16">
                            {user.cart.total !== 0 ? (
                                <div className='pb-3 border-b-[1px] border-light-gray flex flex-col gap-y-4'>
                                    {cart.map((item, index) => {
                                        return (
                                            <div key={index} className='flex justify-between items-center gap-x-5'>
                                                <div className='relative bg-white-1 rounded-lg border-light-gray border-[1px] max-w-[64px] min-w-[64px]'>
                                                    <img className="aspect-[1/1] object-contain rounded-lg" src={item.pictures[0].url} alt="product_img" />
                                                    <span className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gray text-white-1 rounded-full flex justify-center items-center text-xs font-bold">{user.cart[item._id]}</span>
                                                </div>
                                                <h6 className="!font-normal mb-0 w-full">{item.name}</h6>
                                                <h6 className="text-sm ml-10 mb-0">${item.price}</h6>
                                            </div>
                                        )

                                    })}
                                </div>
                            ) : (
                                <p>購物車暫時沒有產品</p>
                            )}

                            <div className='py-3 border-b-[1px] border-light-gray'>
                                <form noValidate method="post" className="flex items-center justify-between">
                                    <div className="w-3/4 mr-3">
                                        <label className="labelField">禮品卡或折扣碼</label>
                                        <input type="text" className="inputField" placeholder="禮品卡或折扣碼" {...register(`discountCode`, { "required": "請輸入禮品卡或折扣碼" })} />
                                    </div>
                                    <button
                                        disabled={!isValid}
                                        onClick={handleSubmit(onSubmit)}
                                        type="button"
                                        className="flex justify-center font-bold mt-6 bg-theme-color-1 text-white text-base rounded-lg px-3 py-2 mx-0 hover:opacity-80 hover:disabled:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[70px]"
                                    >
                                        套用
                                    </button>
                                </form>
                            </div>
                            <div className='py-3 border-b-[1px] border-light-gray text-sm'>
                                <div className="flex mb-3 justify-between ">
                                    <span>小計</span>
                                    <span className="font-bold">${user.cart.total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>運送</span>
                                    <span className="text-gray">於下一步計算</span>
                                </div>
                            </div>
                            <div className="py-3">
                                <div className="flex justify-between">
                                    <span>總計</span>
                                    <span className="font-bold text-lg">HKD ${user.cart.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>

    )
}

export default CheckoutPage