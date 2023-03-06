import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/userSlice";

import { IconContext } from 'react-icons';

const SidebarData = [
    {
        title: '主頁',
        path: '/',
    },
    {
        title: '貨品一覽',
        path: '/category',
    },
    {
        title: '狗仔專區',
        path: '/category/dog',
    },
    {
        title: '貓仔專區',
        path: '/category/cat',
    },
];

function Sidebar() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    function handleLogout() {
        dispatch(logout());
    }
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    return (

        <div className='block md:hidden'>
            <IconContext.Provider value={{ color: '#000' }}>
                <div className='flex justify-start items-center'>
                    <Link to='#' className='text-sm bg-none'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <div className='relative'>
                    <div className={`${sidebar ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-[100vh] bg-black opacity-60 z-[100]`} onClick={showSidebar}></div>
                    <nav className={`z-[200] bg-[#fff] w-[250px] h-[100vh] flex flex-col justify-between fixed top-0 -left-full duration-300 ${sidebar ? '!left-0 duration-300' : ''} `}>
                        <button className='absolute right-0 top-0 flex justify-center items-center w-10 aspect-[1/1] bg-theme-color-1 ' onClick={showSidebar}>
                            <a href="#" className='text-xl font-bold'>
                                <AiIcons.AiOutlineClose color='#fff' />
                            </a>
                        </button>
                        <ul className='w-full pl-0 relative mt-20' >


                            {SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className="flex justify-start items-center py-2 pl-4 list-none h-[60px]">

                                        <Link to={item.path} className=" text-base hover:!text-[#fff] w-[95%] h-full flex items-center px-2 rounded hover:bg-theme-color-1">
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}

                        </ul>
                        <div className='flex flex-col px-4 text-center mb-8'>
                            {!user && (
                                <a href="/login" className='block rounded-lg border-1 btn-shadow py-1'>登入/註冊</a>
                            )}
                            {user && (
                                <div>
                                    {!user.isAdmin && (
                                        <div className='grid gap-y-5'>
                                            <a href="/cart" className='rounded-lg border-1 btn-shadow py-1 flex justify-center items-center'>購物車 {user?.cart.count > 0 && (
                                                <span className="block badge badge-warning text-[10px] bg-[#ff0000] text-white !py-0.5 px-1 ml-2 !rounded-full ">
                                                {user.cart.count}
                                            </span>
                                            )}</a>
                                            <a href="/orders" className='block rounded-lg border-1 btn-shadow py-1'>我的訂單</a>
                                            <button onClick={handleLogout} className='block rounded-lg border-1 btn-shadow py-1'>登出</button>
                                        </div>

                                    )}
                                    {user.isAdmin && (
                                        <div className='grid gap-y-5'>
                                            <a href="/admin" className='block rounded-lg border-1 btn-shadow py-1'>管理員版面</a>
                                            <a href="/admin/new-product" className='block rounded-lg border-1 btn-shadow py-1'>建立產品</a>
                                            <button onClick={handleLogout} className='block rounded-lg border-1 btn-shadow py-1'>登出</button>
                                        </div>

                                    )}
                                </div>
                            )}

                        </div>
                    </nav>
                </div>

            </IconContext.Provider>
        </div>

    )
}

export default Sidebar