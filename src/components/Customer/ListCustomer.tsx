"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ListCustomer = () => {
    const [customers, setCustomers] = useState([{
        _id: "",
        customer_id: "",
        customer_name: "",
        customer_phone: "",
        customer_address: "",
        customer_point: 0
    }]);

    useEffect(() => {
        fetchdata();
    }, [])
    const fetchdata = async () => {
        const res = await axios.get("/api/customer");
        setCustomers(res.data.result);
    }
    return (
        <div className='w-[960px] mx-auto p-10'>
            <table className=' w-full'>
                <thead>
                    <tr>
                        <th className=' border'>ລະຫັດ</th>
                        <th className=' border'>ຊື່</th>
                        <th className=' border'>ເບີໂທ</th>
                        <th className=' border'>ທີ່ຢູ່</th>
                        <th className=' border'>ຄະແນນ</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td className=' border'>{item.customer_id}</td>
                                <td className=' border'>{item.customer_name}</td>
                                <td className=' border'>{item.customer_phone}</td>
                                <td className=' border'>{item.customer_address}</td>
                                <td className=' border'>{item.customer_point}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListCustomer

