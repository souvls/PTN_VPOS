"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { CartContext } from '@/contexts/CartWholesaleContext';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/lib/cookie';
import { useReactToPrint } from 'react-to-print';
import MyQr1 from "@/app/assets/myqr1.jpg"
import Logo1 from "@/app/assets/logo.svg"
import Swal from 'sweetalert2';
import axios from 'axios';
import Image from 'next/image';
import { displayLaoDate } from '@/lib/dateFomat';

const Sale = () => {
    const router = useRouter()
    const [totalCart_LAK, setTotalCart_LAK] = useState(0);
    const [totalCart_THB, setTotalCart_THB] = useState(0);
    const [totalPoint, setTotalPoint] = useState(0);
    const [user, setUser] = useState({ password: "", user_address: "", user_name: "", user_phone: "", user_role: "", username: "", _id: "" });
    const [bill, setBill] = useState({
        _id: "",
        bill_id: "",
        bill_user_id: { _id: "", user_name: "" },
        bill_customer_id: { _id: "", customer_id: "", customer_name: "", customer_phone: "", customer_address: "" },
        bill_date: "",
        bill_type: 0,
        bill_total_thb: 0,
        bill_total_lak: "",
        bill_status: "",
        bill_exchange_rate: 0,
        bill_total_point: 0,
        bill_item: [{
            _id: "",
            product_id: "",
            product_name: "",
            product_size: "",
            product_qty: 0,
            product_category: [],
            product_unit: { _id: "", unit_name: "" },
            product_price_buy_THB: 0,
            product_price_sale1_THB: 0,
            product_price_sale2_THB: 0,
            product_price_buy_LAK: 0,
            product_price_sale1_LAK: 0,
            product_price_sale2_LAK: 0,
            product_point: 0,
            product_discount: 0,
            product_exp: "",
            product_mfd: "",
            product_address: "",
            product_sum_lak: "",
            product_total_lak: "",
            product_sum_thb: "",
            product_total_thb: "",
            product_total_point: "",
        }],
        bill_money: 0,
        bill_change: 0,
    });
    const [isPrint, setIsPrint] = useState(false);
    const cartContext = useContext(CartContext);
    const printRef = useRef<HTMLDivElement>(null);

    if (!cartContext) {
        throw new Error('no cart');
    }
    const { cart, customer, rate, clear } = cartContext;

    useEffect(() => {
        async function fetchdata() {
            const cookie = await getCookie("user");
            if (cookie) {
                const user = await JSON.parse(cookie.value);
                setUser(user);
            }
        }
        fetchdata();
    }, []);

    useEffect(() => {
        setTotalCart_LAK(TTCart_LAK);
        setTotalCart_THB(TTCart_THB);
        setTotalPoint(TTPoint);
    }, [cart]);

    useEffect(() => {
        if (isPrint) {
            handlePrint();
        }
    }, [bill]);
    const TTCart_LAK = () => {
        return cart.reduce((total, item) => total + item.product_total_lak, 0);
    }
    const TTCart_THB = () => {
        return cart.reduce((total, item) => total + item.product_total_thb, 0);
    }
    const TTPoint = () => {
        return cart.reduce((total, item) => total + item.product_total_point, 0);
    }
    const handleSubmit = async () => {
        if (cart.length <= 0) {
            Swal.fire({
                title: "ບໍ່ມີສິນຄ້າ",
                icon: "error"
            });
        } else {
            const data = {
                user_id: user,
                customer_id: customer._id ? customer._id : null,
                sale_type: 0,
                total_lak: TTCart_LAK(),
                total_thb: TTCart_THB(),
                total_point: TTPoint(),
                exchange_rate: rate.exchange_rate,
                cart: JSON.stringify(cart),
                money: 0,
                change: 0
            }
            const res = await axios.post('/api/wholesale', data);
            console.log(res)
            if (res.status === 201) {
                clear();
                setBill(res.data);
                setIsPrint(true);
            }
        }
    }
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });
    return (
        <div className=' w-[1000px] h-[150px]  border-2 bg-white rounded-tl-[500px] pe-14'>
            <div className='w-full h-full flex justify-end items-center gap-10'>
                {/* <div className='flex items-end border-e-2 border-fuchsia-500'>
                    <span className=' text-[30px] font-bold text-fuchsia-500'>{totalPoint.toLocaleString()}</span>
                    <span className=' text-fuchsia-500 pe-3'>ຄະແນນ</span>
                </div> */}
                <div className='border-e-2 border-fuchsia-500'>
                    <span className=' text-[65px] font-bold text-green-500 '>{totalCart_LAK.toLocaleString()}</span>
                    <span className=' text-green-600 pe-3'>ກີບ</span>
                </div>
                <div>
                    <span className=' text-[65px] font-bold text-blue-500'>{totalCart_THB.toLocaleString()}</span>
                    <span className=' text-blue-500 pe-3'>ບາດ</span>
                </div>
                <div>
                    <Button color='success' onClick={handleSubmit} className=' text-[24px] text-white h-[90px] w-[250px]'><span className=' text-[40px] font-bold'>ຂາຍ</span></Button>
                </div>
            </div>
            <div ref={printRef} className=' w-[210mm] px-5 py-5' >
                <div className='w-full flex justify-between pb-3 border-b-2'>
                    <div>
                        <Image src={Logo1} alt='' width={100} />
                    </div>
                    <div className=' mt-7'>
                        <p className=' text-[20px] font-bold text-center'>ຮ້ານຂາຍເຄື່ອງສຳອາງ</p>
                        <p className=' text-[20px] font-bold text-center'>ພັດທະນາ (ແຫຼ້) ສາລະວັນ</p>
                        <p className=' text-[18px] font-bold text-center'>ບ. ຫຼັກສອງ, ມ.ສາລະວັນ, ຂ.ສາລະວັນ</p>
                        <p className=' text-[18px] font-bold text-center'>ໂທ 020 52 446 666</p>
                    </div>
                    <div>
                        <Image src={MyQr1} alt='' width={100} />
                    </div>
                </div>
                <div className=' w-full'>
                    <p className='text-[20px] text-center font-bold py-3'>ໃບບິນຂາຍສົ່ງ</p>
                </div>
                <div className='w-full flex justify-between'>
                    <div>
                        <p className=' text-sm'>{displayLaoDate(bill.bill_date)}</p>
                        <p className=' text-sm'>ອັດຕາແລກປ່ຽນ: {bill.bill_exchange_rate}</p>
                        <p className=' text-sm'>ພະນັກງານຂາຍ: {bill.bill_user_id.user_name}</p>
                    </div>
                    <div>
                        <p className=' text-sm font-bold'>ຂໍ້ມູນລູກຄ້າ</p>
                        <p className=' text-sm'>ລະຫັດ: {bill.bill_customer_id?.customer_id}</p>
                        <p className=' text-sm'>ຊື່: {bill.bill_customer_id?.customer_name}</p>
                        <p className=' text-sm'>ເບີໂທ: {bill.bill_customer_id?.customer_phone}</p>
                        <p className=' text-sm'>ທີ່ຢູ່:{bill.bill_customer_id?.customer_phone}</p>
                    </div>
                </div>
                <div className=' w-full mt-3'>
                    <table className='w-full text-sm'>
                        <thead>
                            <tr>
                                <th className='border py-2'>ລຳດັບ</th>
                                <th className='border'>ລະຫັດສິນຄ້າ</th>
                                <th className='border'>ຊື່ສິນຄ້າ</th>
                                <th className='border'>ລາຄາ LAK</th>
                                <th className='border'>ລາຄາ THB</th>
                                <th className='border'>ຈຳນວນ</th>
                                <th className='border'>ລວມ LAK</th>
                                <th className='border'>ລວມ THB</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bill.bill_item.length > 0 && bill.bill_item.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='border text-center'>{index + 1}</td>
                                        <td className='border'>{item.product_id}</td>
                                        <td className='border'>{item.product_name}{" "}{item.product_size}</td>
                                        <td className='border text-end'>{item.product_price_sale1_LAK.toLocaleString()}</td>
                                        <td className='border text-end'>{item.product_price_sale1_THB.toLocaleString()}</td>
                                        <td className='border text-center'>{item.product_qty}{" "}{item.product_unit.unit_name}</td>
                                        <td className='border text-end'>{item.product_total_lak.toLocaleString()}</td>
                                        <td className='border text-end'>{item.product_total_thb.toLocaleString()}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan={6} className='border text-end text-xl font-bold' >
                                    ລວມ
                                </td>
                                <td className='border text-end text-xl font-bold' >
                                    {bill.bill_total_lak.toLocaleString()}
                                </td>
                                <td className='border text-end text-xl font-bold' >
                                    {bill.bill_total_thb.toLocaleString()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className=' flex justify-around mt-10'>
                    <p className=' font-bold'>ຜູ້ຮັບເງິນ</p>
                    <p className=' font-bold'>ຜູ້ຈ່າຍເງິນ</p>
                </div>
                <div className=' m-20'>
                    <p className=' text-center italic'>ຂອບໃຈລູກຄ້າທີ່ອຸດໜູນ</p>
                </div>
            </div>
        </div>
    )
}

export default Sale

