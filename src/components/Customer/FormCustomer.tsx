"use client"
import { Button, Input } from '@nextui-org/react'
import axios from 'axios';
import React, { useState } from 'react'

// interface CTM {
//     customer_id: string,
//     customer_name: string,
//     customer_phone: string,
//     customer_address: string,
//     customer_point: 0
// }
const formCustomer = () => {
    const [customer, setCustomer] = useState({
        customer_id: "",
        customer_name: "",
        customer_phone: "",
        customer_address: "",
        customer_point: 0
    });
    const handleSubmit = async () => {
        try {
            const res = await axios.post("/api/customer", { customer })
            console.log(res);
        } catch {

        }
    }
    return (
        <div className=' w-[960px] mx-auto p-10'>
            <div className=' flex justify-around gap-3 items-center'>
                <div className=' w-full'>
                    <Input
                        type="text"
                        value={customer.customer_name}
                        onChange={(e) => setCustomer({ ...customer, customer_name: e.target.value })}
                        className=''
                        placeholder='ຊື່ສະມາຊິກ'
                    />
                </div>
                <div className=' w-full'>
                    <Input
                        type="text"
                        value={customer.customer_phone}
                        onChange={(e) => setCustomer({ ...customer, customer_phone: e.target.value })}
                        className=''
                        placeholder='ເບີໂທ'
                    />
                </div>
                <div className=' w-full'>
                    <Input
                        type="text"
                        value={customer.customer_address}
                        onChange={(e) => setCustomer({ ...customer, customer_address: e.target.value })}
                        className=''
                        placeholder='ທີ່ຢູ່'
                    />
                </div>
                <div className=' w-full flex items-center'>
                    <Button onClick={handleSubmit} color='primary'>+</Button>
                </div>
            </div>
        </div>
    )
}

export default formCustomer