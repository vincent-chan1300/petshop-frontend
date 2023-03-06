import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useAddToCartMutation } from "../services/appApi";
import { MinusSmallIcon, PlusSmallIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
function QuantityCounter({userId, productId, price, image, productName}) {
    const [productNum, setProductNum] = useState(1);
    const [addToCart, { isSuccess }] = useAddToCartMutation();
    
    
    
    const handleAddCart = async () => {
        addToCart({ userId: userId, productId: productId, price: price, productIdCount: productNum, image: image }).then(result => console.log(result));

    }
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
    useEffect(() => {
        if (isSuccess) {
            
            toast(`${productNum}件${productName}已加入購物車`, {
                icon: <ShoppingCartIcon className="w-10 h-10" />,
                
            });
        }
    }, [isSuccess])
    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center relative">
                <div className="flex items-center sm:pr-3 mb-[10px] sm:!mb-0">
                    <button disabled={productNum === 0} onClick={handleMinusCount} className={`flex justify-center items-center p-2 border-[1px] border-r-0 h-[40px] border-gray aspect-[1/1] group disabled:opacity-30 disabled:cursor-not-allowed`}>
                        <MinusSmallIcon className="w-5 h-5 group-hover:opacity-60" />
                    </button>
                    <input value={productNum} onChange={handleInputOnChange} className="text-center w-12 outline-none border-[1px] p-1 h-[40px] border-gray aspect-[1/1]" />
                    <button disabled={productNum === 99} onClick={handlePlusCount} className="flex justify-center items-center p-2 border-[1px] border-l-0 h-[40px] border-gray aspect-[1/1] group disabled:opacity-30 disabled:cursor-not-allowed">
                        <PlusSmallIcon className="w-5 h-5 group-hover:opacity-60" />
                    </button>

                </div>
                <button onClick={handleAddCart} disabled={productNum === 0} className="bg-[#ca7658] py-2 px-4 text-white-1 font-bold hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed">加入購物車</button>
            </div>
        </div>
    )
}

export default QuantityCounter