import axios from "../axios";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
/* import "./Home.css"; */
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";
import BannerSwiper from "../components/BannerSwiper";
import { bannerData_1, bannerData_2 } from '../data';

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 8);
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);
    return (
        <div className="">
            <BannerSwiper data_arr={bannerData_1} />
            <div className="section-container ">
                {/*
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4 py-11">
                    {categories.map((category, index) => {
                        return (
                            <a key={index} href={`/category/${category.alias}`} >
                                <div style={{ backgroundImage: `url(${category.img})`, gap: "10px", }} className="h-[180px] md:h-[250px] bg-cover bg-center !px-[20px] flex justify-center items-center text-theme-color-1 font-normal text-lg md:text-3xl cursor-pointer transition-all duration-300 hover:scale-105">
                                    {category.name}
                                </div>
                            </a>
                        )
                    })}
                </div>
                */}
                <div className="py-11 pb-4">
                    <img className="w-[300px] md:w-[500px] mx-auto" src="https://cdn-v2.dogcatstar.com/prod/2020/07/03/955206/title_popular-1.png" alt="banner" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] md:gap-8 py-11 max-w-5xl mx-auto">
                    {lastProducts.map((product, index) => (
                        <ProductPreview key={index} {...product} />
                    ))}
                </div>

            </div>
            <BannerSwiper data_arr={bannerData_2} />
            <div className="bg-[#fffaf6] py-12">
                <div className="section-container grid sm:grid-cols-2 md:grid-cols-4 gap-8 py-7">
                    <div className="text-center">
                        <h2 className="text-theme-color-1 mb-4">線上付款</h2>
                        <p className="text-[#473729] text-xl font-bold">網站已對接多種支付方式</p>

                    </div>
                    <div className="text-center">
                    <h2 className="text-theme-color-2 mb-4">SSL保密資訊</h2>
                        <p className="text-[#473729] text-xl font-bold">安全地保護資訊傳送</p>
                    </div>
                    <div className="text-center">
                    <h2 className="text-theme-color-3 mb-4">免費送貨</h2>
                        <p className="text-[#473729] text-xl font-bold">訂滿指定金額即可免運費</p>
                    </div>
                    <div className="text-center">
                    <h2 className="mb-4">真人接聽</h2>
                        <p className="text-[#473729] text-xl font-bold">快速為您解決任何查詢</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;
