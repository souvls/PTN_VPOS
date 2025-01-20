// src/components/Cart.tsx
"use client";
import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartRetailContext'; // Đường dẫn đến CartContext

const ShowCart = () => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        return <p>Giỏ hàng không khả dụng.</p>;
    }

    const { cart, removeProduct, increaseQuantity, decreaseQuantity } = cartContext;

    return (
        <div>
            <div className="px-2 py-5 h-[805px] bg-white rounded-xl shadow-lg border-2">
                <div className="h-[655px] overflow-y-auto border">
                    <table className=" w-full text-xl">
                        <thead className="w-full sticky top-0">
                            <tr className=" border bg-gray-300 text-black">
                                <th className="border text-center">ລ/ດ</th>
                                <th className="border text-center">ລະຫັດສິນຄ້າ</th>
                                <th className="border text-center">ຊື່ສິນຄ້າ</th>
                                <th className="border text-center">ຈຳນວນ</th>
                                <th className="border text-center font-bold">ລາຄາ(ກີບ)</th>
                                <th className="border text-center font-bold">ລາຄາ(ບາດ)</th>
                                <th className="border text-center font-bold">ເປັນເງິນ</th>
                                <th className="border text-center">ສ່ວນຫຼຸດ</th>
                                <th className="border text-center">ຄະແນນ</th>
                                <th className="border text-center font-bold">ລວມ(ກີບ)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {cart.slice().reverse().map((item, index) => {
                                return (
                                    <tr key={index}>
                                        {index === 0 ?
                                            <>
                                                <td className="text-xl border-2 border-black text-center py-6 bg-green-200">{index + 1}</td>
                                                <td className="text-xl border-2 border-black ps-1 text-start bg-green-200">{item.product_id}</td>
                                                <td className="text-xl border-2 border-black ps-1 text-start font-bold bg-green-200">{item.product_name}{" "}{item.product_size}</td>
                                                <td className="text-xl border-2 border-black px-1 font-bold bg-green-200 ">
                                                    <div className=' flex justify-around items-center gap-3'>
                                                        <button onClick={() => decreaseQuantity(item.product_id, 1)} className='bg-sky-500 px-2 rounded-lg'>-</button>
                                                        {item.product_qty}{" "}{item.product_unit?.unit_name}
                                                        <button onClick={() => increaseQuantity(item.product_id, 1)} className='bg-sky-500 px-2 rounded-lg'>+</button>
                                                    </div>
                                                </td>
                                                <td className="text-xl border-2 border-black text-end bg-green-200">{item.product_price_sale2_LAK.toLocaleString()}</td>
                                                <td className="border-2 border-black text-end bg-green-200">{item.product_price_sale2_THB.toLocaleString()}</td>
                                                <td className="border-2 border-black text-end  bg-green-200">{item.product_sum_lak.toLocaleString()}</td>
                                                <td className="border-2 border-black text-end  bg-green-200">{item.product_discount}{"%"}</td>
                                                <td className="border-2 border-black text-center  bg-green-200">{item.product_point.toLocaleString()}</td>
                                                <td className="border-2 border-black  text-end font-bold text-[20px] text-green-600 bg-green-200">{item.product_total_lak.toLocaleString()}</td>
                                                <td className="border-2 border-black"><button onClick={() => removeProduct(item.product_id)} className="text-[#f31260] w-full"><p className=" text-center px-2">X</p></button></td>
                                            </>
                                            :
                                            <>
                                                <td className="border text-center">{index + 1}</td>
                                                <td className="border text-start">{item.product_id}</td>
                                                <td className="border text-start">{item.product_name}{" "}{item.product_size}</td>
                                                <td className="border py-2 font-bold">
                                                    <div className=' flex justify-around items-center gap-3'>
                                                        <button onClick={() => decreaseQuantity(item.product_id, 1)} className='bg-sky-500 px-2 rounded-lg'>-</button>
                                                        {item.product_qty}{" "}{item.product_unit?.unit_name}
                                                        <button onClick={() => increaseQuantity(item.product_id, 1)} className='bg-sky-500 px-2 rounded-lg'>+</button>
                                                    </div>
                                                </td>
                                                <td className="border text-end">{item.product_price_sale2_LAK.toLocaleString()}</td>
                                                <td className="border text-end">{item.product_price_sale2_THB.toLocaleString()}</td>
                                                <td className="border text-end font-bold">{item.product_sum_lak.toLocaleString()}</td>
                                                <td className="border text-end font-bold">{item.product_discount}{"%"}</td>
                                                <td className="border text-end font-bold">{item.product_point.toLocaleString()}</td>
                                                <td className="border text-end font-bold text-[20px] text-green-600">{item.product_total_lak.toLocaleString()}</td>
                                                <td className="border"><button onClick={() => removeProduct(item.product_id)} className="text-[#f31260] w-full"><p className=" text-center px-2">X</p></button></td>
                                            </>
                                        }

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div >
    );
};

export default ShowCart;
