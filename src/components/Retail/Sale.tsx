"use client"
import { Button } from '@nextui-org/react'
import { CartContext } from '@/contexts/CartRetailContext';
import React, { useState, useContext, useEffect, useRef } from 'react'
import Swal from 'sweetalert2';
import { getCookie } from '@/lib/cookie';
import axios from 'axios';
import Logo from '../../app/assets/logo.svg';
import Barcode from 'react-barcode';
import Image from 'next/image';
import { displayLaoDate } from '@/lib/dateFomat';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/navigation';


interface SaleProps {
    focusScanInput: () => void; // Function to focus input in ScanProduct
}
const Sale: React.FC<SaleProps> = ({ focusScanInput }) => {
    const router = useRouter()
    const [totalCart, setTotalCart] = useState(0);
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

    const printRef = useRef<HTMLDivElement>(null);
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        console.log("nocart")
        return false
    }
    const { rate, cart, customer, clear } = cartContext;

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
        setTotalCart(TTCart);
        setTotalPoint(TTPoint);
    }, [cart]);

    useEffect(() => {
        if (isPrint) {
            handlePrint();
            focusScanInput();
        }
    }, [bill]);


    if (!cartContext) {
        return <p>Giỏ hàng không khả dụng.</p>;
    }
    const TTCart = () => {
        return cart.reduce((total, item) => total + item.product_total_lak, 0);
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
            const roundAmount = () => {
                const amount = TTCart();
                const remainder = amount % 1000;
                if (remainder >= 500) {
                    return Math.ceil(amount / 1000) * 1000;
                } else {
                    return Math.floor(amount / 1000) * 1000;
                }
            }
            Swal.fire({
                title: 'ຈຳນວນເງິນຮັບມາ',
                text: 'ຄ່າເຄື່ອງ:' + roundAmount().toLocaleString(),
                input: 'text',
                inputAttributes: {
                    'aria-label': 'amount'
                },
                showCancelButton: true,
                confirmButtonText: 'ຂາຍ',
                confirmButtonColor: "green",
                preConfirm: (value) => {
                    const amount = Number(value);
                    if (isNaN(amount) || amount < roundAmount() || amount === 0) {
                        Swal.showValidationMessage('ຈຳນວນເງິນຜິດ');
                        return false; // Ngăn chặn submit khi giá trị không hợp lệ
                    } else {
                        return amount; // Giá trị hợp lệ
                    }
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // set_r_money(money.toLocaleString());
                    // set_cash((money - roundAmount()).toLocaleString());
                    const data = {
                        user_id: user._id,
                        customer_id: customer._id ? customer._id : null,
                        sale_type: 0,
                        total_lak: roundAmount(),
                        total_point: TTPoint(),
                        exchange_rate: rate.exchange_rate,
                        cart: JSON.stringify(cart),
                        money: result.value,
                        change: (result.value - roundAmount())
                    }
                    const res = await axios.post('/api/retail', data);
                    if (res) {
                        clear();
                        setBill(res.data);
                        setIsPrint(true);
                    }
                }
            });
        }
    }
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        onAfterPrint() {
            focusScanInput();
        },
    })

    return (
        <div className=' w-[1000px] h-[150px]  border-2 bg-white rounded-tl-[500px] pe-14'>
            <div className='w-full h-full flex justify-end items-center gap-10'>
                <div className='flex items-end border-e-2 border-blue-600'>
                    <span className=' text-[30px] font-bold text-blue-600'>{totalPoint.toLocaleString()}</span>
                    <span className=' text-blue-600 pe-3'>ຄະແນນ</span>
                </div>
                <div>
                    <span className=' text-[65px] font-bold text-green-600'>{totalCart.toLocaleString()}</span>
                    <span className=' text-green-600 pe-3'>ກີບ</span>
                </div>
                <div>
                    <Button color='success' onClick={handleSubmit} className=' text-[24px] text-white h-[90px] w-[250px]'><span className=' text-[40px] font-bold'>ຂາຍ</span></Button>
                </div>
            </div>
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
                        <p className='text-[10px] font-bold'>{displayLaoDate(bill?.bill_date)}</p>
                        <p className='text-[10px] font-bold'>ພະນັກງານຂາຍ: {bill?.bill_user_id?.user_name}</p>
                        {bill?.bill_customer_id &&
                            <>
                                <p className='text-[10px] font-bold'>ລູກຄ້າ: {bill?.bill_customer_id?.customer_name}</p>
                                <p className='text-[10px] font-bold'>ໂທ: {bill?.bill_customer_id?.customer_phone}</p>
                            </>
                        }
                    </div>
                    <div className='w-full'>
                        <h1 className='text-[18px] font-bold text-center py-2'>ໃບບິນຂາຍຍ່ອຍ</h1>
                        <h1 className='text-[12px] font-bold'>ລາຍການສິນຄ້າ</h1>
                        {bill?.bill_item ?
                            bill?.bill_item.map((item, index) => {
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
                        {bill?.bill_customer_id && <p className='text-left text-[15px]'>ຄະແນນ: {bill?.bill_total_point && bill?.bill_total_point.toLocaleString()}</p>}
                        <p className='text-left'><span className='text-[18px] font-bold'>ລວມ: {bill?.bill_total_lak && bill?.bill_total_lak.toLocaleString()}</span ></p>
                        <p className='text-left'><span className='text-[15px] font-bold'>ເງິນຮັບມາ: {bill?.bill_money && bill?.bill_money.toLocaleString()}</span ></p>
                        <p className='text-left'><span className='text-[15px] font-bold'>ເງິນທອນ: {bill?.bill_change && bill?.bill_change.toLocaleString()}</span ></p>
                    </div>
                    <div className=' w-full flex justify-center items-center '>
                        <Barcode height={30} value={bill?.bill_id} />
                    </div>
                    <div className='pb-3'>
                        <p className=' font-medium text-[10px] text-center mb-3'>*** ຂອບໃຈລູກຄ້າທີ່ອຸດໜຸນ ***</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sale