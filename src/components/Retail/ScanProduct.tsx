"use client"
import React, { useState, useContext, forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import { CartContext } from '../../contexts/CartRetailContext';
import axios from 'axios';
import { Button, Spinner } from '@nextui-org/react';
import { FaSearch } from "react-icons/fa";
import Swal from 'sweetalert2';



const ScanProduct = forwardRef((props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const cartContext = useContext(CartContext);
    const [barcode, setBarcode] = useState("");
    const [errors, setErrors] = useState({ product_id: "" });
    const [isLoading, setIsLoading] = useState(false);

    if (!cartContext) {
        return <div>Context not found</div>;
    }
    const { addProduct, customer, setCustomer } = cartContext;

    useImperativeHandle(ref, () => ({
        focusInput() {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }));
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (barcode.slice(0, 3) === "PTN") {
                findCustomer(barcode);
                setBarcode("");
            } else {
                findProduct(barcode);
                setBarcode("");
            }
        }
    };

    const findProduct = async (id: string) => {
        setIsLoading(true);
        const error = { product_id: "" };
        try {
            const res = await axios.get(`/api/findproductbyid/${id}`);
            if (res.data.code === 999) {
                if (res.data.result.product_qty <= 0) {
                    error.product_id = "ສິນຄ້າໝົດ";
                    PlaySound();
                    Swal.fire({
                        text: "ສິນຄ້າໝົດ",
                        icon: "error",
                        timer: 1000,
                        showConfirmButton: false
                    });
                } else {
                    addProduct(res.data.result);
                    error.product_id = "";
                }
            }
            if (res.data.code === 0) {
                PlaySound();
                Swal.fire({
                    text: res.data.message,
                    icon: "error",
                    timer: 1000,
                    showConfirmButton: false
                });
                error.product_id = res.data.message;
            }
            setErrors(error);
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false);
        setBarcode("")
    };
    const findCustomer = async (customer_id: string) => {
        const error = { product_id: "" };
        try {
            const res = await axios.get("/api/customer?id=" + customer_id);
            if (res.data.code === 999) {
                const customer = res.data.result
                setCustomer(customer);
                error.product_id = "";
            }
            if (res.data.code === 0) {
                error.product_id = res.data.message;
            }
            setErrors(error);

        } catch (err) {
            console.log(err)
        }
    }
    const handdleUpdateCustomerPiont = () => {
        Swal.fire({
            title: 'ຄະແນນທີ່ຕ້ອງການຫັກ',
            html: `
            <p>ລະຫັດ: ${customer.customer_id}</p>
            <p>ຊື່ລູກຄ້າ: ${customer.customer_name}</p>
            <p>ຄະແນນ: ${customer.customer_point}</p>
            `,
            input: 'number',
            inputAttributes: {
                'aria-label': 'point'
            },
            showCancelButton: true,
            confirmButtonText: 'ຫັກ',
            confirmButtonColor: "red",
            preConfirm: (value) => {
                const point = Number(value);
                if (isNaN(point) || point === 0) {
                    Swal.showValidationMessage('ຄະແນນຜິດ');
                    return false; // Ngăn chặn submit khi giá trị không hợp lệ
                } else {
                    return -point; // Giá trị hợp lệ
                }
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = {
                    id: customer._id,
                    point: result.value,
                }
                const res = await axios.put('/api/customer', data);
                if (res.data.result) {
                    setCustomer(res.data.result)
                    Swal.fire({
                        title: "ສຳເລັດ",
                        icon: "success",
                        timer: 2000
                    })

                }
            }
        });
    }
    const PlaySound = () => {
        const audio = new Audio("/wrong.mp3");
        audio.play();
    }
    return (
        <>
            <div className='w-full'>
                <p className=' text-center text-xl font-bold'>ລະຫັດສິນຄ້າ & ລະຫັດລູກຄ້າ</p>
                <div className=' relative'>
                    <input type="text"
                        className="w-full text-xl ps-8 py-2 border rounded-lg bg-sky-200"
                        value={barcode}
                        ref={inputRef}
                        onChange={(e) => { setBarcode(e.target.value) }}
                        onKeyPress={handleKeyPress}
                        autoFocus
                    />
                    <div className=' absolute z-50  left-2 top-3'>
                        <FaSearch size={20} />
                    </div>
                </div>
                <div className=' h-[10px] flex justify-start items-center gap-2 mt-5'>
                    {isLoading && <Spinner />}
                    {errors.product_id && <span className=' text-red-500 text-xl font-bold'>{errors.product_id}</span>}
                </div>

                <div className='w-full'>

                    <div className="mt-10 w-full p-3 rounded-lg">
                        <p className=" font-bold mb-2 text-xl text-center">ຂໍ້ມູນລູກຄ້າ</p>
                        <table className=' w-full'>
                            <tbody>
                                <tr className=''>
                                    <th className='border-2 text-start text-xl ps-2'>ລະຫັດລູກຄ້າ</th>
                                    <td className='border-2 text-xl'>{customer.customer_id}</td>
                                </tr>
                                <tr className=''>
                                    <th className='border-2 text-start text-xl ps-2'>ຊື່ລູກຄ້າ</th>
                                    <td className='border-2 text-xl ps-2'>{customer.customer_name}</td>
                                </tr>
                                <tr className=''>
                                    <th className='border-2 text-start text-xl ps-2'>ເບີໂທ</th>
                                    <td className='border-2 text-xl ps-2'>{customer.customer_phone}</td>
                                </tr>
                                <tr className=''>
                                    <th className='border-2 text-start text-xl ps-2'>ທີ່ຢູ່</th>
                                    <td className='border-2 text-xl ps-2'>{customer.customer_address}</td>
                                </tr>
                                <tr className=''>
                                    <th className='border-2 text-start text-xl ps-2'>ຄະແນນ</th>
                                    <td className='border-2 text-xl ps-2'>{customer.customer_point}</td>
                                </tr>
                            </tbody>
                        </table>
                        {customer.customer_id &&
                            <div className=' mt-3'>
                                <Button color='danger' onClick={handdleUpdateCustomerPiont} className=''>ລົບຄະແນນ</Button>
                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
})

export default ScanProduct;