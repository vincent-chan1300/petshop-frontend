import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Container, Row, Col, Badge, ButtonGroup, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import "./ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";
import BreadCrumb from "../components/BreadCrumb";
import ProductPreview from "../components/ProductPreview";
import YouMayAlsoLikeProducts from "../components/YouMayAlsoLikeProducts";
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

function ProductPage() {
    const { id } = useParams();
    const products = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);
    const [mayLikeProducts, setMayLikeProducts] = useState(null);
    const [similarProducts, setSimilarProducts] = useState(null);
    const [productNum, setProductNum] = useState(1);
    const [addToCart, { isSuccess }] = useAddToCartMutation();

    const handleDragStart = (e) => e.preventDefault();
    const handleAddCart = async () => {
        addToCart({ userId: user._id, productId: id, price: product.price, productIdCount: productNum, image: product.pictures[0].url });

    }

    const displayMayLikeProducts = () => {
        let youMayAlsoLikeProducts = [];
        let shuffled = products?.sort(() => 0.5 - Math.random());
        shuffled = shuffled.filter(item => item._id != id)
        let random_product_arr = shuffled?.slice(0, 3);

        if (random_product_arr) {
            youMayAlsoLikeProducts = random_product_arr.map((product, idx) => {
                return (
                    <div className="item" key={idx} data-value={idx}>
                        <YouMayAlsoLikeProducts {...product} />
                    </div>
                )
            });
            setMayLikeProducts(youMayAlsoLikeProducts)
        }
    }

    const displaySimilarProducts = () => {
        let similarProductsList = [];
        similarProductsList = similar?.map((product, idx) => {
            if (product._id === id) {
                similar.filter(item => item != product)
            } else {
                return (
                    <div className="item" key={idx} data-value={idx}>
                        <SimilarProduct {...product} />
                    </div>
                )
            }
        });
        setSimilarProducts(similarProductsList);
    }

    useEffect(() => {
        axios.get(`/products/${id}`).then(({ data }) => {
            setProduct(data.product);

            const similarProductsList = data.similar?.map((product, idx) => {
                if (product._id !== id) {
                    return (
                        <div className="item" key={idx} data-value={idx}>
                            <SimilarProduct {...product} />
                        </div>
                    )
                }
            });
            setSimilarProducts(similarProductsList);

        });

        displayMayLikeProducts();
        displaySimilarProducts();
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            /* toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex items-center gap-x-4 ring-1 ring-black ring-opacity-5`}>
                    <ShoppingCartIcon className="w-10 h-10" />
                    <div className="text-sm ">
                        {productNum}件<span className="font-bold">{product?.name}</span>已加入購物車
                    </div>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="max-w-[100px]"
                    >
                        <PlusSmallIcon className="w-5 h-5 rotate-45" />
                    </button>

                </div>
            )) */
            toast(`${productNum}件${product?.name}已加入購物車`, {
                icon: <ShoppingCartIcon className="w-10 h-10" />,

            });
        }
    }, [isSuccess])

    if (!product) {
        return <Loading />;
    }
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

    const images = product.pictures.map((picture, index) => <img key={index} className="max-w-full object-cover max-h-[500px] mx-auto md:mx-0" src={picture.url} onDragStart={handleDragStart} />);

    const handleInputOnChange = (e) => {
        if (Number(e.target.value)) {
            if (e.target.value < 0) {
                setProductNum(0);
            } else if (e.target.value > 99) {
                setProductNum(99);
            } else {
                setProductNum(e.target.value);
            }

        }
    }
    const handleMinusCount = () => {
        setProductNum(prevNum => prevNum - 1);
        if (productNum <= 0) {
            setProductNum(0);
        }
    }
    const handlePlusCount = () => {
        setProductNum(prevNum => prevNum + 1);
        if (productNum >= 99) {
            setProductNum(99);
        }
    }
    return (
        <div>
            <div className="relative section-container max-w-6xl py-16 md:py-20">
                <BreadCrumb item_arr={[{ title: '首頁', link: '/' }, { title: '全部產品', link: '/category' }, { title: product.category, link: `/category/${product.category}` }]} />
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="lg:w-[500px] md:w-[400px]">
                        <AliceCarousel mouseTracking items={images} controlsStrategy="alternate" disableDotsControls={product.pictures.length < 2 ? true : false} />
                    </div>

                    <div className="flex-[2] relative">
                        <h4 className="pb-3 border-b-2 border-light-gray">{product.name}</h4>
                        <div className="my-3 p-3 bg-[#fdf5e6]">
                            <h6 className="mb-2">產品類別：</h6>
                            <p className="text-sm">{product.category}</p>
                            <h6 className="mb-2">產品介紹：</h6>
                            <p className="text-sm">{product.description}</p>
                            <h6 className="mb-2">產品價錢(HKD)：</h6>
                            <p className="text-sm">${product.price}</p>

                        </div>
                        {!user && (
                            <a href="/login" className="block rounded-3xl border font-bold w-fit px-3 py-2 hover:opacity-70">登入會員以開始購物</a>
                        )}
                        {user && (
                            <div>

                                <div className="flex flex-col sm:flex-row items-center relative">
                                    <div className="flex items-center sm:pr-3 mb-[10px] sm:!mb-0">
                                        <button disabled={productNum === 0} onClick={handleMinusCount} className={`flex justify-center items-center p-2 border-[1px] border-r-0 h-[40px] border-gray aspect-[1/1] group disabled:opacity-30 disabled:cursor-not-allowed`}>
                                            <MinusSmallIcon className="w-5 h-5 group-hover:opacity-60" />
                                        </button>
                                        <input  value={productNum} onChange={handleInputOnChange} className="text-center w-12 outline-none border-[1px] p-1 h-[40px] border-gray aspect-[1/1]" />
                                        <button disabled={productNum === 99} onClick={handlePlusCount} className="flex justify-center items-center p-2 border-[1px] border-l-0 h-[40px] border-gray aspect-[1/1] group disabled:opacity-30 disabled:cursor-not-allowed">
                                            <PlusSmallIcon className="w-5 h-5 group-hover:opacity-60" />
                                        </button>

                                    </div>
                                    {!user.isAdmin && (
                                    <button onClick={handleAddCart} disabled={productNum === 0} className="bg-[#ca7658] py-2 px-4 text-white-1 font-bold hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed">加入購物車</button>
                                    )}
                                </div>


                                {user.cart[id]&& !user.isAdmin && (
                                    <div className="mt-3 text-sm text-center-tailwind sm:text-left">你已有 {user.cart[id]} 件此產品於購物車內</div>
                                )}
                            </div>


                        )}
                        {user && user.isAdmin && (
                            <LinkContainer className="mt-3" to={`/admin/${product._id}/edit`}>
                                <Button size="lg" className="text-white">修改商品資料</Button>
                            </LinkContainer>
                        )}

                    </div>
                    <div className="hidden lg:block flex-1">
                        <h6 className="text-center pb-3 relative mb-0 after:content-[''] after:absolute after:h-[4px] after:bg-light-gray after:w-1/5 after:left-1/2 after:-translate-x-1/2 after:bottom-0">您可能也喜歡...</h6>
                        <div className="flex flex-col max-w-[200px] divide-y-[1px]">
                            {mayLikeProducts}
                        </div>
                    </div>
                </div>
                <div className="my-16">
                    <h2 className="mb-4">相關產品</h2>
                    {!similarProducts ? (
                        <h5 className="text-center">暫無相關產品</h5>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {similarProducts}
                        </div>
                    )}

                </div>

            </div>

        </div>

    );
}

export default ProductPage;
