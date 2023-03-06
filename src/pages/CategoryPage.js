import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import Pagination from "../components/Pagination";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import categories from "../categories";
import { Link } from "react-router-dom";
import { select_option, sliderMarksArr } from "../data";
import Select from 'react-select';
import { Slider } from "@mui/material";


function CategoryPage() {


    const { category } = useParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    const [priceRange, setPriceRange] = useState([]);
    const [selectedOption, setSelectedOption] = useState(select_option[0].value);
    const allProducts = useSelector((state) => state.products);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/products/category/${category}`)
            .then(({ data }) => {

                setLoading(false);
                setProducts(data);
                if (selectedOption.value === 'time-reverse') {

                    setProducts(data.slice().reverse())

                } else if (selectedOption.value === 'price-descending') {
                    setProducts(data.slice().sort((a, b) => b.price - a.price))

                } else if (selectedOption.value === 'price-ascending') {
                    setProducts(data.slice().sort((a, b) => a.price - b.price))
                }
                if (priceRange.length) {
                    setProducts(prev => prev.slice().filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]))
                }

                if (!category) {

                    setProducts(allProducts)
                    if (selectedOption.value === 'time-reverse') {
                        setProducts(allProducts.slice().reverse());

                    } else if (selectedOption.value === 'price-descending') {
                        setProducts(allProducts.slice().sort((a, b) => b.price - a.price))

                    } else if (selectedOption.value === 'price-ascending') {
                        setProducts(allProducts.slice().sort((a, b) => a.price - b.price))
                    }


                    if (priceRange.length) {
                        setProducts(prev => prev.slice().filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]))
                    }

                }

            })
            .catch((e) => {
                setLoading(false);
                console.log(e.message);
            });


    }, [category, selectedOption, priceRange]);

    if (loading) {
        <Loading />;
    }



    const productsSearch = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    let displayCategory = categories.find(el => el.alias === category);
    function ProductSearch({ _id, category, name, pictures, price }) {
        return <ProductPreview _id={_id} category={category} name={name} pictures={pictures} price={price} />;
    }


    return (
        <div className="min-h-[90vh]">
            <div className={`pt-3 ${category}-banner-container h-[200px] bg-light-blue flex justify-start items-center bg-[url('https://img.freepik.com/free-vector/pastel-ombre-background-pink-purple_53876-120750.jpg?w=2000')] `}>
                <div className="section-container w-full">
                    <BreadCrumb item_arr={[{ title: '首頁', link: '/' }, { title: '貨品一覽', link: '/category' }]} />
                    <h1 className="text-xl">{displayCategory?.name ? displayCategory.name : '全部商品'}</h1>
                </div>

            </div>
            <div className="section-container">
                <div className="flex flex-col md:flex-row py-5 mt-12 gap-x-7">
                    <div className="md:flex-1 max-w-[258px]">
                        <h5 className=" py-2 mb-4 border-b-4 border-light-gray">商品</h5>
                        <input className="mb-8 w-full p-2 border-2 rounded-md border-light-gray hover:border-[#000] transition-all duration-500 focus-visible:outline-none" type="search" placeholder="輸入關鍵字以搜尋..." onChange={(e) => setSearchTerm(e.target.value)} />

                        <div className="flex flex-col gap-y-3">
                            <Link to={`/category`} className='text-base bg-none'>
                                <span>全部商品</span>
                            </Link>
                            {categories.map((category,index ) => {
                                return (
                                    <Link key={index} to={`/category/${category.alias}`} className='text-base bg-none'>
                                        <span>{category.name}</span>
                                    </Link>
                                )

                            })}
                        </div>
                        <div className="flex flex-col py-4 md:py-8">
                            <h5 className="mb-2">排序</h5>
                            <Select
                                options={select_option}
                                onChange={setSelectedOption}
                                defaultValue={selectedOption}
                                isSearchable={false}
                                placeholder={`新至舊(由上以下)`}
                            />
                        </div>
                        <div className="flex flex-col pt-0 pb-10 md:py-4">
                            <h5 className="mb-2">價格範圍</h5>
                            <Slider
                                sx={{width: '90%', mx: 'auto'}}
                                size="small"
                                getAriaLabel={() => 'Temperature range'}
                                min={sliderMarksArr[0].value}
                                max={sliderMarksArr[1].value}
                                defaultValue={[sliderMarksArr[0].value, sliderMarksArr[1].value]}
                                valueLabelDisplay="auto"
                                marks={sliderMarksArr}
                                onChangeCommitted={(e, val) => setPriceRange(val)}
                            />




                        </div>





                    </div>

                    {productsSearch.length === 0 && !loading ? (

                        <h1 className="text-center md:flex-[3]">暫無商品</h1>
                    ) : (

                        <Pagination data={productsSearch} RenderComponent={ProductSearch} pageLimit={3} dataLimit={12} tablePagination={false} />
                    )}


                </div>

            </div>

        </div>
    );
}

export default CategoryPage;
