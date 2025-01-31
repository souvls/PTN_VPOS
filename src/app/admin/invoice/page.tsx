"use client"
import { Button, Input, Link } from '@nextui-org/react';
import axios from 'axios';
import { title } from 'process';
import React, { useEffect, useState } from 'react'
import { IoArrowBackSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';

const page = () => {
    const [isInvoice1, setIsInvoice1] = useState<boolean>(true);
    const [invoices, SetInvoices] = useState<any[]>();
    const [id, setId] = useState("");

    useEffect(() => {
        fetchdata();
    }, [])
    const fetchdata = async () => {
        try {
            const res = await axios.get("/api/app/invoices");
            SetInvoices(res.data);
            // console.log(res)
        } catch (error) {

        }
    }
    const handleCancelInvoice = (id: string) => {
        Swal.fire({
            title: "ຍົກເລີກບິນເລກທີ " + id,
            icon: "question",
            showConfirmButton: true,
            confirmButtonText: "ຍົກເລີກໃບບິນ",
            showCancelButton: true,
            cancelButtonText: "ປິດ",
            focusCancel: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete("/api/app/invoices?id=" + id);
                    Swal.fire("", "", "success").then(() => {
                        window.location.reload();
                    });
                } catch (error) {

                }
            }
        })
    }
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id === "") {
            fetchdata();
        } else {
            try {
                const res = await axios.get("/api/bills?id=" + id)
                if (res.data.code === 999) {
                    SetInvoices([res.data.result])
                } else {
                    SetInvoices([]);
                }
            } catch (error) {

            }
        }
    }
    return (
        <div className=' py-4 w-[800px] mx-auto'>
            <div className=' flex justify-start gap-4'>
                <Link className='p-2' href={"/admin"}>
                    <Button radius="full">
                        <IoArrowBackSharp />
                    </Button>
                </Link>
                <form className='w-full' onSubmit={handleSearch}>
                    <Input type='text' value={id} onChange={(e) => { setId(e.target.value) }} label="ລະຫັດໃບບິນ" className=' mb-2' />
                </form>
            </div>
            {invoices && invoices.length < 1 && <p className=' text-center py-3 text-red-500'>ບໍ່ມິ</p>}
            {invoices?.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={`p-3 mb-3 rounded-lg ${item.bill_status === 'cancel' ? 'bg-gray-500' : item.bill_type === 0 ? 'bg-blue-200' : 'bg-red-200'}`}
                    >
                        <div className=' flex justify-between items-center'>
                            <div className=' flex justify-start items-center'>
                                <span className=' pe-3'>ເລກທີບິນ: {item.bill_id},</span>
                                <span className=''>{item.bill_date_string}</span>
                                <div className='ps-5 inline-block'>
                                    <p>ລວມກີບ {item?.bill_total_lak?.toLocaleString()}</p>
                                    <p>ລວມບາດ {item?.bill_total_thb?.toLocaleString()}</p>
                                </div>
                            </div>
                            {item.bill_type === 1 && <Button color='primary'>ພິມບິນ</Button>}
                            {item.bill_status === 'normal' ? <Button onClick={() => handleCancelInvoice(item.bill_id)} color='warning'>ຍົກເລີກ</Button> : <span className=' text-red-400'>ຍົກເລີກແລ້ວ</span>}
                        </div>

                    </div>
                )
            })}
            {/* <div className=' w-full bg-slate-300'>
                <div onClick={()=>setIsInvoice1(true)} className={`inline-block p-3 rounded-lg ${isInvoice1 ? 'bg-white' : ''}`}>
                    ບິນຂາຍຍ່ອຍ
                </div>
                <div onClick={()=>setIsInvoice1(false)} className={`inline-block p-3 rounded-lg ${!isInvoice1 ? 'bg-white' : ''}`}>
                    ບິນຂາຍສົ່ງ
                </div>
            </div> */}
        </div>
    )
}

export default page