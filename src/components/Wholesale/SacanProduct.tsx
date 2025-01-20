"use client"
import React, { useState, useContext, useEffect } from 'react'
import { CartContext } from '../../contexts/CartWholesaleContext';
import axios from 'axios';
import { Spinner } from '@nextui-org/react';
import { FaSearch } from "react-icons/fa";
import SwitchQty from "./SwitchQty"
import PaperSize from "./PaperSize"
import Swal from 'sweetalert2';
const ScanProduct = () => {
    const cartContext = useContext(CartContext);
    const [barcode, setBarcode] = useState("");
    const [errors, setErrors] = useState({ product_id: "" });
    const [autoQty, setAutoQty] = useState()
    const [isLoading, setIsLoading] = useState(false);

    if (!cartContext) {
        return <div>Context not found</div>;
    }
    const { qtyProductCart, addProduct, customer, setCustomer } = cartContext;

    useEffect(() => {
        setAutoQty(getLocaleStorageQty());
    }, [])
    const getLocaleStorageQty = () => {
        const value = localStorage.getItem('autoqty');
        if (value) {
            return JSON.parse(value)
        }
    }
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
        try {
            const res = await axios.get(`/api/products?id=${id}`);
            if (res.data.code === 999) {
                const product = res.data.result;
                //check qty
                if (product.product_qty <= 0) {
                    setErrors({ product_id: "ສິນຄ້າໝົດ" });
                } else {
                    //if no auto qty
                    if (!getLocaleStorageQty()) {
                        const inputValue = 1;
                        const { value: qty } = await Swal.fire({
                            title: "ຈຳນວນສິນຄ້າ",
                            text: `ສິນຄ້າໃນຍັງເຫຼືອ ${product.product_qty}${product.product_unit.unit_name}`,
                            input: "number",
                            inputLabel: "",
                            inputValue,
                            showCancelButton: true,
                            inputValidator: (value) => {
                                //check qty input
                                if (!value || parseInt(value) <= 0) {
                                    return "ຈຳນວນບໍ່ຖືກຕ້ອງ";
                                }
                                //check input - stock
                                if (product.product_qty - (qtyProductCart(product.product_id) + parseInt(value)) < 0) {
                                    return "ສິນຄ້າບໍ່ພໍ";
                                }
                            }
                        });
                        if (qty) {
                            addProduct(res.data.result, parseInt(qty));
                            setErrors({ product_id: "" });

                        }
                    } else {
                        if (product.product_qty - (qtyProductCart(product.product_id) + 1) < 0) {
                            setErrors({ product_id: "ສິນຄ້າບໍ່ພໍ" });
                        } else {
                            addProduct(product, 1);
                            setErrors({ product_id: "" });
                        }
                    }
                }
            }
            if (res.data.code === 0) {
                setErrors({ product_id: res.data.message });
            }

        } catch (err) {
            console.log(err)
        }
        setIsLoading(false);
        setBarcode("")
    };
    const findCustomer = async (customer_id: string) => {
        try {
            const res = await axios.get("/api/customer?id=" + customer_id);
            if (res.data.code === 999) {
                const customer = res.data.result
                setCustomer(customer);
                setErrors({ product_id: "" });
            }
            if (res.data.code === 0) {
                setErrors({ product_id: res.data.message });
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className='w-full'>
                <div className=' flex justify-between items-center border-t mt-10 pt-5'>
                    <SwitchQty />
                </div>
                <div>
                    <p className=' text-center text-xl font-bold'>ລະຫັດສິນຄ້າ & ລະຫັດລູກຄ້າ</p>
                    <div className=' relative'>
                        <input type="text"
                            className="w-full text-xl ps-8 py-2 border rounded-lg bg-sky-200"
                            value={barcode}
                            onChange={(e) => { setBarcode(e.target.value) }}
                            onKeyPress={handleKeyPress}
                            autoFocus
                        />
                        <div className=' absolute z-50  left-2 top-3'>
                            <FaSearch size={20} />
                        </div>
                    </div>
                </div>
                <div className=' h-[10px] flex justify-start items-center gap-2 mt-2'>
                    {isLoading && <Spinner />}
                    {errors.product_id && <span className=' text-red-500'>{errors.product_id}</span>}
                </div>

                <div className='w-full'>
                    {/* <div className="mt-5 w-full border p-3 rounded-lg">
                        <p className=" font-bold mb-2">ຂໍ້ມູນສິນຄ້າ</p>
                        <p>ລະຫັດສິນຄ້າ: <span className=" font-medium">{temp_product.product_id}</span></p>
                        <p>ຊື່ສິນຄ້າ: {temp_product.product_name}{" "}{temp_product.product_size}</p>
                        <p>ລາຄາ: {temp_product.product_price_sale2_LAK && temp_product.product_price_sale2_LAK.toLocaleString()}{" ₭"}</p>
                        <p>ລາຄາ: {temp_product.product_price_sale2_THB && temp_product.product_price_sale2_THB.toLocaleString()}{" ฿"}</p>
                        <p>ສ່ວນຫຼຸດ: {temp_product.product_discount}{" %"}</p>
                        <p>ຄະແນນ: {temp_product.product_point}</p>
                    </div> */}
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
                                {/* <tr className=''>
                                    <th className='border-2 text-start text-xl ps-2'>ຄະແນນ</th>
                                    <td className='border-2 text-xl ps-2'>{customer.cus}</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScanProduct;