"use client"
import { displayLaoDate } from '@/lib/dateFomat';
import { Button } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';

interface Product {
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
  product_address: "",
}
const Report_product = () => {
  const printRef = useRef(null);
  const [timePrint, setTimePrint] = React.useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fettdata();
  }, [])
  const fettdata = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.result);

  }
  const calculateProduct = () => {
    var count_product = 0;
    var sum_qty_product = 0;
    var total_lak = 0;
    var total_thb = 0;

    count_product = products.length;
    for (const i of products) {
      sum_qty_product += i.product_qty;
      if (i.product_qty > 0) {
        total_lak += i.product_price_buy_LAK *i.product_qty;
        total_thb += i.product_price_buy_THB *i.product_qty;
      }

    }
    return { count_product, sum_qty_product, total_lak, total_thb }
  }
  const handlePrint = async () => {
    setTimePrint(displayLaoDate(new Date().toString()));
    if (timePrint) {
      Print();
    }
  }
  const Print = useReactToPrint({
    content: () => printRef.current,
  })
  return (
    <div className=' w-[210mm] mx-auto mt-10'>
      <Button onClick={handlePrint} color='primary'>ພິມລາຍງານ</Button>
      <div ref={printRef} className='p-5'>
        <p className=' text-sm text-center'>ລາຍງານສິນຄ້າໃນຮ້ານ</p>
        <p className=' text-center text-sm'>ເວລາສັ່ງພິມ {timePrint}</p>
        <table>
          <tbody>
            <tr>
              <th className=' border p-2'>ລາຍການສິນຄ້າ ທັງໝົດ</th>
              <td className=' border text-end p-2'>{calculateProduct().count_product.toLocaleString()}{" ລາຍການ"}</td>
            </tr>
            <tr>
              <th className=' border p-2'>ຈຳນວນສິນຄ້າ ທັງໝົດ</th>
              <td className=' border text-end p-2'>{calculateProduct().sum_qty_product.toLocaleString()}{" ptcs"}</td>
            </tr>
            <tr>
              <th className=' border p-2'>ຕົ້ນທຶນກີບ</th>
              <td className=' border text-end p-2'>{calculateProduct().total_lak.toLocaleString()} {" KIP"}</td>
            </tr>
            <tr>
              <th className=' border p-2'>ຕົ້ນທຶນບາດ</th>
              <td className=' border text-end p-2'>{calculateProduct().total_thb.toLocaleString()}{" THB"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Report_product