import React, { useState, useEffect } from 'react'
import axios from "../axios";
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import Loading from '../components/Loading';
import ProductPreview from '../components/ProductPreview';
import BreadCrumb from '../components/BreadCrumb';

function AllProductsPage() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const casesPerPage = 8
    const [pageNumber, setPageNumber] = useState(0)
    const pagesVisited = pageNumber * casesPerPage
    const pageCount = Math.ceil(products.length / casesPerPage)


    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);

    const displayProducts = products.slice(pagesVisited, pagesVisited + casesPerPage).map((product) => (
        <ProductPreview {...product} />
    ))
    if (!displayProducts) {
        return <Loading />;
    }


    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return (
        <div className='section-container max-w-6xl py-16 md:py-20'>
            <BreadCrumb item_arr={[{ title: '首頁', link: '/' }]} />
            <h4 className='pb-10 text-center'>全部產品</h4>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5'>
                {displayProducts}
            </div>
            <div className='mt-10'>
                {displayProducts.length !== 0 &&
                    <ReactPaginate
                        breakLabel="..."
                        previousLabel={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>}
                        nextLabel={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"pl-0 relative flex justify-center items-center flex-wrap w-fit mx-auto"}
                        breakClassName={"mx-[10px] mt-[10px]"}
                        breakLinkClassName={"pointer-events-none"}
                        pageClassName={"mx-[5px] rounded-[5px] text-[15px] shadow-3xl min-w-[34px] bg-white-1 hover:bg-theme-color-1 hover:!text-white-1 mt-[10px]"}
                        pageLinkClassName={"block w-full p-[5px] text-center"}
                        previousClassName={`absolute -left-[35px] mx-[10px] mt-[10px] ${pageCount < 2 && 'pointer-events-none'}`}
                        nextClassName={`absolute -right-[35px] mx-[10px] mt-[10px] ${pageCount < 2 && 'pointer-events-none'}`}
                        nextLinkClassName={"top-auto"}
                        disabledClassName={""}
                        activeClassName={"!bg-theme-color-1 !text-white-1"}
                        activeLinkClassName={`!text-white-1`}
                    />
                }
            </div>

        </div>
    )
}

export default AllProductsPage