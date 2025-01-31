
import Link from 'next/link';
import React from 'react'
import { MdEdit } from "react-icons/md";
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
interface TableProps {
    products: Product[];
    page:Number
}

const TableProduct: React.FC<TableProps> = ({ products,page }) => {
    const [selectIndex, setSelectIndex] = React.useState(Number);
    const handleSelect = (e: number) => {
        setSelectIndex(e);
    }
    return (
        <div className=' mt-5 px-5 bg-white'>
            <table className='min-w-full table-auto'>
                <thead className='bg-gray-200 sticky top-0 z-50'>
                    <tr className=''>
                        {/* <th className=' border  border-black py-2 '>ລຳດັບ</th> */}
                        <th className=' border  border-black py-2 '>ລະຫັດສິນຄ້າ</th>
                        <th className=' border  border-black py-2 '>ຊື່ສິນຄ້າ</th>
                        <th className=' border  border-black py-2 '>ຂະໜາດ</th>
                        <th className=' border  border-black py-2 '>ຈຳນວນ</th>
                        <th className=' border  border-black py-2 '>ປະເພດສິນຄ້າ</th>
                        <th className=' border  border-black py-2 bg-green-300'>ຕົ້ນທຶນ LAK</th>
                        <th className=' border  border-black py-2 bg-green-300'>ສົ່ງ LAK</th>
                        <th className=' border  border-black py-2 bg-green-300'>ຍ່ອຍ LAK</th>
                        <th className=' border  border-black py-2 bg-blue-300'>ຕົ້ນທຶນ THB</th>
                        <th className=' border  border-black py-2  bg-blue-300'>ສົ່ງ THB</th>
                        <th className=' border  border-black py-2  bg-blue-300'>ຍ່ອຍ THB</th>
                        <th className=' border  border-black py-2 '>ສ່ວນຫຼຸດ</th>
                        <th className=' border  border-black py-2 '>ຄະແນນ</th>
                        <th className=' border  border-black py-2 '>ວັນຜະລິດ</th>
                        <th className=' border  border-black py-2 '>ວັນໝົດອາຍຸ</th>
                        <th className=' border  border-black py-2 '>ທີ່ຢູ່</th>
                        <th className=' border  border-black py-2 '></th>

                    </tr>
                </thead>
                <tbody className=' w-full h-[80%] overflow-hidden'>
                    {products && products.map((item, index) => {
                        return (
                            <tr key={index} onClick={() => handleSelect(index)} className={`${index === selectIndex ? ' bg-blue-200 font-bold duration-100' : ' hover:bg-slate-300'} `}>
                                {/* <td className=' border  border-black text-center'>{(Number(page)*20)-(Number(page)*20-index)+1}</td> */}
                                <td className=' border  border-black py-1'>{item.product_id}</td>
                                <td className=' border border-black'>{item.product_name}</td>
                                <td className=' border  border-black'>{item.product_size}</td>
                                <td className=' border  border-black text-end'><span className={`font-bold ${item.product_qty <= 3 ? 'text-red-500' : 'text-black'}`}>{item.product_qty}</span>{" "}{item.product_unit.unit_name}</td>
                                <td className=' border  border-black'>{item.product_category.category_name}</td>
                                <td className=' border  border-black text-end text-green-800 font-medium'>{item.product_price_buy_LAK > 0 ? item.product_price_buy_LAK.toLocaleString() : "-"}</td>
                                <td className=' border  border-black text-end text-green-800 font-medium'>{item.product_price_sale1_LAK > 0 ? item.product_price_sale1_LAK.toLocaleString() : "-"}</td>
                                <td className=' border  border-black text-end text-green-800 font-medium'>{item.product_price_sale2_LAK > 0 ? item.product_price_sale2_LAK.toLocaleString() : "-"}</td>
                                <td className=' border  border-black text-end text-blue-800 font-medium'>{item.product_price_buy_THB > 0 ? item.product_price_buy_THB.toLocaleString() : "-"}</td>
                                <td className=' border  border-black text-end text-blue-800 font-medium'>{item.product_price_sale1_THB > 0 ? item.product_price_sale1_THB.toLocaleString() : "-"}</td>
                                <td className=' border  border-black text-end text-blue-800 font-medium'>{item.product_price_sale2_THB > 0 ? item.product_price_sale2_THB.toLocaleString() : "-"}</td>
                                <td className=' border  border-black text-end'>{item.product_discount > 0 ? item.product_discount + "%" : "-"}</td>
                                <td className=' border  border-black text-center'>{item.product_point}</td>

                                <td className=' border  border-black text-center'>{
                                    item.product_mfd &&
                                    <input
                                        className='w-28'
                                        type='date'
                                        value={new Date(item.product_mfd).toISOString().split('T')[0]}
                                        disabled
                                    />}
                                </td>
                                <td className=' border  border-black'>{
                                    item.product_exp &&
                                    <input
                                        className='w-28'
                                        type='date'
                                        value={new Date(item.product_exp).toISOString().split('T')[0]}
                                        disabled
                                    />}
                                </td>
                                <td className=' border  border-black text-end text-blue-800'>{item.product_address}</td>
                                <td className=' border border-black'><Link href={"/admin/front-manager/edit-product/" + item.product_id}><MdEdit /></Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default TableProduct