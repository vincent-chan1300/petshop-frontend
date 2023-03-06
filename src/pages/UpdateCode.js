import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateCodeMutation } from "../services/appApi";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";



function UpdateCode() {
    const navigate = useNavigate()
    const [updateCode, { isError, error, isLoading, isSuccess }] = useUpdateCodeMutation();
    const { register, trigger, formState: { isValid, errors }, handleSubmit, watch, reset, resetField } = useForm({
        mode: 'all',

    });
    const onSubmit = (data) => {
        console.log(data);
        try {
            updateCode({codeName: data.CodeName, codeValue: data.CodeValue})
            toast.success('已更新折扣碼')
            navigate('/')
        }catch (err) {
            toast.error(err.message)
        }
        
        
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
                        <h4 className="text-xl font-medium">更新折扣碼</h4>
                        <form className="flex flex-col gap-3 mt-8" noValidate onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="labelField">折扣碼名稱</label>
                                <input className="inputField" {...register("CodeName", { required: true })} />
                            </div>
                            {errors.CodeName?.type === 'required' && <p className="text-xs text-red-1">請輸入</p>}
                            <div>
                                <label className="labelField">折扣碼金額</label>
                                <input className="inputField" {...register("CodeValue", {
                                    required: true,
                                    valueAsNumber: true,
                                    validate: (value) => value > 0,
                                })} />
                            </div>
                            {errors.CodeValue?.type === 'required' && <p className="text-xs text-red-1">請輸入</p>}
                            {errors.CodeValue?.type === 'valueAsNumber' && <p className="text-xs text-red-1">請輸入數字</p>}
                            {errors.CodeValue?.type === 'validate' && <p className="text-xs text-red-1">請輸入大於0的數字</p>}
                            <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm !text-white-1 bg-[rgb(34,197,94)] border border-transparent active:bg-[rgb(22,163,74)] hover:bg-[rgb(22,163,74)] focus:ring focus:ring-[rgb(216,180,254)] w-full rounded-md h-12" type="submit">更新折扣碼</button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UpdateCode