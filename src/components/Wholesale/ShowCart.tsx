// // src/components/Cart.tsx
// "use client";
// import React, { useContext } from 'react';
// import { CartContext } from '../../contexts/CartWholesaleContext'; // Đường dẫn đến CartContext
// import axios from 'axios';

// const ShowCart = () => {
//     const cartContext = useContext(CartContext);

//     if (!cartContext) {
//         return <p>Giỏ hàng không khả dụng.</p>;
//     }

//     const { qtyProductCart, cart, removeProduct, increaseQuantity, decreaseQuantity } = cartContext;

//     const handleAddQTY = async (id: string) => {
//         const res = await axios.get(`/api/products?id=${id}`);
//         if (res.data.code === 999) {
//             const product = res.data.result;
//             if (product.product_qty - (qtyProductCart(id) + 1) >= 0) {
//                 increaseQuantity(id, 1);
//             }
//         }
//     }
//     return (
//         <div>
//             <div className="">
//                 <div className="h-[640px] overflow-y-auto border">
//                     <table className=" w-full">
//                         <thead className="w-full sticky top-0">
//                             <tr className=" border bg-green-500 text-back">
//                                 <th className="border text-center py-1">ລະຫັດສິນຄ້າ</th>
//                                 <th className="border text-center">ຊື່ສິນຄ້າ</th>
//                                 <th className="border text-center">ລາຄາ LAK</th>
//                                 <th className="border text-center">ລາຄາ THB</th>
//                                 <th className="border text-center">ຈຳນວນ</th>
//                                 <th className="border text-center">ຄະແນນ</th>
//                                 <th className="border text-center">ລວມ LAK</th>
//                                 <th className="border text-center">ລວມ THB</th>
//                                 <th></th>
//                             </tr>
//                         </thead>
//                         <tbody className="">
//                             {cart.slice().reverse().map((item) => {
//                                 return (
//                                     <tr>
//                                         <td className="border text-start">{item.product_id}</td>
//                                         <td className="border text-start">{item.product_name}{" "}{item.product_size}</td>
//                                         <td className="border text-end">{item.product_price_sale1_LAK.toLocaleString()}</td>
//                                         <td className="border text-end">{item.product_price_sale1_THB.toLocaleString()}</td>
//                                         <td className="border py-2 font-bold">
//                                             <div className=' flex justify-around items-center gap-3'>
//                                                 <button onClick={() => decreaseQuantity(item.product_id, 1)} className='bg-sky-500 px-2 rounded-lg'>-</button>
//                                                 {item.product_qty}{" "}{item?.product_unit.unit_name}
//                                                 <button onClick={() => handleAddQTY(item.product_id)} className='bg-sky-500 px-2 rounded-lg'>+</button>
//                                             </div>
//                                         </td>
//                                         <td className="border text-center font-bold">{item.product_total_point.toLocaleString()}</td>
//                                         <td className="border text-end font-bold text-[20px] text-green-500">{item.product_total_lak.toLocaleString()}</td>
//                                         <td className="border text-end font-bold text-[20px] text-blue-500">{item.product_total_thb.toLocaleString()}</td>
//                                         <td className="border"><button onClick={() => removeProduct(item.product_id)} className="text-[#f31260] w-full"><p className=" text-center px-2">X</p></button></td>
//                                     </tr>
//                                 )
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div >
//     );
// };

// export default ShowCart;
