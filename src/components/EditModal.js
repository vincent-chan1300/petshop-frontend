import React, { useEffect, useState } from "react";
import { Modal, Box } from '@mui/material';
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/24/solid";
import { useChangeProductCountMutation } from "../services/appApi";


const stylebox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 250,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    paddingLeft: '10',
    paddingRight: '10',
    paddingTop: 6,


};
function EditModal({ btnText, userId, productId, price, productIdCount }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setProductNum(productIdCount)

    };
    const [productNum, setProductNum] = useState(productIdCount);
    const [changeProductCount, { isSuccess }] = useChangeProductCountMutation();

    const handleInputOnChange = (e) => {
        e.preventDefault();
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
    const handleMinusCount = (e) => {
        e.preventDefault();
        setProductNum(prevNum => prevNum - 1);
        if (productNum <= 0) {
            setProductNum(0);
        }
    }
    const handlePlusCount = (e) => {
        e.preventDefault();
        setProductNum(prevNum => prevNum + 1);
        if (productNum >= 99) {
            setProductNum(99);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        changeProductCount({ userId: userId, productId: productId, price: price, productIdCount: productNum })
    }
    useEffect(()=>{
        if (isSuccess) {
            setOpen(false);
        }
    }, [isSuccess])

    return (
        <div>
            <button className="rounded-xl border p-2 text-sm hover:opacity-70" onClick={handleOpen}>{btnText}</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={stylebox}>
                    <div className="relative">
                        <button className="absolute -top-10 -right-6" onClick={handleClose}><PlusSmallIcon className="w-8 h-8 rotate-45" /></button>
                        <div className="flex items-center justify-center mb-[10px] sm:!mb-0">
                            <button disabled={productNum === 0} onClick={handleMinusCount} className={`flex justify-center items-center p-2 border-[1px] border-r-0 h-[40px] border-gray aspect-[1/1] group disabled:opacity-30 disabled:cursor-not-allowed`}>
                                <MinusSmallIcon className="w-5 h-5 group-hover:opacity-60" />
                            </button>
                            <input value={productNum} onChange={handleInputOnChange} className="text-center w-12 outline-none border-[1px] p-1 h-[40px] border-gray aspect-[1/1]" />
                            <button disabled={productNum === 99} onClick={handlePlusCount} className="flex justify-center items-center p-2 border-[1px] border-l-0 h-[40px] border-gray aspect-[1/1] group disabled:opacity-30 disabled:cursor-not-allowed">
                                <PlusSmallIcon className="w-5 h-5 group-hover:opacity-60" />
                            </button>

                        </div>
                        <button onClick={handleSubmit} disabled={productNum === 0} className="block w-fit p-3 py-1 rounded-2xl text-white-1 bg-theme-color-1 hover:opacity-80 mt-7 mx-auto disabled:cursor-not-allowed disabled:opacity-50">確認數量</button>
                    </div>


                </Box>

            </Modal>
        </div>
    )
}

export default EditModal