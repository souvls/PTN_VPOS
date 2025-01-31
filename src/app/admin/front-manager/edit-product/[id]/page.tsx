"use client"
import EditProduct from '@/components/Product/Editproduct';
import M_Spinner from '@/components/Spinner/Full_spinner'
import { Button, Input } from '@nextui-org/react'
import axios from 'axios';
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import Swal from 'sweetalert2';
const product = {
    _id: "",
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
    product_point: 0,
    product_discount: 0,
    product_exp: "",
    product_mfd: "",
    product_address: ""
}
interface ProductPageProps {
    params: {
        id: string;
    };
}
const page: React.FC<ProductPageProps> = ({ params }) => {
    const router = useRouter();
    const { id } = params;
    const [newProduct, setNewProduct] = React.useState<any>({});
    const [unitsList, setUnitList] = React.useState([{
        _id: "",
        unit_name: ""
    }]);
    const [categoryList, setCategoryList] = React.useState<{
        _id: string,
        category_name: string
    }[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [errors, setErrors] = React.useState({ product_id: "", product_name: "" });

    useEffect(() => {
        setIsLoading(true);
        getProduct();
        getCategorys();
        getUnits();
        setIsLoading(false);
    }, []);
    const getProduct = async () => {
        const res = await axios.get(`/api/findproductbyid/${id}`);
        //console.log(res.data.result)
        setNewProduct(res.data.result);
    }
    async function getUnits() {
        const res = await axios.get(`/api/unit`);
        setUnitList(res.data.result)
    }
    async function getCategorys() {
        const res = await axios.get(`/api/category`);
        setCategoryList(res.data.result)
    }
    async function handleSubmit(): Promise<void> {
        if (!newProduct.product_id) {
            setErrors({ ...errors, product_id: "ລະຫັດສິນຄ້າ ບໍ່ສາມາດວ່າງໄດ້" })
        }
        if (!newProduct.product_name) {
            setErrors({ ...errors, product_name: "ຊື່ສິນຄ້າ ບໍ່ສາມາດວ່າງໄດ້" })
        }

        if (!errors.product_id && !errors.product_name) {
            Swal.fire({
                title: "ອັບເດດ",
                text: "ອັບເດດຂໍ້ມູນສິນຄ້າ?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ອັບເດດ",
                cancelButtonText: "ຍົກເລີກ"
            }).then(async result => {
                if (result.isConfirmed) {
                    setIsLoading(true)
                    const res = await axios.put("/api/put-product", { newProduct })
                    setIsLoading(false)
                    if (res.data.code === 999) {
                        Swal.fire({
                            title: "ອັບເດດສິນຄ້າສຳເລັດ",
                            icon: "success",
                            timer: 1000
                        })
                        router.back();
                    }
                }
            })

        }
    }

    function handleDelete(): void {
        Swal.fire({
            title: "ລຶບສິນຄ້າ",
            text: "ລຶບສິນຄ້ານີ້?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ລຶບ",
            cancelButtonText: "ຍົກເລີກ"
        }).then(async result => {
            if (result.isConfirmed) {
                setIsLoading(true)
                const res = await axios.delete("/api/products?id=" + newProduct._id);
                console.log(res)
                setIsLoading(false);
                if (res.status === 200) {
                    Swal.fire({
                        title: "ລຶບສຳເລັດ",
                        icon: "success",
                        timer: 1000
                    })
                    router.back();
                }
            }
        });
    }
    return (
        <div>
            <div className=' flex justify-start items-center gap-2 shadow-lg'>
                <Link className='p-2' href={"/admin/front-manager/list-product"}>
                    <Button radius="full">
                        <IoArrowBackSharp />
                    </Button>
                </Link>
                <p className=' text-xl font-medium'>ແກ້ໄຂສິນຄ້າ</p>
            </div>
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
                                value={newProduct.product_id}
                                isInvalid={errors.product_id ? true : false}
                                onChange={(e) => setNewProduct({ ...newProduct, product_id: e.target.value.trim() })}
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
                                    value={newProduct.product_name}
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
                                value={newProduct.product_qty}
                                onChange={(e) => setNewProduct({ ...newProduct, product_qty: parseInt(e.target.value) })}
                            />
                            <div className='w-full'>
                                <p>ໜ່ວຍເອີ້ນສິນຄ້າ</p>
                                <select
                                    className=' border py-2 rounded-lg'
                                    value={newProduct.product_unit?._id}
                                    onChange={(e) => setNewProduct({
                                        ...newProduct, product_unit: {
                                            ...newProduct.product_unit,
                                            _id: e.target.value
                                        }
                                    })}
                                >
                                    {unitsList.map((item, index) => {
                                        return (
                                            <option key={index} value={item._id}>
                                                {item.unit_name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='w-full'>
                                <p>ປະເພດສິນຄ້າ</p>
                                <select
                                    className=' border py-2 rounded-lg'
                                    value={newProduct.product_category?._id}
                                    onChange={(e) => setNewProduct({
                                        ...newProduct, product_category: {
                                            ...newProduct.product_category,
                                            _id: e.target.value
                                        }
                                    })}
                                >
                                    {categoryList.map((item, index) => {
                                        return (
                                            <option key={index} value={item._id}>
                                                {item.category_name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='w-full mt-3 flex justify-between gap-4'>
                            <Input
                                size={"md"}
                                variant="bordered"
                                type="number"
                                label="ສ່ວນຫຼຸດ %"
                                value={newProduct?.product_discount?.toString()}
                                onChange={(e) => setNewProduct({ ...newProduct, product_discount: parseInt(e.target.value) })}
                            />
                            <Input
                                size={"md"}
                                variant="bordered"
                                type="number"
                                label="ຄະແນນ"
                                value={newProduct?.product_point?.toString()}
                                onChange={(e) => setNewProduct({ ...newProduct, product_point: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className='w-full mt-3 flex justify-between gap-4'>
                            <div className='w-full'>
                                <p>ວັນຜະລິດ</p>
                                <input
                                    type='date'
                                    className="p-2 border rounded-lg"
                                    value={newProduct.product_mfd && new Date(newProduct.product_mfd).toISOString().split('T')[0]}
                                    onChange={(e) => setNewProduct({ ...newProduct, product_mfd: e.target.value })}
                                />
                            </div>
                            <div className='w-full'>
                                <p>ວັນໝົດອາຍຸ</p>
                                <input
                                    type='date'
                                    className="p-2 border rounded-lg"
                                    value={newProduct.product_exp && new Date(newProduct.product_exp).toISOString().split('T')[0]}
                                    onChange={(e) => setNewProduct({ ...newProduct, product_exp: e.target.value })}
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
                                    value={newProduct?.product_price_buy_LAK?.toString()}
                                    onChange={(e) => setNewProduct({ ...newProduct, product_price_buy_LAK: parseInt(e.target.value) })}
                                />
                                <Input
                                    size={"md"}
                                    color='success'
                                    type="number"
                                    label="THB"
                                    value={newProduct?.product_price_buy_THB?.toString()}
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
                                    value={newProduct?.product_price_sale1_LAK?.toString()}
                                    onChange={(e) => setNewProduct({ ...newProduct, product_price_sale1_LAK: parseInt(e.target.value) })}
                                />
                                <Input
                                    size={"md"}
                                    color='success'
                                    type="number"
                                    label="THB"
                                    value={newProduct?.product_price_sale1_THB?.toString()}
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
                                    value={newProduct?.product_price_sale2_LAK?.toString()}
                                    onChange={(e) => setNewProduct({ ...newProduct, product_price_sale2_LAK: parseInt(e.target.value) })}
                                />
                                <Input
                                    size={"md"}
                                    color='success'
                                    type="number"
                                    label="THB"
                                    value={newProduct?.product_price_sale2_THB?.toString()}
                                    onChange={(e) => setNewProduct({ ...newProduct, product_price_sale2_THB: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pt-10 px-44'>
                    <Button onClick={handleSubmit} color="warning" className='w-full' variant="shadow">
                        ອັບເດດ
                    </Button>
                </div>
                <div className='pt-10 px-44 flex justify-end'>
                    <Button onClick={handleDelete} color="danger" className='w-[50px]' variant="shadow">
                        ລືບສິນຄ້າ
                    </Button>
                </div>

            </div>
            {/* <EditProduct product={product} categorys={categorys} units={units} /> */}
        </div>
    )
}
export default page
