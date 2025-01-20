"use client"
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';

const page = () => {
    const [product, setProduct] = useState([]);
    const printRef = useRef(null);
    useEffect(() => {
        fetchdata();
    }, []);
    const fetchdata = async () => {
        const res = await axios.get("/api/allproduct");
        setProduct(res.data.result)
        console.log(res)
    }
    
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });
    return (
        <div>
            <button onClick={handlePrint}>print</button>
            <div ref={printRef} className=' w-[210mm] px-5 py-5 text-[12px]'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='border py-2'>ລຳດັບ</th>
                            <th className='border'>ລະຫັດສິນຄ້າ</th>
                            <th className='border'>ຊື່ສິນຄ້າ</th>
                            <th className='border'>ຈຳນວນ</th>
                            <th className='border'>ຕົ້ນທຶນ LAK</th>
                            <th className='border'>ຍ່ອຍ LAK</th>
                            <th className='border'>ຕົ້ນທຶນ THB</th>
                            <th className='border'>ຍ່ອຍ THB</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.length > 0 && product.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className='border text-center'>{index + 1}</td>
                                    <td className='border'>{item.product_id}</td>
                                    <td className='border'>{item.product_name}{" "}{item.product_size}</td>
                                    <td className='border text-end'>{item.product_qty}{" "}{item.product_unit.unit_name}</td>
                                    <td className='border text-end'>{item.product_price_buy_LAK.toLocaleString()}</td>
                                    <td className='border text-end'>{item.product_price_sale2_LAK.toLocaleString()}</td>
                                    <td className='border text-end'>{item.product_price_buy_THB.toLocaleString()}</td>
                                    <td className='border text-end'>{item.product_price_sale2_THB.toLocaleString()}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page