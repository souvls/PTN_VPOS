"use client"
import { displayLaoDate } from '@/lib/dateFomat';
import { Button, Input } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import Barcode from 'react-barcode';
import Image from 'next/image';
import Logo from '../../app/assets/logo.svg';
import { useReactToPrint } from 'react-to-print';
import Bill from '@/models/Bill';
import Swal from 'sweetalert2';
import { getCookie } from '@/lib/cookie';

const ShowMyBill = () => {
    const printRef = React.useRef(null);
    const printCancelRef = React.useRef(null);
    const [print, setPrint] = useState(false);
    const [id, setID] = useState("");
    const [bills, setBills] = React.useState([{
        _id: "",
        bill_id: "",
        bill_customer_id: { customer_name: "", customer_phone: "" },
        bill_user_id: { user_name: "" },
        bill_date: "",
        bill_type: 0,
        bill_total_thb: 0,
        bill_total_lak: 0,
        bill_status: "",
        bill_exchange_rate: 0,
        bill_total_point: 0,
        bill_item: [{
            product_id: "",
            product_name: "",
            product_size: "",
            product_qty: 0,
            product_category: { _id: "", category_name: "" },
            product_unit: { _id: "", unit_name: "" },
            product_price_buy_THB: 0,
            product_price_sale1_THB: 0,
            product_price_sale2_THB: 0,
            product_price_buy_LAK: 0,
            product_price_sale1_LAK: 0,
            product_price_sale2_LAK: 0,
            product_point: 1,
            product_discount: 0,
            product_exp: "",
            product_mfd: "",
            product_address: "",
            product_sum_lak: 0,
            product_total_lak: 0,
            product_total_point: 0
        }],
        bill_money: 0,
        bill_change: 0,
        user_cancelBill: ""
    }]);
    const [cancelbill, setcancelbill] = React.useState({
        _id: "",
        bill_id: "",
        bill_customer_id: { customer_name: "", customer_phone: "" },
        bill_user_id: { user_name: "" },
        bill_date: "",
        bill_type: 0,
        bill_total_thb: 0,
        bill_total_lak: 0,
        bill_status: "",
        bill_exchange_rate: 0,
        bill_total_point: 0,
        bill_item: [{
            product_id: "",
            product_name: "",
            product_size: "",
            product_qty: 0,
            product_category: { _id: "", category_name: "" },
            product_unit: { _id: "", unit_name: "" },
            product_price_buy_THB: 0,
            product_price_sale1_THB: 0,
            product_price_sale2_THB: 0,
            product_price_buy_LAK: 0,
            product_price_sale1_LAK: 0,
            product_price_sale2_LAK: 0,
            product_point: 1,
            product_discount: 0,
            product_exp: "",
            product_mfd: "",
            product_address: "",
            product_sum_lak: 0,
            product_total_lak: 0,
            product_total_point: 0
        }],
        bill_money: 0,
        bill_change: 0,
        user_cancelBill: { user_name: "" }
    })
    const [billIndex, setBillIndex] = React.useState(Number);
    const [dateS, setDateS] = React.useState("");
    const [user, setUser] = useState({ _id: "", user_name: "" })
    const [dateE, setDateE] = React.useState("");
    const [date_start, set_date_start] = React.useState(new Date().toISOString().split('T')[0]);
    const [date_end, set_date_end] = React.useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = React.useState(false);
    const [dateCancelBill, setDateCancelBill] = useState(null);

    React.useEffect(() => {
        getUser();
        fetchBill();
    }, [])
    useEffect(() => {
        if (print) {
            PrintCancel();
        }
    }, [print]);
    const getUser = async () => {
        const cookie = await getCookie("user");
        if (cookie) {
            const data = await JSON.parse(cookie.value)
            setUser(data);
        }
    }
    const fetchBill = async () => {
        setLoading(true);
        setBillIndex(1000)
        const res = await axios.get(`/api/bills?date_start=${date_start}&date_end=${date_end}`);
        if (res.data.code === 999) {
            const data = res.data.result;
            setBills(data.slice().reverse());
            setDateS(res.data.date_start);
            setDateE(res.data.date_end);
        }
        setLoading(false);
    }
    const searchBill = async () => {
        if (id === "") {
            fetchBill()
        }
        try {
            const res = await axios.get(`/api/bills?id=${id}`);
            if (res.data.code === 999) {
                var data = [];
                data.push(res.data.result);
                setBills(data);
            } else {
                setBills([])
            }
        }
        catch { }

    }
    const handleSelectBill = (index: number) => {
        setBillIndex(index);
    }
    const handleCancel = () => {
        Swal.fire({
            title: "ຍົກເລີກໃບບິນ",
            text: "ບິນເລກທີ: " + bills[billIndex].bill_id,
            icon: "question",
            showDenyButton: true,
            confirmButtonText: "ຍົກເລີກ",
            denyButtonText: `ປິດ`,
            confirmButtonColor: "red",
            denyButtonColor: "blue"
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const res = await axios.delete(`/api/bills?id=${user._id}&bill_id=${bills[billIndex].bill_id}`)
                if (res) {
                    setcancelbill(res.data.result);
                    fetchBill();
                    setPrint(true);
                    Swal.fire({
                        text: "success",
                        icon: "success",
                        timer: 5000
                    })
                }
            } else if (result.isDenied) {

            }
        });
    }
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    const PrintCancel = useReactToPrint({
        content: () => printCancelRef.current,
    });
    return (
        <div>
            <div className='w-[1200px] mx-auto flex justify-between'>
                <div className=' w-[70%] p-5'>
                    <div className='flex gap-2 w-[300px] mb-2'>
                        <Input
                            size={"md"}
                            variant="bordered"
                            type="text"
                            placeholder='ຄົ້ນຫາ'
                            value={id}
                            onChange={(e) => setID(e.target.value)}
                            onKeyPress={searchBill}
                        />
                        <Button onClick={searchBill} color="primary"><CiSearch /></Button>
                    </div>
                    <div className=' mt-5 border p5 h-[750px] overflow-auto'>
                        {bills.map((bill, index) => {
                            return (
                                <div>
                                    {bill.bill_status !== "cancel" ?
                                        <div key={index} onClick={() => handleSelectBill(index)} className={`mb-4 border bg-white shadow-lg rounded-lg p-5 hover:bg-sky-200 }`}>
                                            <table className=' w-full'>
                                                <thead>
                                                    <tr>
                                                        <th className=' text-center'>ເລກທີບິນ</th>
                                                        <th className=' text-center'>ລູກຄ້າ</th>
                                                        <th className=' text-center'>ຄະແນນ</th>
                                                        <th className=' text-center'>ລວມເງິນ</th>
                                                        <th className=' text-center'>ເງິນຮັບມາ</th>
                                                        <th className=' text-center'>ເງິນທອນ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className=' text-center'>{bill.bill_id}</td>
                                                        <td className=' text-center'>{bill?.bill_customer_id?.customer_name}</td>
                                                        <td className=' text-center'>{bill.bill_total_point}</td>
                                                        <td className=' text-center'>{bill.bill_total_lak.toLocaleString()}</td>
                                                        <td className=' text-center'>{bill.bill_money.toLocaleString()}</td>
                                                        <td className=' text-center'>{bill.bill_change.toLocaleString()}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        :
                                        <div key={index} className={` opacity-20 mb-4 border-2  shadow-lg rounded-lg p-5`}>
                                            <table className=' w-full'>
                                                <thead>
                                                    <tr>
                                                        <th className=' text-center'>ເລກທີບິນ</th>
                                                        <th className=' text-center'>ລູກຄ້າ</th>
                                                        <th className=' text-center'>ຄະແນນ</th>
                                                        <th className=' text-center'>ລວມເງິນ</th>
                                                        <th className=' text-center'>ເງິນຮັບມາ</th>
                                                        <th className=' text-center'>ເງິນທອນ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className=' text-center'>{bill.bill_id}</td>
                                                        <td className=' text-center'>{bill?.bill_customer_id?.customer_name}</td>
                                                        <td className=' text-center'>{bill.bill_total_point}</td>
                                                        <td className=' text-center'>{bill.bill_total_lak.toLocaleString()}</td>
                                                        <td className=' text-center'>{bill.bill_money.toLocaleString()}</td>
                                                        <td className=' text-center'>{bill.bill_change.toLocaleString()}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className=' w-[30%] p-5'>
                    {bills[billIndex] &&
                        <div>
                            <Button onClick={handlePrint} color='success'>ພິມ</Button>
                            <div className=' w-[58mm] bg-white shadow-lg p-2 my-3'>
                                <div ref={printRef}>
                                    <div className=' flex flex-col items-center' >
                                        <div className='w-full'>
                                            <div className='w-full flex justify-center items-center'>
                                                <Image className='flex' alt='' src={Logo} width={40} />
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <p className='text-[15px] text-center font-bold'>ຮ້ານ ນາງແຫຼ້</p>
                                            <p className='text-[13px] text-center font-bold'>ເຄື່ອງສຳອາງ ຍ່ອຍ-ສົ່ງ</p>
                                            <p className='text-[13px] text-center font-bold'>ບ.ຫຼັກ2, ມ.ສາລະວັນ, ຂ.ສາລະວັນ</p>
                                            <p className='text-[13px] text-center font-bold'>020 22078999</p>
                                        </div>
                                        <div className='w-full pt-2 pb-4 border-y-2 boder-t-2 border-black'>
                                            <p className='text-[10px] font-bold'>{displayLaoDate((bills[billIndex].bill_date))}</p>
                                            <p className='text-[10px] font-bold'>ພະນັກງານຂາຍ: {bills[billIndex].bill_user_id?.user_name}</p>
                                            {bills[billIndex].bill_customer_id &&
                                                <>
                                                    <p className='text-[10px] font-bold'>ລູກຄ້າ: {bills[billIndex].bill_customer_id?.customer_name}</p>
                                                    <p className='text-[10px] font-bold'>ໂທ: {bills[billIndex].bill_customer_id?.customer_phone}</p>
                                                </>
                                            }
                                        </div>
                                        <div className='w-full'>
                                            <h1 className='text-[18px] font-bold text-center py-2'>ໃບບິນຂາຍຍ່ອຍ</h1>
                                            <h1 className='text-[12px] font-bold'>ລາຍການສິນຄ້າ</h1>
                                            {bills[billIndex].bill_item ?
                                                bills[billIndex].bill_item.map((item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div>
                                                                <span className='text-[10px]'>{index + 1}{")."}</span><span className='text-[14px] font-bold'>{item.product_name}</span> <span className='text-[13px] font-bold'>{item.product_size}</span>
                                                            </div>
                                                            <div className='text-[13px] ps-3'>
                                                                <span>{item.product_qty}</span><span>×</span><span>{item.product_price_sale2_LAK.toLocaleString()}</span><span>=</span><span>{item.product_sum_lak.toLocaleString()}</span>
                                                                {item.product_discount > 0 &&
                                                                    <span className='text-[10px] font-bold'>{"  (ຫຼຸດ"}{item.product_discount}{"%)"}</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }) : ""
                                            }
                                        </div>
                                        <div className='w-full border-t-2 border-black pe-3'>
                                            {bills[billIndex].bill_customer_id && <p className='text-left text-[15px]'>ຄະແນນ: {bills[billIndex].bill_total_point && bills[billIndex].bill_total_point}</p>}
                                            <p className='text-left'><span className='text-[18px] font-bold'>ລວມ: {bills[billIndex].bill_total_lak.toLocaleString()}</span ></p>
                                            <p className='text-left'><span className='text-[15px] font-bold'>ເງິນຮັບມາ: {bills[billIndex].bill_money.toLocaleString()}</span ></p>
                                            <p className='text-left'><span className='text-[15px] font-bold'>ເງິນທອນ: {bills[billIndex].bill_change.toLocaleString()}</span ></p>
                                        </div>
                                        <div className=' w-full flex justify-center items-center '>
                                            <Barcode height={30} value={bills[billIndex].bill_id} />
                                        </div>
                                        <div className='pb-3'>
                                            <p className=' font-medium text-[10px] text-center mb-3'>*** ຂອບໃຈລູກຄ້າທີ່ອຸດໜຸນ ***</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={handleCancel} color='danger'>ຍົກເລີກ</Button>
                        </div>
                    }
                </div>
            </div>
            <div className=' hidden'>
                {cancelbill &&
                    <div className='w-[56mm] ' ref={printCancelRef} >
                        <div className='w-full'>
                            <p className=' text-[25px] font-bold text-center'>ຍົກເລີກໃບບິນ</p>
                        </div>
                        <div className='w-full pt-2 pb-4 border-y-2 boder-t-2 border-black'>
                            <p className='text-[15px] font-bold'>{displayLaoDate(cancelbill.bill_date)}</p>
                            <p className='text-[15px] font-bold'>ພະນັກງານຂາຍ: {cancelbill.bill_user_id?.user_name}</p>
                            {cancelbill.bill_customer_id &&
                                <>
                                    <p className='text-[15px] font-bold'>ລູກຄ້າ: {cancelbill.bill_customer_id?.customer_name}</p>
                                    <p className='text-[15px] font-bold'>ໂທ: {cancelbill.bill_customer_id?.customer_phone}</p>
                                </>
                            }
                        </div>
                        <div className=''>
                            <h1 className='text-[12px] font-bold'>ລາຍການສິນຄ້າ</h1>
                            {cancelbill.bill_item ?
                                cancelbill.bill_item.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div>
                                                <span className='text-[13px]'>{index + 1}{")."}</span><span className='text-[16px] font-bold'>{item.product_name}</span> <span className='text-[13px] font-bold'>{item.product_size}</span>
                                            </div>
                                            <div className=' ps-3'>
                                                <span>{item.product_qty}</span><span>×</span><span>{item.product_price_sale2_LAK.toLocaleString()}</span><span>=</span><span>{item.product_sum_lak.toLocaleString()}</span>
                                                {item.product_discount > 0 &&
                                                    <span className='text-[13px] font-bold'>{"  (ຫຼຸດ"}{item.product_discount}{"%)"}</span>
                                                }
                                            </div>
                                        </div>
                                    )
                                }) : ""
                            }
                        </div>
                        <div className='border-t-2 border-black pe-3'>
                            {cancelbill.bill_customer_id && <p className='text-left text-[15px]'>ຄະແນນ: {cancelbill.bill_total_point && cancelbill.bill_total_point.toLocaleString()}</p>}
                            <p className='text-left'><span className='text-[25px] font-bold'>ລວມ: {cancelbill.bill_total_lak && cancelbill.bill_total_lak.toLocaleString()}</span ></p>
                        </div>
                        <div className=' w-full flex justify-center items-center '>
                            <Barcode height={30} value={cancelbill.bill_id} />
                        </div>
                        <div className='pb-3'>
                            <p className=' font-medium text-[15px] text-center'>*** ຜູ້ສັ່ງຍົກເລີກໃບບິນ: {user.user_name} ***</p>
                            <p className=' font-medium text-[15px] text-center'>*** {dateCancelBill} ***</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}


export default ShowMyBill