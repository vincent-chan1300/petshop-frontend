
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import NewProduct from "./pages/NewProduct";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import AdminDashboard from "./pages/AdminDashboard";
import EditProductPage from "./pages/EditProductPage";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { addNotification } from "./features/userSlice";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ScrollToTopBtn from "./components/ScrollToTopBtn";
import AllProductsPage from "./pages/AllProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import { Toaster } from 'react-hot-toast';


function App() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const socket = io("ws://petshop-backend.onrender.com");
        socket.off("notification").on("notification", (msgObj, user_id) => {
            // logic for notification
            if (user_id === user._id) {
                dispatch(addNotification(msgObj));
            }
        });

        socket.off("new-order").on("new-order", (msgObj) => {
            if (user.isAdmin) {
                dispatch(addNotification(msgObj));
            }
        });
    }, []);
    return (
        <div className="App">
            <BrowserRouter>
                <Toaster />
                <ScrollToTopBtn />
                <ScrollToTop />
                <Header />
                <Routes>
                    <Route index element={<Home />} />
                    {!user && (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    )}

                    {user && (
                        <>
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/orders" element={<OrdersPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                        </>
                    )}
                    {user && user.isAdmin && (
                        <>
                            {/* <Route path="/new-product" element={<NewProduct />} /> */}
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/:action" element={<AdminDashboard />} />
                            <Route path="/admin/:id/:action" element={<AdminDashboard />} />

                            {/* <Route path="/admin/product/:id/edit" element={<EditProductPage />} /> */}
                        </>
                    )}
                    <Route path="/category" element={<CategoryPage />} />
                    <Route path="/category/:category" element={<CategoryPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />



                    <Route path="*" element={<Home />} />
                </Routes>
                <Footer />

            </BrowserRouter>
        </div>
    );
}

export default App;
