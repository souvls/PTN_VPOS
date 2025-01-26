"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Button, Input, Pagination } from '@nextui-org/react'
import { IoArrowBackSharp } from 'react-icons/io5'
import axios from 'axios'
import TableProduct from '@/components/Product/TableProduct'
import { displayLaoDate } from '@/lib/dateFomat'
import { useReactToPrint } from 'react-to-print'


interface Product {
    _id: string;
    product_id: string;
    product_name: string;
    product_size: string;
    product_qty: number;
    product_category: { category_name: string };
    product_unit: { unit_name: string };
    product_price_buy_THB: number;
    product_price_sale1_THB: number;
    product_price_sale2_THB: number;
    product_price_buy_LAK: number;
    product_price_sale1_LAK: number;
    product_price_sale2_LAK: number;
    product_point: number;
    product_discount: number;
    product_exp: Date;
    product_mfd: Date;
    product_address: string
}
interface Data {
    productList: Product[]
}

const ListProduct = () => {
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(20);
    const [length, setLength] = useState(0);
    const [showPaginate, setShowPaginate] = useState(true);
    const [products, setProducts] = useState<Product[]>();
    const [key, setKey] = useState("");
    const [qtySerach, setQtySearch] = useState(Number);
    const [loading, setLoading] = useState(false);
    const printRef = useRef(null);
    const [title, setTitle] = useState("");
    const [datePrint, setDatePrint] = useState("")

    useEffect(() => {
        setTitle("ລາຍການສິນຄ້າທັງໝົດ");
        fetchProduct();
    }, []);
    useMemo(() => {
        const fetchdata = async () => {
            const res = await axios.get(`/api/products?pages=${pages}=&limit=${limit}`);
            setProducts(res.data.result.result);
        }
        fetchdata();
    }, [pages]);

    const fetchProduct = async () => {
        setLoading(true);
        const res = await axios.get(`/api/products?pages=${pages}&limit=${20}`);
        setProducts(res.data.result.result);
        setLength(res.data.result.length);
        setShowPaginate(true);
        setLoading(false);
    }
    const allProduct = async () => {
        setLoading(true);
        const res = await axios.get("/api/products");
        setProducts(res.data.result);
        setLoading(false);
    }
    const handlePageChange = async (page: number) => {
        setPages(page);
    }
    const searchKey = async () => {
        if (key) {
            setLoading(true);
            const res = await axios.get("/api/findproductbykey/" + key);
            const result = res.data.result
            if (result) {
                setProducts(result)
            }
            setLoading(false);
        }
    }
    const searchQty = async () => {
        setLoading(true);
        const res = await axios.get("/api/findproductbyqty/" + qtySerach);
        const result = res.data.result
        if (result) {
            setProducts(result);
        }
        setLoading(false);
    }
    const exsoon = async () => {
        setLoading(true);
        const res = await axios.get("/api/findproductexsoon");
        const result = res.data.result
        if (result) {
            setProducts(result);
        }
        setLoading(false);
    }
    const handleAllProduct = () => {
        setTitle("ລາຍການສິນຄ້າທັງໝົດ");
        allProduct();
        setShowPaginate(false);
    }
    const hanhdleSearchKey = () => {
        searchKey();
        setShowPaginate(false);
    }
    const handleSearchQty = () => {
        setTitle("ລາຍການສິນຄ້າ ຍັງເຫຼືອ " + qtySerach);
        searchQty();
        setShowPaginate(false);

    }
    const handleExsoon = () => {
        setTitle("ລາຍການສິນຄ້າໃກ້ໝົດອາຍຸ");
        exsoon();
        setShowPaginate(false);
    }
    const handlePrint = () => {
        setDatePrint(displayLaoDate(new Date().toString()));
        Print();
    }
    const Print = useReactToPrint({
        content: () => printRef.current,
    });
    return (
        <div>
            <div className=' flex justify-between gap-2 items-center shadow-lg'>
                <div className=' flex justify-start items-center gap-2'>
                    <Link className='p-2' href={"/admin/front-manager/menu"}>
                        <Button radius="full">
                            <IoArrowBackSharp />
                        </Button>
                    </Link>
                    <p className=' text-xl font-medium'>ລາຍການສິນຄ້າ</p>
                </div>
                <div className=' flex justify-start gap-2'>
                    <Input type="text" value={key} onChange={e => setKey(e.target.value)} onKeyPress={searchKey} placeholder='ລະຫັດສິນຄ້າ,ຊື່....' />
                    <Button color='primary' onClick={hanhdleSearchKey}>ຄົ້ນຫາ</Button>
                </div>
                <div className=' flex justify-start gap-3 me-5'>
                    <div className=' flex items-center gap-2'>
                        <Input type="Number" className='w-14' value={qtySerach.toString()} onChange={e => setQtySearch(parseInt(e.target.value))} min={0} />
                        <Button onClick={handleSearchQty} color='warning'>ສິນຄ້າເຫຼືອນ້ອຍ</Button>
                    </div>
                    <Button onClick={handleExsoon} color='danger'>ສິນຄ້າໃກ້ໝົດອາຍຸ</Button>
                    <Button onClick={handleAllProduct} color='success'>ສິນຄ້າທັງໝົດ</Button>
                    <Button onClick={fetchProduct} >ສິນຄ້າທັງໝົດແບ່ງໜ້າ</Button>
                    <Button onClick={handlePrint} color='primary'>ພິມລາຍການສິນຄ້າ</Button>

                </div>
            </div>
            {loading && <p className=' text-green-500 px-5 font-bold'>...loading</p>}
            {products &&
                <>
                    <TableProduct products={products} />
                    {showPaginate && <div className=' flex my-5 justify-center'><Pagination total={length} initialPage={1} onChange={handlePageChange} /></div>}
                </>
            }
            <div className='hidden' >
                <div ref={printRef} className='w-[219mm] p-7 '>
                    <p className=' text-center font-bold text-sm'>{title}</p>
                    <p className=' text-center font-bold text-sm'>ເວລາສັ່ງພິມ {datePrint}</p>
                    <div className='mt-5'>
                        <table className='w-full text-[12px]'>
                            <thead>
                                <tr>
                                    <th className='border'>ລະຫັດສິນຄ້າ</th>
                                    <th className='border'>ຊື່ສິນຄ້າ</th>
                                    <th className='border'>ຈຳນວນ</th>
                                    <th className='border'>ຕົ້ນທຶນ LAK</th>
                                    <th className='border'>ຍ່ອຍ LAK</th>
                                    <th className='border'>ຕົ້ນທຶນ THB</th>
                                    <th className='border'>ຍ່ອຍ THB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.length > 0 && products.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='border'>{item.product_id}</td>
                                            <td className='border'>{item.product_name}{" "}{item.product_size}</td>
                                            <td className='border text-end'>{item?.product_qty}{" "}{item?.product_unit.unit_name}</td>
                                            <td className='border text-end'>{item.product_price_buy_LAK > 0 ? item.product_price_buy_LAK.toLocaleString() : "-"}</td>
                                            <td className='border text-end'>{item.product_price_sale2_LAK > 0 ? item.product_price_sale2_LAK.toLocaleString() : "-"}</td>
                                            <td className='border text-end'>{item.product_price_buy_THB > 0 ? item.product_price_buy_THB.toLocaleString() : "-"}</td>
                                            <td className='border text-end'>{item.product_price_sale2_THB > 0 ? item.product_price_sale2_THB.toLocaleString() : "-"}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ListProduct