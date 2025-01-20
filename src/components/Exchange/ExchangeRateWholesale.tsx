"use client"
import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../contexts/CartWholesaleContext';
import axios from 'axios';
import { FaExchangeAlt } from "react-icons/fa";


const Exchang = () => {
    const cartContext = useContext(CartContext);
    useEffect(() => {
        fetchdata();
    }, []);

    const fetchdata = async () => {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_NAME + "/api/exchange");
        if (res) {
            setRate({ exchange_rate: res.data });
        }
    }
    if (!cartContext) {
        return <p>Không thể cập nhật tỷ giá.</p>;
    }
    const { rate, setRate } = cartContext;
    return (
        <div className=" flex justify-start items-center gap-4">
            <div>
                <div className=" flex gap-1">
                    <span className=" text-[30px] font-bold">LAK</span>
                    <FaExchangeAlt size={40} color="green" />
                    <span className=" text-[30px] font-bold">THB</span>
                </div>
                <p className=" text-center">ອັດຕາແລກປ່ຽນມື້ນີ້</p>
            </div>
            <div className="h-full bg-green-300 border border-black rounded-lg">
                <h1 className="text-[40px] px-10">{rate.exchange_rate}</h1>
            </div>
        </div>
    )
}

export default Exchang