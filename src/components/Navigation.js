import axios from "../axios";
import React, { useRef, useState } from "react";
import { Navbar, Button, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../features/userSlice";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import logoImg from "../images/logo.png"
/* import "./Navigation.css"; */

function Navigation() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const bellRef = useRef(null);
    const notificationRef = useRef(null);
    const [bellPos, setBellPos] = useState({});
    const [isOpen, setIsOpen] = useState(false)
    const [mobileCollapse, setMobileCollapse] = useState(false)
    const [mobileCollapse2, setMobileCollapse2] = useState(false)
    const [isDropDownOpen, setDropDownOpen] = useState(false)
    const [isDropDownOpen2, setDropDownOpen2] = useState(false)
    const initMobileMenu = () => {
        if (window.innerWidth > 767) {
            setIsOpen(false)
            setMobileCollapse(false)
            setMobileCollapse2(false)
        }
    }

    function handleLogout() {
        dispatch(logout());
    }
    const unreadNotifications = user?.notifications?.reduce((acc, current) => {
        if (current.status == "unread") return acc + 1;
        return acc;
    }, 0);

    function handleToggleNotifications() {
        const position = bellRef.current.getBoundingClientRect();
        setBellPos(position);
        notificationRef.current.style.display = notificationRef.current.style.display === "block" ? "none" : "block";
        dispatch(resetNotifications());
        if (unreadNotifications > 0) axios.post(`/users/${user._id}/updateNotifications`);
    }

    return (

        <header className='z-[999]'>
            <nav className=' w-full h-full bg-[#fff] shadow-[0_4px_2px_-2px_rgba(149,157,165,0.2)] md:h-auto '>
                <div className='section-container'>
                    <div className='flex justify-between items-center'>
                        <Sidebar />
                        <div className='flex items-center'>

                            <a href="/" className="">
                                <div className='max-w-[100px] sm:max-w-[170px] lg:max-w-[250px] pt-2'>
                                    <img className="w-40 mr-8" src={logoImg} alt="logo"></img>
                                </div>
                            </a>

                            <div className='ml-[30px] lg:ml-[50px] text-base hidden md:block'>
                                <ul className='flex mb-0 pl-0'>
                                    <li>
                                        <a href="/category" className='inline-block font-bold px-3 py-[20px] lg:py-[25px] text-black opacity-60 hover:opacity-100  '>貨品一覽</a>
                                    </li>
                                    <li>
                                        <a href="/category/dog" className='inline-block font-bold px-3 py-[20px] lg:py-[25px] text-black opacity-60 hover:opacity-100  '>狗仔專區</a>
                                    </li>

                                    <li>
                                        <a href="/category/cat" className='inline-block font-bold px-3 py-[20px] lg:py-[25px] text-black opacity-60 hover:opacity-100  '>貓仔專區</a>
                                    </li>

                                    {/*
                                    <li className='relative group'>
                                        <a href="/" className='flex items-center px-3 py-[20px] lg:py-[25px] text-black opacity-60 hover:opacity-100  cursor-default pointer-events-none font-bold'>
                                            導師專區
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-3`} fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </a>
                                        <ul className='py-[10px] pl-0 pt-0 min-w-[160px] max-w-[240px] scale-0 transition-all ease-linear origin-top-left absolute top-full z-10 group-hover:scale-100'>
                                            <li>
                                                <a href="/tutorfee" className='bg-white block px-3 py-[15px] text-[rgba(0,0,0,.6)] hover:text-[rgba(0,0,0,1)]  '>導師收費</a>
                                            </li>

                                        </ul>
                                    </li>
                                    */}
                                    {/*
                                    <li>
                                        <a href="/contactus" className='inline-block px-3 py-[20px] lg:py-[25px] text-black opacity-60 hover:opacity-100 font-bold'>關於我們</a>
                                    </li>
                                    */}

                                </ul>
                            </div>
                        </div>

                        <div className="flex items-center md:gap-x-4">
                            <div className="relative">

                                {isDropDownOpen2 && (


                                    <div className='rounded-lg absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[300px] bg-white btn-shadow hidden md:block'>
                                        <div className='rounded-xl px-3 text-sm w-full'>
                                            <form noValidate className="relative py-3">
                                                <input placeholder="搜尋.." className="bg-[#eee] w-full max-w-xs py-2 px-2 border-[#eee] rounded pr-5" />
                                                <button className="absolute right-2 top-1/2 -translate-y-1/2" type="submit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                                    </svg>

                                                </button>
                                            </form>
                                        </div>

                                    </div>


                                )}
                            </div>

                            {!user && (
                                <div className="flex items-center relative md:gap-x-4">
                                    {/* <a href="/login" className="mobile-nav-item md:hidden">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>


                                        </a> */}
                                    <Link to={`/login`} className="hidden md:block">
                                        <i className="fas fa-shopping-cart text-theme-color-2 text-[20px]"></i>
                                    </Link>

                                    <a href="/login" className="hidden bg-theme-color-1 rounded-3xl md:flex justify-center items-center px-3 py-1 !text-[#fff] font-bold theme-color-2-hover">
                                        <span>登入/註冊</span>

                                    </a>
                                </div>

                            )}
                            {user && (

                                <div className='flex items-center relative md:gap-x-4'>

                                    {!user.isAdmin && (
                                        <a href="/cart" className="hidden md:block">
                                            <i className="fas fa-shopping-cart text-[20px]"></i>
                                            {user?.cart.count > 0 && (
                                                <span className="badge badge-warning text-[10px] bg-[#ff0000] text-white !py-0.5 px-1 align-top -ml-2 !rounded-full -mt-[5px] " id="cartcount">
                                                    {user.cart.count}
                                                </span>
                                            )}
                                        </a>
                                    )}

                                    <div className="relative ml-2">

                                        <div className="p-3 max-h-[200px] overflow-y-scroll border-[1px] border-none bg-white w-[200px] z-[99] absolute top-full mt-2 right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 btn-shadow rounded-lg" ref={notificationRef} style={{ display: "none" }}>
                                            {user?.notifications.length > 0 ? (
                                                user?.notifications.map((notification) => (
                                                    <p className={`${notification.status === 'read' ? 'bg-light-blue' : ''} ${notification.status === 'unread' ? 'bg-lightcoral' : ''}`}>
                                                        {notification.message}
                                                        <br />
                                                        <span>{notification.time.split("T")[0] + " " + notification.time.split("T")[1]}</span>
                                                    </p>
                                                ))
                                            ) : (
                                                <p>No notifcations yet</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <button className='relative items-center border-2 rounded-full border-theme-color-1 px-2 py-1  cursor-pointer hidden md:flex' onClick={() => setDropDownOpen(!isDropDownOpen)}>
                                            {user.name}
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-3 h-4 w-4 ${isDropDownOpen && 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {isDropDownOpen && (
                                            <div className='rounded-lg absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[160px] bg-white btn-shadow hidden md:block'>
                                                <div className='rounded-xl px-3 py-4 text-sm'>
                                                    {user.isAdmin && (
                                                        <div>
                                                            <a href="/admin" className='text-black font-bold hover:opacity-50 block mb-3 text-center'>管理員版面</a>
                                                            <a href="/admin/new-product" className='text-black font-bold hover:opacity-50 block mb-3 text-center'>建立產品</a>
                                                        </div>

                                                    )}
                                                    {!user.isAdmin && (
                                                        <div>
                                                            <a href="/orders" className='text-black font-bold hover:opacity-50 block mb-3 text-center'>我的訂單</a>
                                                            <a href="/cart" className='text-black font-bold hover:opacity-50 block mb-3 text-center'>購物車</a>
                                                        </div>

                                                        )}

                                                    <button onClick={handleLogout} className='w-full text-white bg-theme-color-1 rounded-full px-2 py-2 font-bold  hover:opacity-80 block'>登出</button>
                                                </div>

                                            </div>
                                        )}
                                    </div>




                                </div>

                            )}




                        </div>






                    </div>

                </div>
            </nav>
            <div className={`fixed top-[60px] w-full bg-white ${isOpen ? "block h-full" : "hidden"}`}>
                <div className=''>
                    <ul className='mt-[20px]'>
                        <li>
                            <a href="/" className='inline-block px-3 py-[7px] pl-[20px] w-full text-black opacity-60 hover:opacity-100'>主頁</a>
                        </li>

                        <li>
                            <a href="/showcase" className='inline-block px-3 py-[7px] pl-[20px] w-full text-black opacity-60 hover:opacity-100'>補習個案</a>
                        </li>

                        <li className='relative'>
                            <div onClick={() => setMobileCollapse(!mobileCollapse)}>
                                <a href="#" className='inline-block px-3 py-[7px] pl-[20px] text-black w-[85%] opacity-60 mr-[50px] hover:opacity-100'>導師專區</a>
                                <div className='cursor-pointer absolute top-0 right-0 mt-[2px] mr-[10px] w-[35px] h-[35px] text-center opacity-60 flex justify-center items-center hover:opacity-100' >
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${mobileCollapse ? "hidden" : "block"} transition-all duration-200`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${mobileCollapse ? "block" : "hidden"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                    </svg>
                                </div>
                            </div>

                            <ul className={`ml-[30px] overflow-hidden transition-all ${mobileCollapse ? "max-h-[1000px]" : "max-h-0"}`}>



                                <li>
                                    <a href="/tutorfee" className='inline-block px-3 py-[7px] pl-[20px] w-full text-black opacity-60 hover:opacity-100'>導師收費</a>
                                </li>

                                <li>
                                    <a href="/tutorzone" className='inline-block px-3 py-[7px] pl-[20px] w-full text-black opacity-60 hover:opacity-100'>導師條款與守則</a>
                                </li>

                            </ul>
                        </li>
                        <li className='relative'>
                            <div onClick={() => setMobileCollapse2(!mobileCollapse2)}>
                                <a href="#" className='inline-block px-3 py-[7px] pl-[20px] text-black w-[85%] opacity-60 mr-[50px] hover:opacity-100'>家長專區</a>
                                <div className='cursor-pointer absolute top-0 right-0 mt-[2px] mr-[10px] w-[35px] h-[35px] text-center opacity-60 flex justify-center items-center hover:opacity-100' >
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${mobileCollapse2 ? "hidden" : "block"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${mobileCollapse2 ? "block" : "hidden"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                    </svg>
                                </div>
                            </div>

                            <ul className={`ml-[30px] overflow-hidden transition-all ${mobileCollapse2 ? "max-h-[1000px]" : "max-h-0"}`}>
                                <li>
                                    <a href="/registerform" className='inline-block px-3 py-[7px] pl-[20px] w-full text-black opacity-60 hover:opacity-100'>登記補習個案</a>
                                </li>
                                <li>
                                    <a href="/tuitionfee" className='inline-block px-3 py-[7px] pl-[20px] w-full text-black opacity-60 hover:opacity-100'>學費參考</a>
                                </li>
                                <li>
                                    <a href="/parentzone" className='inline-block px-3 py-[7px] pl-[20px] w-full text-black opacity-60 hover:opacity-100'>私隱政策聲明</a>
                                </li>

                            </ul>
                        </li>
                        <li>
                            <a href="/contactus" className='inline-block px-3 py-[7px] pl-[20px] w-full text-black opacity-60 hover:opacity-100'>聯絡我們</a>
                        </li>


                    </ul>



                    <hr className='w-full border-[#e1e1e1]' />

                    <div className='block text-left mt-[15px] mx-5 md:hidden'>



                    </div>
                </div>
            </div>
        </header>



    );
}

export default Navigation;
