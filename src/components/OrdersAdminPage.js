import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../axios";
import Loading from "./Loading";
import Pagination from "./Pagination";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline";


function OrdersAdminPage() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        setLoading(true);
        axios
            .get("/orders")
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
            });
    }, []);

    const casesPerPage = 10;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * casesPerPage;
    const pageCount = Math.ceil(orders.length / casesPerPage);


    const [loading, setLoading] = useState(false);
    const products = useSelector((state) => state.products);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    function markShipped(orderId, ownerId) {
        axios
            .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
            .then(({ data }) => setOrders(data))
            .catch((e) => console.log(e));
    }

    function showOrder(productsObj) {
        let productsToShow = products.filter((product) => productsObj[product._id]);
        productsToShow = productsToShow.map((product) => {
            const productCopy = { ...product };
            productCopy.count = productsObj[product._id];
            delete productCopy.description;
            return productCopy;
        });
        setShow(true);
        setOrderToShow(productsToShow);
    }
    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return <h1 className="text-center pt-4">沒有購買紀錄</h1>;
    }



    return (
        <div className="section-container max-w-[1280px] grid">
            <h1 className="my-6 text-lg font-bold text-[rgb(55,65,81)] dark:text-[rgb(209,213,219)]">訂單一覽</h1>
            <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 bg-white-1 dark:bg-gray-800 shadow-xs dark:bg-gray-800 mb-5">
                <div className="p-4">
                    <form>
                        <div className="flex items-center gap-x-2">
                                                    {/*

                            <div className="w-full">
                                <Link to="/admin/create-order" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm !text-white-1 bg-[rgb(34,197,94)] border border-transparent active:bg-[rgb(22,163,74)] hover:bg-[rgb(22,163,74)] focus:ring focus:ring-[rgb(216,180,254)] w-full rounded-md h-12">
                                    <PlusIcon className="w-5 h-5" />
                                    <span className="ml-4">建立訂單</span>
                                </Link>

                            </div>
    */}

                        </div>


                    </form>
                </div>
            </div>
            <div className="w-full overflow-hidden border border-[rgb(229,231,235)] dark:border-[rgb(55,65,81)] rounded-lg ring-1 ring-[#000] ring-opacity-5 mb-8 rounded-b-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-[rgb(107,114,128)] uppercase border-b border-[rgb(229,231,235)] bg-[rgb(243,244,246)]">
                            <tr>
                                <td className="px-3 py-3">顧客ID</td>
                                <td className="px-3 py-3">顧客名稱</td>
                                <td className="px-3 py-3">商品數量</td>
                                <td className="px-3 py-3">總共</td>
                                <td className="px-3 py-3 text-center">地址</td>
                                <td className="px-3 py-3 text-center">訂單狀況</td>
                                <td className="px-3 py-3"></td>
                                <td className="px-3 py-3"></td>


                            </tr>
                        </thead>
                        <tbody className="bg-white-1 divide-y divide-[rgb(243,244,246)] text-[rgb(55,65,81)]">

                            {orders.reverse().slice(pagesVisited, pagesVisited + casesPerPage).map((order) => {
                                return (

                                    <tr>
                                        <td className="px-3 py-3">
                                            <span className="text-xs uppercase font-semibold">{order._id}</span>
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className="text-xs uppercase font-semibold">{order.owner.name}</span>
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className="text-xs ">{order.count}</span>
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className="text-xs font-bold">${order.total}</span>
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className="w-fit mx-auto block text-xs font-bold text-center">{order.address}</span>
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className="w-fit mx-auto block rounded-2xl bg-yellow text-[#000] text-xs px-2 py-2 text-center font-bold">{order.status}</span>
                                        </td>
                                        <td className="px-3 py-3">
                                            {order.status === "processing" ? (
                                                <Button size="sm" onClick={() => markShipped(order._id, order.owner._id)}>
                                                    Mark as shipped
                                                </Button>
                                            ) : (
                                                <Badge bg="success">Shipped</Badge>
                                            )}
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className="cursor-pointer text-sm" onClick={() => showOrder(order.products)}>
                                                View order <i className="fa fa-eye"></i>
                                            </span>
                                        </td>


                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {orders.length !== 0 &&
                    (
                        <div className="px-3 py-2 border-t border-[rgb(229,231,235)] bg-white-1 text-[rgb(107,114,128)]">
                            <div className="flex flex-col gap-y-3 justify-center items-center md:justify-between text-xs md:flex-row text-[rgb(75,85,99)]">
                                <span className="flex items-center justify-center md:justify-start font-semibold tracking-wide uppercase">{`SHOWING ${1 + (pageNumber * casesPerPage)}-${(casesPerPage + (pageNumber * casesPerPage)) <= orders.length ? (casesPerPage + (pageNumber * casesPerPage)) : orders.length} OF ${orders.length}`}</span>
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order details</Modal.Title>
                </Modal.Header>
                {orderToShow.map((order) => (
                    <div className="order-details__container d-flex justify-content-around py-2">
                        <img src={order.pictures[0].url} style={{ maxWidth: 100, height: 100, objectFit: "cover" }} />
                        <p>
                            <span>{order.count} x </span> {order.name}
                        </p>
                        <p>Price: ${Number(order.price) * order.count}</p>
                    </div>
                ))}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                    </tr>
                </thead>
                <tbody>
                    <Pagination data={products} RenderComponent={TableRow} pageLimit={1} dataLimit={5} tablePagination={true} />
                </tbody>
            </Table> */}
        </div>
    );
}

export default OrdersAdminPage;
