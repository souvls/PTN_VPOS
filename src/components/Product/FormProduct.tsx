"use client"
import React, { useEffect, useRef, useState } from 'react'
import M_Spinner from '@/components/Spinner/Full_spinner'
import { Button, Input } from '@nextui-org/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface Categorys {
    _id: string,
    category_name: string
}
interface Units {
    _id: string,
    unit_name: string
}
interface Data {
    categorys: Categorys[],
    units: Units[]
}
const product = {
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
}
const FormProduct = () => {
    const router = useRouter();
    const barcode = useRef<HTMLInputElement>(null);
    const name = useRef<HTMLInputElement>(null);
    const [btnSave, setBtnSave] = useState(true);
    const [newProduct, setNewProduct] = React.useState(product);
    const [unitsList, setUnitList] = React.useState<Units[]>();
    const [categoryList, setCategoryList] = React.useState<Categorys[]>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [errors, setErrors] = React.useState({ product_id: "", product_name: "", product_category: "", product_unit: "" });

    useEffect(() => {
        getUnits();
        getCategorys();
    }, [])
    async function getUnits() {
        const res = await axios.get(`/api/unit`);
        setUnitList(res.data.result);
    }
    async function getCategorys() {
        const res = await axios.get(`/api/category`);
        setCategoryList(res.data.result);
    }
    const handleSumQty = async (id: string, qty: number) => {
        setIsLoading(true);
        const res = await axios.patch("/api/products", { product_id: id, product_qty: qty });
        setIsLoading(false);
        if (res.data.code === 999) {
            Swal.fire({
                title: "ເພີ່ມສິນຄ້າສຳເລັດ",
                icon: "success",
                timer: 1000
            })
        }
    }
    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newProduct.product_id !== "") {
                if (newProduct.product_id.slice(0, 3) === "PTN") {
                    setNewProduct(product);
                    Swal.fire({
                        title: "ລະຫັດຜິດ ",
                        text: "ນີ້ແມ່ນລະຫັດລູກຄ້າ",
                        icon: "warning",
                    });
                } else {
                    setIsLoading(true);
                    const res = await axios.get("/api/findproductbyid/" + newProduct.product_id);
                    setIsLoading(false);
                    if (res.data.code === 999) {
                        Swal.fire({
                            title: "ສິນຄ້າມີຢູ່ແລ້ວ",
                            html: `
                            <p>ລະຫັດ: ${res.data.result.product_id}</p>
                            <p>ຊື່: ${res.data.result.product_name + " " + res.data.result.product_size}</p>
                            <p>ຈຳນວນ: ${res.data.result.product_qty + " " + res.data.result.product_unit.unit_name}</p>`,
                            showDenyButton: true,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "ເພີ່ມຈຳນວນ",
                            denyButtonText: `ແກ້ໄຂ`,
                            cancelButtonText: 'ປິດ',
                            allowOutsideClick: false
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                const { value: qty } = await Swal.fire({
                                    title: "ເພີ່ມຈຳນວນ",
                                    input: "number",
                                    inputLabel: "ຈຳນວນສິນຄ້າຈະບວກກັບຈຳນວນສິນຄ້າເກົ່າ",
                                    inputPlaceholder: "ຈຳນວນສິນຄ້າ"
                                });
                                if (qty) {
                                    handleSumQty(newProduct.product_id, qty);
                                } else {
                                    Swal.fire({
                                        title: "ບໍ່ສຳເລັດ!!",
                                        text: "ຈຳນວນສິນຄ້ານ້ອຍກວ່າ 1",
                                        icon: "error",
                                    })
                                }
                            } else if (result.isDenied) {
                                router.push("/admin/front-manager/edit-product/" + newProduct.product_id);
                            }
                        })
                        setNewProduct(product);
                    } else {
                        if (name.current) {
                            name.current.focus();
                        }
                        setBtnSave(false);
                    }
                }
            }
        }
    }
    const handleSubmit = () => {
        const error = { product_id: "", product_name: "", product_category: "", product_unit: "" };
        if (!newProduct.product_id) {
            error.product_id = "ລະຫັດສິນຄ້າ ບໍ່ສາມາດວ່າງໄດ້";
        }
        if (!newProduct.product_name) {
            error.product_name = "ຊື່ສິນຄ້າ ບໍ່ສາມາດວ່າງໄດ້";
        }
        if (!newProduct.product_category._id) {
            error.product_category = "ປະເພດສິນຄ້າ ບໍ່ສາມາດວ່າງໄດ້";
        }
        if (!newProduct.product_unit._id) {
            error.product_unit = "ໜ່ວຍເອີ້ນສິນຄ້າ ບໍ່ສາມາດວ່າງໄດ້";
        }
        if (error.product_id === "" && error.product_name === "" && error.product_category === "" && error.product_unit === "") {
            Swal.fire({
                title: "ເພີ່ມສິນຄ້າໃໝ່",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ເພີ່ມ",
                cancelButtonText: "ຍົກເລີກ"
            }).then(async result => {
                if (result.isConfirmed) {
                    setIsLoading(true)
                    const res = await axios.post("/api/products", { newProduct })
                    setIsLoading(false)
                    if (res.data.code === 999) {
                        setNewProduct(product);
                        setBtnSave(true);
                        if (barcode.current) {
                            barcode.current.focus();
                        }
                        Swal.fire({
                            title: "ເພີ່ມສິນຄ້າສຳເລັດ",
                            icon: "success",
                            timer: 1000
                        })
                    } else {
                        Swal.fire("noooooo")
                    }
                }
            })
        } else {
            setErrors(error);
        }
    }

    return (
        <div>
            {isLoading && <M_Spinner />}
            <div className=' mt-10 w-full grid grid-cols-2 gap-20 px-44 '>
                <div className='w-full '>
                    <div className='w-full'>
                        <Input
                            size={"md"}
                            variant="bordered"
                            type="text"
                            label="ລະຫັດສິນຄ້າ"
                            value={newProduct?.product_id}
                            isInvalid={errors.product_id ? true : false}
                            onChange={(e) => setNewProduct({ ...newProduct, product_id: e.target.value.trim() })}
                            onKeyPress={handleKeyPress}
                            ref={barcode}
                            autoFocus
                        />
                        {errors.product_id && <span className=' text-red-500 text-sm'>{errors.product_id}</span>}
                    </div>
                    <div className='w-full mt-3 flex justify-between gap-4'>
                        <div className='w-[60%]'>
                            <Input
                                size={"md"}
                                variant="bordered"
                                type="text"
                                label="ໍຊື່ສິນຄ້າ"
                                ref={name}
                                value={newProduct?.product_name}
                                isInvalid={errors.product_name ? true : false}
                                onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
                            />
                            {errors.product_name && <span className=' text-red-500 text-sm'>{errors.product_name}</span>}
                        </div>
                        <div className='w-[40%]'>
                            <Input
                                size={"md"}
                                variant="bordered"
                                type="text"
                                label="ຂະໜາດ/ປະລິມານ"
                                value={newProduct.product_size}
                                onChange={(e) => setNewProduct({ ...newProduct, product_size: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='w-full mt-3 flex justify-between gap-4'>
                        <Input
                            size={"md"}
                            variant="bordered"
                            type="number"
                            label="ຈຳນວນ"
                            value={newProduct.product_qty.toString()}
                            onChange={(e) => setNewProduct({ ...newProduct, product_qty: parseInt(e.target.value) })}
                        />
                        <div className='w-full'>
                            <p>ໜ່ວຍເອີ້ນສິນຄ້າ</p>
                            <select
                                className=' border rounded-lg'
                                value={newProduct.product_unit._id}
                                onChange={(e) => setNewProduct({
                                    ...newProduct, product_unit: {
                                        ...newProduct.product_unit,
                                        _id: e.target.value
                                    }
                                })}
                            >
                                <option value={""} selected>...</option>
                                {unitsList && unitsList.map((item, index) => {
                                    return (
                                        <option key={index} value={item._id}>
                                            {item.unit_name}
                                        </option>
                                    )
                                })}
                            </select>

                            {errors.product_unit && <span className=' text-red-500 text-sm'>{errors.product_unit}</span>}

                        </div>
                        <div className='w-full'>
                            <p>ປະເພດສິນຄ້າ</p>
                            <select
                                className=' border rounded-lg'
                                value={newProduct.product_category._id}
                                onChange={(e) => setNewProduct({
                                    ...newProduct, product_category: {
                                        ...newProduct.product_category,
                                        _id: e.target.value
                                    }
                                })}
                            >
                                <option value={""} selected>...</option>
                                {categoryList && categoryList.map((item, index) => {
                                    return (
                                        <option key={index} value={item._id}>
                                            {item.category_name}
                                        </option>
                                    )
                                })}
                            </select>
                            {errors.product_category && <span className=' text-red-500 text-sm'>{errors.product_category}</span>}

                        </div>
                    </div>
                    <div className='w-full mt-3 flex justify-between gap-4'>
                        <Input
                            size={"md"}
                            variant="bordered"
                            type="number"
                            label="ສ່ວນຫຼຸດ %"
                            value={newProduct.product_discount.toString()}
                            onChange={(e) => setNewProduct({ ...newProduct, product_discount: parseInt(e.target.value) })}
                        />
                        <Input
                            size={"md"}
                            variant="bordered"
                            type="number"
                            label="ຄະແນນ"
                            value={newProduct.product_point.toString()}
                            onChange={(e) => setNewProduct({ ...newProduct, product_point: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className='w-full mt-3 flex justify-between gap-4'>
                        <div className='w-full'>
                            <p>ວັນຜະລິດ</p>
                            <input
                                type='date'
                                className="p-2 border rounded-lg"
                                value={newProduct.product_mfd}
                                onChange={(e) => setNewProduct({ ...newProduct, product_mfd: e.target.value })}
                                max={newProduct.product_mfd}
                            />
                        </div>
                        <div className='w-full'>
                            <p>ວັນໝົດອາຍຸ</p>
                            <input
                                type='date'
                                className="p-2 border rounded-lg"
                                value={newProduct.product_exp}
                                onChange={(e) => setNewProduct({ ...newProduct, product_exp: e.target.value })}
                                min={newProduct.product_mfd}
                            />
                        </div>
                    </div>
                    <div className='w-full mt-3'>
                        <Input
                            size={"md"}
                            variant="bordered"
                            type="text"
                            label="ບ່ອນໄວ້"
                            value={newProduct.product_address}
                            onChange={(e) => setNewProduct({ ...newProduct, product_address: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <div className='w-full border-t-5 border-red-500 p-3 rounded-lg shadow-md'>
                        <p className=' font-bold text-xl text-center pb-3'>ຕົ້ນທຶນ</p>
                        <div className=' flex justify-between gap-3'>
                            <Input
                                size={"md"}
                                color='primary'
                                type="number"
                                label="LAK"
                                value={newProduct.product_price_buy_LAK.toString()}
                                onChange={(e) => setNewProduct({ ...newProduct, product_price_buy_LAK: parseInt(e.target.value) })}
                            />
                            <Input
                                size={"md"}
                                color='success'
                                type="number"
                                label="THB"
                                value={newProduct.product_price_buy_THB.toString()}
                                onChange={(e) => setNewProduct({ ...newProduct, product_price_buy_THB: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className='mt-5 w-full border-t-5 border-purple-500 p-3 rounded-lg shadow-md'>
                        <p className=' font-bold text-xl text-center pb-3'>ລາຄາສົ່ງ</p>
                        <div className=' flex justify-between gap-3'>
                            <Input
                                size={"md"}
                                color='primary'
                                type="number"
                                label="LAK"
                                value={newProduct.product_price_sale1_LAK.toString()}
                                onChange={(e) => setNewProduct({ ...newProduct, product_price_sale1_LAK: parseInt(e.target.value) })}
                            />
                            <Input
                                size={"md"}
                                color='success'
                                type="number"
                                label="THB"
                                value={newProduct.product_price_sale1_THB.toString()}
                                onChange={(e) => setNewProduct({ ...newProduct, product_price_sale1_THB: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className='mt-5 w-full border-t-5 border-cyan-500 p-3 rounded-lg shadow-md'>
                        <p className=' font-bold text-xl text-center pb-3'>ລາຄາຂາຍຍ່ອຍ</p>
                        <div className=' flex justify-between gap-3'>
                            <Input
                                size={"md"}
                                color='primary'
                                type="number"
                                label="LAK"
                                value={newProduct.product_price_sale2_LAK.toString()}
                                onChange={(e) => setNewProduct({ ...newProduct, product_price_sale2_LAK: parseInt(e.target.value) })}
                            />
                            <Input
                                size={"md"}
                                color='success'
                                type="number"
                                label="THB"
                                value={newProduct.product_price_sale2_THB.toString()}
                                onChange={(e) => setNewProduct({ ...newProduct, product_price_sale2_THB: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-10 px-44'>
                <Button isDisabled={btnSave} onClick={handleSubmit} color="primary" className='w-full' variant="shadow">
                    ບັນທຶກ
                </Button>
            </div>
        </div>
    )
}

export default FormProduct