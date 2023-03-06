import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateOrderMutation, useCreateOrderByAdminMutation, useRemoveFromCartMutation } from "../services/appApi";
import { CloudArrowUpIcon, ChevronDownIcon, ArrowLongLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

import toast from "react-hot-toast";
import axios from "axios";


function CreateOrder() {
    useEffect(() => {
        axios
            .get("http://156.67.221.40:8080/users")
            .then(({ data }) => {
                setMembers(data)
                setDupMembers(data)
                console.log(data);
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, []);
    const navigate = useNavigate();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [memberId, setMemberId] = useState("");
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);
    const [dupMembers, setDupMembers] = useState(null)
    const [members, setMembers] = useState(null)
    const [createOrderByAdmin, { isLoading, isError, isSuccess }] = useCreateOrderByAdminMutation();
    const [createOrder, { isLoading2, isError2, isSuccess2 }] = useCreateOrderMutation();
    const [removeFromCart, { isLoadingRemove }] = useRemoveFromCartMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (address !== '' && country !== '' && memberId !== '') {
            if (memberId !== '-') {
                createOrderByAdmin({ userId: memberId, adminId: user._id, cart: user.cart, address, country }).then((res) => {
                    if (!isLoading && !isError) {
                        toast.success("訂單建立成功");
                        navigate("/");
                    }
                });
            }else {
                createOrder({ userId: user._id, cart: user.cart, address, country }).then((res) => {
                    if (!isLoading && !isError) {
                        toast.success("訂單建立成功");
                        navigate("/");
                    }
                });
            }

        }else {
            toast.error("請輸入全部欄位");
        }
    }
    const handleSearchKeyWord = (e) => {
        e.preventDefault();
        var searchKeyWord = e.target.value

        if (searchKeyWord !== "") {
            let matched = members.filter((member) => member.name.toLowerCase().includes(searchKeyWord.toLowerCase()));
            console.log(matched);
            setMembers(matched);
        } else {
            setMembers(dupMembers);
        }

    }
    return (
        <div>
            <div className="flex flex-col w-full h-full justify-between max-w-3xl mx-auto pt-4">
                <Link className="pl-6 pb-3 flex items-center gap-2 w-fit" to="/admin">
                    <ArrowLongLeftIcon className="w-6 h-6" />
                    <span>返回</span>

                </Link>
                <div className="w-full relative p-6 border-b border-[rgb(243,244,246)] bg-[rgb(249,250,251)]">
                    <div>
                        <h4 className="text-xl font-medium">建立訂單</h4>
                        <p className="mb-0 text-sm">從這裡建立您的訂單</p>
                    </div>
                </div>
                {cart.length > 0 && (
                <div className="w-full relative">
                    <form noValidate className="w-full">
                        <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">


                                <div className=" mb-10">
                                    <div className="hidden md:flex pb-2 text-base font-bold border-b-[1px] border-light-gray w-full justify-between px-3">
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
                                                                {/* <EditModal btnText="修改" productIdCount={user.cart[item._id]} productId={item._id} price={item.price} userId={user._id}  /> */}
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



                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 items-center">
                                <label className="labelField col-span-4 sm:col-span-2">地址</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input onChange={(e) => setAddress(e.target.value)} className="inputField overflow-auto" type="text" rows="4" required />
                                </div>

                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 items-center">
                                <label className="labelField col-span-4 sm:col-span-2">城市</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input onChange={(e) => setCountry(e.target.value)} className="inputField" type="text" required />
                                </div>

                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 items-center">
                                <label className="labelField col-span-4 sm:col-span-2">會員</label>
                                <div className="col-span-8 sm:col-span-4 relative">

                                    <input className="w-[90%] inputField absolute border-tr-none border-br-none" onKeyUp={handleSearchKeyWord}/>
                                    <select className="w-full inputField" onChange={(e) => setMemberId(e.target.value)}>
                                        <option hidden value="">請選擇會員</option>
                                        <option value="-">非會員</option>
                                        {members?.map(member => {
                                            return (
                                                <option value={member._id}>{member.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                            </div>

                        {/*

                            <button type="button" onClick={handleSubmit} className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm !text-white-1 bg-[rgb(34,197,94)] border border-transparent active:bg-[rgb(22,163,74)] hover:bg-[rgb(22,163,74)] focus:ring focus:ring-[rgb(216,180,254)] w-full rounded-md h-12 mt-10">建立訂單</button>
                                    */}
                            </div>


                    </form>
                </div>
                )}
                {cart.length <= 0 && (
                    <div className="py-5 text-center">請先加入商品</div>
                )}
            </div>
        </div>
    )
}

export default CreateOrder