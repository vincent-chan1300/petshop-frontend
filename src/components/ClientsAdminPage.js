import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import axios from "../axios";
import Loading from "./Loading";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function ClientsAdminPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, []);
    const casesPerPage = 10;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * casesPerPage;
    const pageCount = Math.ceil(users.length / casesPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    if (loading) return <Loading />;
    if (users?.length == 0) return <h2 className="py-2 text-center">No users yet</h2>;

    return (
        <div className="section-container max-w-[1280px] grid">
            <h1 className="my-6 text-lg font-bold text-[rgb(55,65,81)] dark:text-[rgb(209,213,219)]">會員資料</h1>
            <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 bg-white-1 dark:bg-gray-800 shadow-xs dark:bg-gray-800 mb-5">
                <div className="p-4">
                    <form>
                        <div className="flex items-center gap-x-2">
                            <div className="w-full">

                                {/* <input type="text" className={`inputField`} onChange={(e) => setSearchKeyWord(e.target.value)} placeholder="搜尋商品" /> */}

                            </div>
                            {/* <button onClick={handleReset} className="block p-2 text-sm whitespace-nowrap border rounded-md hover:opacity-70">重設</button> */}
                            {/* <button onClick={handleSearchKeyWord} className="p-1 hover:opacity-70">
                                <MagnifyingGlassIcon className="w-5 h-5" />
                            </button> */}
                        </div>

                        {/* <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
                            <div className="w-full relative">
                                <ChevronDownIcon className="absolute w-3 h-3 right-4 top-1/2 -translate-y-1/2 z-10" />
                                <select className="selectField" onChange={(e) => setSearchCategory(e.target.value)}>
                                    <option value="all" hidden>商品類別</option>
                                    {categories.map((category) => {
                                        return (
                                            <option value={category.alias}>{category.name}</option>
                                        )

                                    })}


                                </select>

                            </div>
                            <div className="w-full relative">
                                <ChevronDownIcon className="absolute w-3 h-3 right-4 top-1/2 -translate-y-1/2 z-10" />
                                <select className="selectField" onChange={(e) => setSearchPrice(e.target.value)}>

                                    <option value="all" hidden>商品價錢</option>
                                    <option value="price-descending" >價錢高至低(由上以下)</option>
                                    <option value="price-ascending">價錢低至高(由上以下)</option>

                                </select>

                            </div>

                            <a href="/new-product" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm !text-white-1 bg-[rgb(34,197,94)] border border-transparent active:bg-[rgb(22,163,74)] hover:bg-[rgb(22,163,74)] focus:ring focus:ring-[rgb(216,180,254)] w-full rounded-md h-12">
                                <PlusIcon className="w-5 h-5" />
                                <span className="ml-4">建立產品</span>
                            </a>
                        </div> */}
                    </form>
                </div>
            </div>
            <div className="w-full overflow-hidden border border-[rgb(229,231,235)] dark:border-[rgb(55,65,81)] rounded-lg ring-1 ring-[#000] ring-opacity-5 mb-8 rounded-b-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-[rgb(107,114,128)] uppercase border-b border-[rgb(229,231,235)] bg-[rgb(243,244,246)]">
                            <tr>
                                <td className="px-3 py-3">會員ID</td>
                                <td className="px-3 py-3">會員名稱</td>
                                <td className="px-3 py-3">會員電郵</td>



                            </tr>
                        </thead>
                        <tbody className="bg-white-1 divide-y divide-[rgb(243,244,246)] text-[rgb(55,65,81)]">

                            {users.slice(pagesVisited, pagesVisited + casesPerPage).map((user) => {
                                return (

                                    <tr>
                                        <td className="px-3 py-3">
                                            <span className="text-xs uppercase font-semibold">{user._id}</span>
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className="text-xs uppercase font-semibold">{user.name}</span>
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className="text-xs ">{user.email}</span>
                                        </td>



                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {users.length !== 0 &&
                    (
                        <div className="px-3 py-2 border-t border-[rgb(229,231,235)] bg-white-1 text-[rgb(107,114,128)]">
                            <div className="flex flex-col gap-y-3 justify-center items-center md:justify-between text-xs md:flex-row text-[rgb(75,85,99)]">
                                <span className="flex items-center justify-center md:justify-start font-semibold tracking-wide uppercase">{`SHOWING ${1 + (pageNumber * casesPerPage)}-${(casesPerPage + (pageNumber * casesPerPage)) <= users.length ? (casesPerPage + (pageNumber * casesPerPage)) : users.length} OF ${users.length}`}</span>
                                <ReactPaginate
                                    breakLabel="..."
                                    previousLabel={<ChevronLeftIcon className="w-3 h-3" />}
                                    nextLabel={<ChevronRightIcon className="w-3 h-3" />}
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={"pl-0 relative flex justify-center md:justify-end items-center flex-wrap w-fit mb-0"}
                                    breakClassName={"mx-[10px] mt-[10px]"}
                                    breakLinkClassName={"pointer-events-none"}
                                    pageClassName={"text-xs rounded-md shadow-3xl min-w-[28px] min-h-[28px] flex justify-center items-center bg-white-1 hover:bg-[#f4f5f7] hover:!text-white-1 "}
                                    pageLinkClassName={"block w-full p-[5px] text-center"}
                                    previousClassName={`min-w-[28px] min-h-[28px] flex justify-center items-center ${pageNumber + 1 < 2 && 'pointer-events-none cursor-not-allowed opacity-50'}`}
                                    nextClassName={`min-w-[28px] min-h-[28px] flex justify-center items-center ${pageNumber + 1 === pageCount && 'cursor-not-allowed pointer-events-none opacity-50'}`}
                                    previousLinkClassName={`top-auto ${pageNumber + 1 < 2 && 'cursor-not-allowed pointer-events-none opacity-50'}`}
                                    nextLinkClassName={`top-auto ${pageNumber + 1 === pageCount && 'cursor-not-allowed pointer-events-none opacity-50'}`}
                                    disabledClassName={""}
                                    activeClassName={"!bg-theme-color-1 !text-white-1"}
                                    activeLinkClassName={`!text-white-1`}
                                />
                            </div>
                        </div>
                    )

                }
            </div>


        </div>

    );


}

export default ClientsAdminPage;
