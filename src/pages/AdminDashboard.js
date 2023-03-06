import React from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import ClientsAdminPage from "../components/ClientsAdminPage";
import DashboardProducts from "../components/DashboardProducts";
import OrdersAdminPage from "../components/OrdersAdminPage";
import EditProductPage from "./EditProductPage";
import NewProduct from "./NewProduct";
import { ShoppingBagIcon, ClipboardDocumentCheckIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./Home";
import CreateOrder from "./CreateOrder";
import OrderListPage from "../components/OrderListPage";




function AdminDashboard() {

    const { action, id } = useParams();


    return (
        <div>
            <Tab.Container defaultActiveKey="products">

                <div className="flex h-screen bg-[rgb(249,250,251)] dark:bg-[rgb(17,24,39)]">
                    <div className="z-30 flex-shrink-0 shadow-sm w-15 md:w-64 overflow-y-auto bg-white dark:bg-gray-800">

                        <Nav variant="pills" className="flex-col mt-8">
                            <Nav.Item>
                                <Nav.Link className={`relative px-3 md:!px-6 !py-4 !inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:!text-[#046c4e] dark:hover:text-[rgb(229,231,235)] cursor-pointer !bg-white-1 text-center-tailwind `} eventKey="products">
                                    <ShoppingBagIcon className="w-5 h-5" />
                                    <span className="ml-4 hidden md:block">商品</span>

                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className={`relative px-3 md:!px-6 !py-4 !inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:!text-[#046c4e] dark:hover:text-[rgb(229,231,235)] cursor-pointer !bg-white-1 text-center-tailwind `} eventKey="orders">
                                    <ClipboardDocumentCheckIcon className="w-5 h-5" />
                                    <span className="ml-4 hidden md:block">訂單</span>

                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className={`relative px-3 md:!px-6 !py-4 !inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:!text-[#046c4e] dark:hover:text-[rgb(229,231,235)] cursor-pointer !bg-white-1 text-center-tailwind `} eventKey="clients">
                                    <UsersIcon className="w-5 h-5" />
                                    <span className="ml-4 hidden md:block">會員資料</span>

                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className={`relative px-3 md:!px-6 !py-4 !inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:!text-[#046c4e] dark:hover:text-[rgb(229,231,235)] cursor-pointer !bg-white-1 text-center-tailwind `} eventKey="createOrder">
                                    <UsersIcon className="w-5 h-5" />
                                    <span className="ml-4 hidden md:block">建立訂單</span>

                                </Nav.Link>
                            </Nav.Item>

                        </Nav>

                    </div>

                    <Tab.Content className="flex-1 w-full">
                        <Tab.Pane eventKey="products" className="h-full overflow-y-auto">
                            {(!action || action !== 'new-product' && action !== 'edit') && (
                                <DashboardProducts />
                            )}
                            {action === 'new-product' && (
                                <NewProduct />
                            )}

                            {action === `edit` && (
                                <EditProductPage />
                            )}



                        </Tab.Pane>
                        <Tab.Pane eventKey="orders" className="h-full overflow-y-auto">
                            {action !== 'create-order'  && (
                                <OrdersAdminPage />
                            )}

                            {action === 'create-order' && (
                                <CreateOrder />
                            )}
                        </Tab.Pane>
                        <Tab.Pane eventKey="clients" className="h-full overflow-y-auto">
                            <ClientsAdminPage />
                        </Tab.Pane>
                        <Tab.Pane eventKey="createOrder" className="h-full overflow-y-auto">
                            {action !== 'create-order'  && (
                                <OrderListPage />
                            )}

                            {action === 'create-order' && (
                                <CreateOrder />
                            )}
                        </Tab.Pane>
                    </Tab.Content>

                </div>


            </Tab.Container>

        </div>



    );
}

export default AdminDashboard;
