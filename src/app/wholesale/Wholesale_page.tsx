"use client"
import { Button, Input, Switch } from '@nextui-org/react'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { TiDelete } from "react-icons/ti";
import Swal from 'sweetalert2';
import Image from 'next/image';
import Logo1 from "../../../public/assets/logo.svg"
import MyQr1 from '../../../public/assets/myqr1.jpg'
import { QRCodeSVG } from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';
const Wholesale_page: React.FC<{ id: String }> = (id) => {
  const [barcode, setBarcode] = useState("");
  const [bill, setBill] = useState<any>();
  const [exchange, setExchange] = useState<number>(0);
  const [isSelected, setIsSelected] = React.useState<boolean>();
  const [cart, setCart] = useState<any[]>([]);
  const [product, setProduct] = useState<any>();
  const [error, setError] = useState<string>();
  const ref_barcode = useRef<HTMLInputElement>(null);
  const ref_print = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLTableSectionElement>(null);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  useEffect(() => {
    ref_barcode.current?.focus();
    fetchExchange();
    const t_cart = localStorage.getItem("t_cart");
    if (t_cart) {
      setCart(JSON.parse(t_cart))
    }
    const value = localStorage.getItem('autoqty');
    if (value) {
      setIsSelected(JSON.parse(value))
    }
  }, [])

  const fetchExchange = async () => {
    try {
      const res = await axios.get("/api/exchange");
      setExchange(res.data);
    } catch (error) {
      setError("error exchange");
    }
  }
  const total_cart_lak = () => {
    var total = 0;
    cart.map(item => {
      total += item.total_lak;
    })
    return total;
  }
  const total_cart_thb = () => {
    var total = 0;
    cart.map(item => {
      total += item.total_thb;
    })
    return total;
  }
  const handleScanProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.get("/api/app/find-product-id?id=" + barcode);
    if (res.data.result !== null) {
      setProduct(res.data.result);
      if (res.data.result?.product_price_sale1_LAK > 0 || res.data.result?.product_price_sale1_THB > 0) {
        setError("")
        const _product = res.data.result
        if (isSelected) {
          addToCart(_product, 1);
        } else {
          const { value: qty } = await Swal.fire({
            title: "ໃສ່ຈຳນວນ",
            input: "number",
            inputLabel: _product.product_name + " " + _product.product_size,
            inputPlaceholder: _product.product_unit.unit_name
          });
          if (qty) {
            if (qty > 0) {
              addToCart(_product, Number(qty));
            } else {
              Swal.showValidationMessage(`
                ຈຳນວນບໍ່ຖືກ
              `);
            }
          } else {
            addToCart(_product, 1);
          }

        }
      } else {
        setError("ສິນຄ້າບໍ່ມີລາຄາ");
        const audio = new Audio("/wrong.mp3");
        audio.play();
      }
    } else {
      setError("ບໍ່ພົບສິນຄ້າ: " + barcode);
      setProduct(null);
      const audio = new Audio("/wrong.mp3");
      audio.play();
    }
    setBarcode("");
  }
  const addToCart = (_product: any, qty: number) => {
    const index = cart.findIndex(x => x.product_id == _product.product_id);
    if (index === -1) {
      const newitem = {
        product_id: _product.product_id,
        product_name: _product.product_name,
        product_size: _product.product_size,
        product_price_sale1_LAK: _product.product_price_sale1_LAK,
        product_price_sale1_THB: _product.product_price_sale1_THB,
        product_qty: qty,
        product_unit: _product.product_unit?.unit_name,
        total_lak: _product.product_price_sale1_LAK,
        total_thb: _product.product_price_sale1_THB
      }
      if (cart.length > 0) {
        setHighlightIndex(cart.length);
        setTimeout(() => setHighlightIndex(null), 1000); // 👈 Hiệu ứng mất dần sau 1s
      }
      if (cartRef.current) {
        // cartRef.current.scrollTop = cartRef.current.scrollHeight;
        cartRef.current.scrollTo({
          top: cartRef.current.scrollHeight,
          behavior: "smooth", // 👈 Cuộn mượt
        });
      }
      let _cart = [...cart, newitem]
      setCart(_cart);
      localStorage.setItem("t_cart", JSON.stringify(_cart));
    } else {
      const updatedCart = [...cart]; // Sao chép mảng gốc để tránh mutate state
      updatedCart[index] = {
        ...updatedCart[index],
        product_qty: updatedCart[index].product_qty + qty, // Cập nhật số lượng
        total_lak: (updatedCart[index].product_qty + qty) * updatedCart[index].product_price_sale1_LAK,
        total_thb: (updatedCart[index].product_qty + qty) * updatedCart[index].product_price_sale1_THB
      };
      if (cart.length > 0) {
        setHighlightIndex(index);
        setTimeout(() => setHighlightIndex(null), 1000); // 👈 Hiệu ứng mất dần sau 1s
      }
      setCart(updatedCart);
      localStorage.setItem("t_cart", JSON.stringify(updatedCart));
    }

  }
  const removeFromCart = (product_id: string) => {
    const updatecart = cart.filter(item => item.product_id !== product_id)
    setCart(updatecart);
    localStorage.setItem("t_cart", JSON.stringify(updatecart));
  };
  const handleChange = (e: boolean) => {
    setIsSelected(e);
    localStorage.setItem("autoqty", JSON.stringify(e));
    ref_barcode.current?.focus()
  }
  const handleSubmit = async () => {
    if (cart.length > 0) {
      Swal.fire({
        title: "ຂາຍສົ່ງ",
        html: `
        <table>
        <tr>
        <td class="text-start text-[20px]">ລວມກີບ: ${total_cart_lak().toLocaleString()} ກີບ</td>
        </tr>
        <tr>
        <td class="text-start text-[20px]">ລວມກີບ: ${total_cart_thb().toLocaleString()} ບາດ</td>
        </tr>
        </table>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ຢືນຢັນຂາຍ",
        cancelButtonText: "ຍົກເລີກ"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axios.post("/api/app/wholesale", {
              user_id: id.id,
              customer_id: null,
              total_lak: total_cart_lak(),
              total_thb: total_cart_thb(),
              exchange_rate: exchange,
              cart: cart
            });
            setBill(res.data);
            setTimeout(() => {
              handlePrint();
            }, 3000);
            Swal.fire({
              title: "ຖ້າແປັບໜຶ່ງ  ນະຈະ",
              timer: 3000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
              },
              allowOutsideClick: false
            })
            // console.log(res);
          } catch (error) {
            console.log(error);
          }
        }
      });

    }
  }
  const handlePrint = useReactToPrint({
    content: () => ref_print.current,
  });
  return (
    <>
      <div className='w-full flex justify-between'>
        <div className=' w-[30%] h-[90vh] border-r-2 border-black p-5'>
          <div className=' py-4 flex justify-between items-center'>
            <span>ອັດຕາແລກປ່ຽນ: {exchange}</span>
            <div className="flex flex-col gap-2">
              <Switch isSelected={isSelected} onValueChange={handleChange}>
                ຈຳນວນສິນຄ້າ ອັດຕະໂນມັດ
              </Switch>
            </div>
          </div>
          <form onSubmit={handleScanProduct}>
            <label>ລະຫັດສິນຄ້າ</label>
            <Input
              type='text'
              variant="bordered"
              value={barcode}
              ref={ref_barcode}
              onChange={(e) => setBarcode(e.target.value)} />
            {error && <p className=' text-red-500'>{error}</p>}
          </form>
          <div className=' mt-5 text-[16px]'>
            <table>
              <tbody>
                <tr>
                  <th className=' border p-2 text-start'>ລະຫັດສິນຄ້າ</th>
                  <td className=' border p-2'>{product?.product_id}</td>
                </tr>
                <tr >
                  <th className=' border p-2 text-start'>ຊື່ສິນຄ້າ</th>
                  <td className=' border p-2'>{product?.product_name}{" "}{product?.product_size}</td>

                </tr>
                <tr >
                  <th className=' border p-2 text-start'>ຈຳນວນຍັງເຫຼືອ</th>
                  <td className=' border p-2'>{product?.product_qty}{" "}{product?.product_unit?.unit_name}</td>

                </tr>
                <tr >
                  <th className=' border p-2 text-start'>ລາຄາສົ່ງ LAK</th>
                  <td className=' border p-2'>{product?.product_price_sale1_LAK.toLocaleString()}</td>

                </tr>
                <tr >
                  <th className=' border p-2 text-start'>ລາຄາສົ່ງ THB</th>
                  <td className=' border p-2'>{product?.product_price_sale1_THB.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
            <div className=' mt-3' onDoubleClick={() => {
              setCart([]);
              localStorage.removeItem("t_cart");
            }}>
              <Button color="warning">ລ້າງກະຕ່າ</Button>
            </div>
          </div>

          <p className=' mt-5'>ລວມ</p>
          <hr className='mb-2' />
          <div className=' mt text-[30px]'>
            <p className=' text-end font-bold'>{total_cart_lak().toLocaleString()} ກີບ</p>
            <p className=' text-end font-bold'>{total_cart_thb().toLocaleString()} ບາດ</p>
          </div>
          <div className=' flex justify-end mt-4'>
            <Button color='primary' className=' text-[20px] text-white' onClick={handleSubmit}>ຂາຍສົ່ງ</Button>
          </div>
        </div>

        <div className=' w-[70%] p-2 pe-3'>
          <div className="overflow-hidden">
            <div className="h-[90vh] overflow-y-auto" ref={cartRef}>
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-white shadow-md z-10">
                  <tr className=' bg-slate-100'>
                    <th className='p-2 border'>ລ/ດ</th>
                    <th className='p-2 border'>ລະຫັດສິນຄ້າ</th>
                    <th className='p-2 border'>ຊື່ສິນຄ້າ</th>
                    <th className='p-2 border'>ຈຳນວນ</th>
                    <th className='p-2 border'>ໜ່ວຍເອີ້ນ</th>
                    <th className='p-2 border'>ລາຄາ ກີບ</th>
                    <th className='p-2 border'>ລວມ ກີບ</th>
                    <th className='p-2 border'>ລາຄາ ບາດ</th>
                    <th className='p-2 border'>ລວມ ບາດ</th>
                    <th className='p-2 border'></th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((item, index) => {
                    return (
                      <tr key={index}
                        className={`border-b border-gray-300 transition-all duration-500 ${highlightIndex === index ? "bg-yellow-200" : ""
                          }`}
                      >
                        <td className=' border-2 py-1 text-center'>{index + 1}</td>
                        <td className=' border-2 ps-2 py-1'>{item?.product_id}</td>
                        <td className=' border-2 ps-2'>{item?.product_name}{" "}{item?.product_size}</td>
                        <td className=' border-2 ps-2 text-center'>{item?.product_qty}</td>
                        <td className=' border-2 ps-2 text-center'>{item?.product_unit}</td>
                        <td className=' border-2 pe-2 text-right'>
                          {
                            item?.product_price_sale1_LAK > 0 ? item?.product_price_sale1_LAK?.toLocaleString() : "-"
                          }
                        </td>
                        <td className=' border-2 pe-2 text-right'>
                          {
                            item?.total_lak > 0 ? item?.total_lak?.toLocaleString() : "-"
                          }
                        </td>
                        <td className=' border-2 pe-2 text-right'>
                          {
                            item?.product_price_sale1_THB > 0 ? item?.product_price_sale1_THB?.toLocaleString() : "-"
                          }
                        </td>
                        <td className=' border-2 pe-2 text-right'>
                          {
                            item?.total_thb > 0 ? item?.total_thb?.toLocaleString() : "-"
                          }
                        </td>
                        <td className=' text-center border-2'><button onClick={() => removeFromCart(item.product_id)}><TiDelete size={25} className=' text-red-500' /></button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      <div className=' hidden'>
        <div ref={ref_print} className=' w-[210mm] px-5 py-5' >
          <div className='w-full flex justify-between pb-3 border-b-2'>
            <div>
              <div className=' inline-block'>
                <QRCodeSVG size={100} value={"00020101021138590016A00526628466257701082771041802030020316mch5d0077995d4ae5204597753034185802LA5911 LAEKOPSOHP6002SL62200716stk66ac4090b073b6304DE71"} />
                <p className=' text-[10px] text-center'>BCEL ONE (LAK)</p>
              </div>
            </div>
            <div className=''>
              <div className=' flex justify-center items-center'>
                <Image src={Logo1} alt='' width={100} unoptimized priority />
              </div>

              <p className=' text-[18px] text-center'>ຮ້ານຂາຍເຄື່ອງສຳອາງ</p>
              <p className=' text-[18px] text-center'>ພັດທະນາ (ແຫຼ້) ສາລະວັນ</p>
              <p className=' text-[18px] text-center'>ບ. ຫຼັກສອງ, ມ.ສາລະວັນ, ຂ.ສາລະວັນ</p>
              <p className=' text-[18px] text-center'>ໂທ 020 52 446 666</p>
            </div>
            <div>
              <div className=' inline-block pe-3'>
                <QRCodeSVG size={100} value={"00020101021133480004BCEL0108TRANSFER0224PZVVLXVEQMFPAQFBTXWPNSCP53034185802LA63043047"} />
                <p className=' text-[10px] text-center'>BCEL ONE (THB)</p>
              </div>

              {/* <Image src={MyQr1} alt='' width={100} /> */}
            </div>
          </div>
          <div className=' w-full'>
            <p className='text-[20px] text-center font-bold py-3'>ໃບບິນຂາຍສົ່ງ</p>
          </div>
          <div className='w-full flex justify-between'>
            <div>
              <p className=' text-sm'>ເລກທີບິນ: {bill?.bill_id}</p>
              <p className=' text-sm'>{bill?.bill_date_string}</p>
              <p className=' text-sm'>ອັດຕາແລກປ່ຽນ: {bill?.bill_exchange_rate}</p>
              {/* <p className=' text-sm'>ພະນັກງານຂາຍ: {bill?.bill_user_id.user_name}</p> */}
            </div>
            {/* <div>
            <p className=' text-sm font-bold'>ຂໍ້ມູນລູກຄ້າ</p>
            <p className=' text-sm'>ລະຫັດ: {bill?.bill_customer_id?.customer_id}</p>
            <p className=' text-sm'>ຊື່: {bill?.bill_customer_id?.customer_name}</p>
            <p className=' text-sm'>ເບີໂທ: {bill?.bill_customer_id?.customer_phone}</p>
            <p className=' text-sm'>ທີ່ຢູ່:{bill?.bill_customer_id?.customer_phone}</p>
          </div> */}
          </div>
          <div className=' w-full mt-3'>
            <table className='w-full text-sm'>
              <thead>
                <tr>
                  <th className='border py-2'>ລຳດັບ</th>
                  <th className='border'>ລະຫັດສິນຄ້າ</th>
                  <th className='border'>ຊື່ສິນຄ້າ</th>
                  <th className='border'>ຈຳນວນ</th>
                  <th className='border'>ລາຄາ LAK</th>
                  <th className='border'>ລວມ LAK</th>
                  <th className='border'>ລາຄາ THB</th>
                  <th className='border'>ລວມ THB</th>
                </tr>
              </thead>
              <tbody>
                {bill?.bill_item.length > 0 && bill?.bill_item.map((item: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td className='border text-center'>{index + 1}</td>
                      <td className='border ps-2'>{item.product_id}</td>
                      <td className='border ps-2'>{item.product_name}{" "}{item.product_size}</td>
                      <td className='border text-center'>{item.product_qty}{" "}{item.product_unit}</td>

                      <td className='border text-end pe-2'>{item?.product_price_sale1_LAK.toLocaleString()}</td>
                      <td className='border text-end pe-2'>{item?.total_lak.toLocaleString()}</td>
                      <td className='border text-end pe-2'>{item?.product_price_sale1_THB.toLocaleString()}</td>
                      <td className='border text-end pe-2'>{item?.total_thb.toLocaleString()}</td>
                    </tr>
                  )
                })}
                <tr>
                  <td colSpan={4} className='border text-end text-xl font-bold' >
                    ລວມ
                  </td>
                  <td colSpan={2} className='border text-end text-xl font-bold py-3' >
                    {bill?.bill_total_lak.toLocaleString()}<span className=' text-[10px]'> ກີບ</span>
                  </td>
                  <td colSpan={2} className='border text-end text-xl font-bold' >
                    {bill?.bill_total_thb.toLocaleString()} <span className=' text-[10px]'> ບາດ</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=' flex justify-around mt-10'>
            <p className=' font-bold'>ຜູ້ຮັບເງິນ</p>
            <p className=' font-bold'>ຜູ້ຈ່າຍເງິນ</p>
          </div>
          <div className=' m-20'>
            <p className=' text-center italic'>ຂອບໃຈລູກຄ້າທີ່ອຸດໜູນ</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Wholesale_page