import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation } from "../services/appApi";
import { CloudArrowUpIcon, ChevronDownIcon, ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import axios from "../axios";
import "./NewProduct.css";
import categories from "../categories";


function EditProductPage({ product_id }) {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [updateProduct, { isError, error, isLoading, isSuccess }] = useUpdateProductMutation();

    useEffect(() => {
        axios
            .get("/products/" + id)
            .then(({ data }) => {
                const product = data.product;
                setName(product.name);
                setDescription(product.description);
                setCategory(product.category);
                setImages(product.pictures);
                setPrice(product.price);
            })
            .catch((e) => console.log(e));
        console.log(category);
    }, [id]);

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description ||!price || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        updateProduct({ id, name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    function showWidget(e) {
        e.preventDefault();
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "happy1300",
                uploadPreset: "sftovrgj",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
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
                        <h4 className="text-xl font-medium">更新產品</h4>
                        <p className="mb-0 text-sm">從這裡更新您的產品</p>
                    </div>
                </div>
                <div className="w-full relative">
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
                            {isSuccess && <Alert variant="success">Product updated</Alert>}
                            {isError && <Alert variant="danger">{error.data}</Alert>}
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="labelField col-span-4 sm:col-span-2">產品圖片</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <div className="w-full text-center">
                                        <button onClick={showWidget} className="w-full px-6 py-4 border-2 border-[rgb(209,213,219)] border-dashed rounded-md cursor-pointer">
                                            <div className="flex flex-col items-center">
                                                <CloudArrowUpIcon className="w-10 h-10" />
                                                <p className="text-sm mt-2">點擊上傳圖片</p>

                                            </div>
                                        </button>
                                        <aside className="flex flex-row flex-wrap mt-4 gap-3">
                                            {images.map((image, index) => (
                                                <div key={index} className="image-preview">
                                                    <img src={image.url} />
                                                    {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                                </div>
                                            ))}
                                        </aside>

                                    </div>
                                </div>

                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 items-center">
                                <label className="labelField col-span-4 sm:col-span-2">產品名稱</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input className="inputField" type="text" value={name} required onChange={(e) => setName(e.target.value)} />
                                </div>

                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 items-center">
                                <label className="labelField col-span-4 sm:col-span-2">產品描述</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input className="inputField overflow-auto" type="text" rows="4" value={description} required onChange={(e) => setDescription(e.target.value)} />
                                </div>
                            </div>

                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 items-center">
                                <label className="labelField col-span-4 sm:col-span-2">價錢($)</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input className="inputField" type="text" value={price} required onChange={(e) => setPrice(e.target.value)} />
                                </div>

                            </div>

                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 items-center">
                                <label className="labelField col-span-4 sm:col-span-2">種類</label>
                                <div className="col-span-8 sm:col-span-4 relative">
                                    <ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 right-[15px] w-4 h-4 z-10" />
                                    <select className="selectField relative" value={category}>

                                        <option disabled selected>
                                            請選擇
                                        </option>
                                        {categories.map((item) => {
                                            return (
                                                <option value={item.alias}>{item.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                            </div>
                            <button type="submit" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm !text-white-1 bg-[rgb(34,197,94)] border border-transparent active:bg-[rgb(22,163,74)] hover:bg-[rgb(22,163,74)] focus:ring focus:ring-[rgb(216,180,254)] w-full rounded-md h-12 mt-10" disabled={isLoading || isSuccess}>更新產品</button>
                        </div>


                    </form>
                </div>
            </div>

        </div>

    );
}

export default EditProductPage;
