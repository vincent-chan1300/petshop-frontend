import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation, useChangeProductCountMutation } from "../services/appApi";
import "./CartPage.css";
import { ShoppingBagIcon, PlusIcon, TrashIcon, MinusIcon } from '@heroicons/react/24/outline'
import { useForm, Controller } from "react-hook-form"
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import SimilarProduct from "../components/SimilarProduct";
import { Navigate, useNavigate } from "react-router-dom";
import EditModal from "../components/EditModal";
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC}`);

function CartPage() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);
    const [productCount, setProductCount] = useState(0);

    const [mayLikeProducts, setMayLikeProducts] = useState(null);

    const [increaseCart] = useIncreaseCartProductMutation();
    const [decreaseCart] = useDecreaseCartProductMutation();
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
    const [changeProductCount, { isSuccess }] = useChangeProductCountMutation();

    const displayMayLikeProducts = () => {
        let youMayAlsoLikeProducts = [];
        let shuffled = products?.sort(() => 0.5 - Math.random());
        cart.map((cartItem) => {
            shuffled = shuffled.filter(item => item._id != cartItem._id)
        })

        let random_product_arr = shuffled?.slice(0, 4);

        if (random_product_arr) {
            youMayAlsoLikeProducts = random_product_arr.map((product, idx) => {
                return (
                    <div className="item" key={idx }data-value={idx}>
                        <SimilarProduct {...product} />
                    </div>
                )
            });
            setMayLikeProducts(youMayAlsoLikeProducts)
        }
    }
    useEffect(() => {
        displayMayLikeProducts();
    }, [])
    function handleDecrease(product) {
        const quantity = user.cart.count;
        if (quantity <= 0) return alert("Can't proceed");
        decreaseCart(product);
    }
    const { register, unregister, control, trigger, setError, formState: { errors, isSubmitSuccessful, isValid }, handleSubmit, watch, reset, resetField } = useForm({
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
            navigate('/checkout');


        }
    }

    const handleInputOnChange = (e) => {

        if (Number(e.target.value)) {
            if (e.target.value <= 0) {

                setProductCount(1);
            } else if (e.target.value > 99) {
                setProductCount(99);
            } else {
                setProductCount(e.target.value);
            }

        }
    }







    return (
        <div>
            <div className={`min-h-[95vh]`}>
                <div className="bg-gray py-12 text-center">
                    <span className="text-white text-lg">我的購物車</span>
                </div>
                <div className={`section-container mt-16`}>
                    {cart.length === 0 && (
                        <div className="text-center pt-16">
                            <div className="relative">
                                <PlusIcon className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-3  w-16 aspect-[1/1] rotate-45 block" />
                                <ShoppingBagIcon className="relative w-32 aspect-[1/1] mx-auto" />
                            </div>

                            <h3 className=" py-8">購物車暫時沒有產品</h3>

                            <a href="/category" className="inline-flex justify-center items-center px-5 py-2 text-white bg-theme-color-1 rounded-3xl transition-opacity duration-100 hover:opacity-70 ">返回商店</a>
                        </div>

                    )}
                    {cart.length > 0 && (
                        <div>
                            <div className=" mb-10">
                                <div className="hidden md:flex pt-5 pb-2 text-base font-bold border-b-[1px] border-light-gray w-full justify-between px-3">
                                    <div className="flex-[2]">產品</div>
                                    <div className="flex-1 text-center">價格</div>
                                    <div className="flex-1 text-center">數量</div>
                                    <div className="flex-1 text-center">總額</div>

                                </div>
                                <div>
                                    {cart.map((item, index) => {
                                        return (
                                            <div key={index} className="p-3 md:py-6 md:!px-0 border-[1px] md:border-0 md:border-b-[1px] border-light-gray mb-3 md:mb-0">
                                                <div className="flex flex-col md:flex-row justify-between md:items-center w-full text-base">
                                                    <div className="flex gap-x-4 flex-[2] font-bold">
                                                        <a href={`/product/${item._id}`} className='block max-w-[120px] min-w-[120px]' >
                                                            <img className="w-full aspect-[1/1]" src={item.pictures[0].url} alt="product_img" />
                                                        </a>
                                                        <div>
                                                            <a href={`/product/${item._id}`} className='block mb-3'>
                                                                <span className="hover:text-theme-color-1 transition-all duration-200">{item.name}</span>
                                                            </a>

                                                            <TrashIcon className="w-5 h-5 cursor-pointer hover:opacity-80" onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })} />

                                                        </div>
                                                    </div>
                                                    <div className="flex-1 text-theme-color-1 text-sm md:text-left text-center pt-[10px] md:pt-0">
                                                        <span><span className="inline-block md:hidden">價格：</span>${item.price}</span>

                                                    </div>
                                                    <div className="flex-1 my-3 md:my-0">
                                                        
                                                        <div className="flex flex-col justify-center items-center gap-y-1">
                                                                <span className={`font-bold`}>{user.cart[item._id]}</span>
                                                                <EditModal btnText="修改" productIdCount={user.cart[item._id]} productId={item._id} price= {item.price} userId={user._id} />
                                                            </div>
                                                    </div>
                                                    <div className="flex-1 text-sm text-center md:!text-right font-bold">
                                                        <span><span className="inline-block md:hidden">總額：</span>${item.price * user.cart[item._id]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            {!user.isAdmin && (
                                <form noValidate method="post" className="py-8">
                                <div className="flex flex-col md:flex-row justify-between w-full">
                                    <div className="flex-1">
                                        <p>備注</p>
                                        <textarea rows={5} className="w-full text-sm px-2 py-2 inline-block border-[#000] border-[1px] " placeholder="可填寫此欄給作運送提醒或備註" {...register("remarks")}></textarea>


                                    </div>
                                    <div className="flex-1 text-right mt-10 md:mt-0">
                                        <h5 className="mb-3">小計：${user.cart.total}</h5>
                                        <p className="text-sm mb-2">【請在付款前參閱本網站條款及細則】</p>
                                        <FormControlLabel
                                            sx={{ marginRight: '0' }}
                                            control={<Checkbox name="checkbox" {...register(`agreement`, { "required": "您必須同意本網店條款及細則以完成結帳手續。" })} />}
                                            label="我同意本網站條款及細則。"
                                            error={errors.agreement}
                                            helpertext={errors.agreement?.message}
                                        />
                                        <div>
                                            <button
                                                disabled={!isValid}
                                                onClick={handleSubmit(onSubmit)}
                                                type="button"
                                                className="w-fit mt-6 bg-theme-color-1 text-white text-base rounded-3xl px-10 py-2 mx-0 hover:opacity-80 hover:disabled:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                結帳
                                            </button>
                                        </div>

                                    </div>
                                </div>

                            </form>
                            )}
                            
                        </div>

                    )}
                    {!user.isAdmin && (
                        <div className="py-16">
                        <h4 className="text-center">查看其他你可能喜歡的產品</h4>
                        <p className="italic text-gray text-sm text-center">切勿錯過我們最新的優惠</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
                            {mayLikeProducts}
                        </div>
                    </div>
                    )}
                    
                </div>
            </div>
            
        </div>

    );
}

export default CartPage;
