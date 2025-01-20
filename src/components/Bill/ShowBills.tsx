"use client"
import { Button } from '@nextui-org/react';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import MySpinner from '@/components/Spinner/Full_spinner'
import { displayLaoDate, displayLaoDateNoTime } from '@/lib/dateFomat';
import { useReactToPrint } from 'react-to-print';

interface Bill {
    _id: "",
    bill_id: "",
    bill_customer_id: { customer_name: "" },
    bill_user_id: { user_name: "" },
    bill_date: "",
    bill_type: 0,
    bill_total_thb: 0,
    bill_total_lak: 0,
    bill_status: "",
    bill_exchange_rate: 0
    bill_total_point: 0
    bill_item: [{
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
        product_sum_lak: 0,
        product_total_lak: 0,
        product_total_point: 0
    }]
    bill_money: 0,
    bill_change: 0,
    user_cancelBill: ""
}
const ShowBills = () => {
    const printRef = useRef(null);
    const [timePrint, setTimePrint] = React.useState("");
    const [bills, setBills] = React.useState<Bill[]>();
    const [dateS, setDateS] = React.useState("");
    const [dateE, setDateE] = React.useState("");
    const [date_start, set_date_start] = useState(new Date().toISOString().split('T')[0]);
    const [date_end, set_date_end] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        fetchBill();
    }, [])
    const fetchBill = async () => {
        setLoading(true);
        const res = await axios.get(`/api/bills?date_start=${date_start}&date_end=${date_end}`);
        if (res.data.code === 999) {
            setBills(res.data.result);
            setDateS(res.data.date_start);
            setDateE(res.data.date_end);
            setTimePrint(displayLaoDate(new Date().toString()));
        }
        setLoading(false);
    }
    const handdleCalculate = () => {
        fetchBill()
    }


    const calculateBills = () => {
        var product_saling = [];
        var total_buy_LAK = 0;
        var total_buy_THB = 0;
        var total_sum_LAK = 0;
        var total_sum_THB = 0;
        var total_product_lak = 0;
        var total_all_bill_lak = 0;
        if (bills) {
            for (const i of bills) {
                if (i.bill_status) {
                    if (i.bill_status !== "cancel") {
                        total_all_bill_lak += i.bill_total_lak
                        for (const j of i.bill_item) {
                            product_saling.push(j);
                            total_buy_LAK += j.product_price_buy_LAK * j.product_qty;
                            total_buy_THB += j.product_price_buy_THB * j.product_qty;
                            total_sum_LAK += j.product_price_sale2_LAK * j.product_qty;
                            total_sum_THB += j.product_price_sale2_THB * j.product_qty;
                            total_product_lak += j.product_total_lak;
                        }
                    }
                }
            }
        }
        const kamlai = total_product_lak - (total_buy_LAK + (total_buy_THB*700))
        return {
            product_saling,
            total_buy_LAK,
            total_buy_THB,
            total_sum_LAK,
            total_sum_THB,
            total_product_lak,
            total_all_bill_lak,
            kamlai
        };
    }
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    })
    return (
        <div>
            {loading && <MySpinner />}
            <div className='m-5 flex gap-3 items-center'>
                <span>ລາຍງານການຂາຍ ແຕ່ ເດືອນ/ວັນ/ປິ</span>
                <input
                    type='date'
                    className=' border rounded-lg p-2'
                    value={date_start.toString()}
                    onChange={e => set_date_start(e.target.value)}
                    max={date_end}
                />
                <span>ຫາ</span>
                <input
                    type='date'
                    className=' border rounded-lg p-2'
                    value={date_end.toString()}
                    onChange={e => set_date_end(e.target.value)}
                    min={date_start}
                />
                <Button onClick={handdleCalculate} color='primary'>ໄລ່ເງິນ</Button>
                <Button onClick={handlePrint} color='success'>ພິມລາຍງານ</Button>
            </div>
            <div className='w-[210mm] mx-auto mt-5 border shadow-lg'>
                {bills && bills?.length > 0 &&
                    <div className='w-[210mm] bg-white px-5 py-5' ref={printRef}>
                        <p className=' text-center text-xl'>ຂາຍຍ່ອຍ</p>
                        <p className=' text-center text-sm'>ລາຍງານການຂາຍ ປະຈຳ <span className='font-bold'>{displayLaoDateNoTime(dateS)}</span></p>
                        <p className=' text-center text-sm'>ເວລາສັ່ງພິມ {timePrint}</p>
                        <p className=' text-center text-sm'>$$$$$-$$$$$</p>
                        <div className=' mt-10'>
                            
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='border-black border'>ລ/ດ</th>
                                        <th className='border-black border'>ລະຫັດສິນຄ້າ</th>
                                        <th className='border-black border'>ຊື່ສິນຄ້າ</th>
                                        <th className='border-black border'>ຈຳນວນ</th>
                                        <th className='border-black border'>ຕົ້ນທຶນ(ກີບ)</th>
                                        <th className='border-black border'>ຕົ້ນທຶນ(ບາດ)</th>
                                        <th className='border-black border'>ຂາຍ(ກີບ)</th>
                                        <th className='border-black border'>ຂາຍ(ບາດ)</th>
                                        <th className='border-black border'>ຫຼຸດ</th>
                                        <th className='border-black border'>ລວມກີບ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {calculateBills().product_saling.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className=' border border-black text-center'>{index + 1}</td>
                                                <td className=' border border-black'>{product.product_id}</td>
                                                <td className=' border border-black'>{product.product_name}{" "}{product.product_size}</td>
                                                <td className=' border border-black text-end '>{product.product_qty}{" "}{product.product_unit.unit_name}</td>
                                                <td className=' border border-black text-end '>{product.product_price_buy_LAK > 0 ? (product.product_price_buy_LAK * product.product_qty).toLocaleString() : "-"}</td>
                                                <td className=' border border-black text-end '>{product.product_price_buy_THB > 0 ? (product.product_price_buy_THB * product.product_qty).toLocaleString() : "-"}</td>
                                                <td className=' border border-black text-end '>{product.product_price_sale2_LAK > 0 ? (product.product_price_sale2_LAK * product.product_qty).toLocaleString() : "-"}</td>
                                                <td className=' border border-black text-end '>{product.product_price_sale2_THB > 0 ? (product.product_price_sale2_THB * product.product_qty).toLocaleString() : "-"}</td>
                                                <td className=' border border-black text-center'>{product.product_discount}{"%"}</td>
                                                <td className=' border border-black text-end font-bold'>{product.product_total_lak.toLocaleString()}</td>

                                            </tr>
                                        )
                                    })
                                    }
                                    <tr>
                                        <td colSpan={4} className=' border border-black text-center py-3'>ລວມ</td>
                                        <td className=' border border-black text-end font-bold'>{calculateBills().total_buy_LAK.toLocaleString()}</td>
                                        <td className=' border border-black text-end font-bold'>{calculateBills().total_buy_THB.toLocaleString()}</td>
                                        <td className=' border border-black text-end font-bold'>{calculateBills().total_sum_LAK.toLocaleString()}</td>
                                        <td colSpan={3} className=' border border-black text-end font-bold'>{calculateBills().total_product_lak.toLocaleString()}</td>

                                    </tr>

                                </tbody>
                            </table>
                            <table className='mt-3'>
                                <tbody>
                                    <tr>
                                        <td className=' border-2 border-black text-end py-3 px-2'>ລວມຍອດຂາຍ</td>
                                        <td className=' border-2 border-black text-end py-3 px-2 font-bold'>{calculateBills().total_product_lak.toLocaleString()} {" ກີບ"}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className=' border-2 border-black text-center pt-2'>ລວມຕົ້ນທຶນ</td>
                                    </tr>
                                    <tr>
                                        <td className=' border-2 border-black text-center  py-3 px-2 font-bold'>
                                            {calculateBills().total_buy_LAK.toLocaleString()}{" LAK"}
                                        </td>
                                        <td className=' border-2 border-black text-center py-3 px-2 font-bold '>
                                            {calculateBills().total_buy_THB.toLocaleString()}{" THB"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className=' border-2 border-black text-center py-3 font-bold'>ລວມເງິນໄດ້ຮັບ</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className=' border-2 border-black text-center  py-3 px-2 font-bold text-xl'>
                                            {calculateBills().total_all_bill_lak.toLocaleString()}{" LAK"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className=' border-2 border-black text-center  py-3 px-2 font-bold text-xl'>
                                            {calculateBills().kamlai.toLocaleString()}{" LAK"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                {/* {bills &&
                    <>
                        <div className='w-[210mm] bg-white px-5 py-5' ref={printRef}>
                            <p className=' text-center text-xl font-bold'>ຂາຍຍ່ອຍ</p>
                            <p className=' text-center text-sm font-bold'>ລາຍງານການຂາຍ ປະຈຳ ເດືອນ/ວັນ/ປິ {displayLaoDateNoTime(dateS)} ຫາ  {displayLaoDateNoTime(dateE)}</p>
                            <p className=' text-center text-sm font-bold'>ເວລາສັ່ງພິມ {timePrint}</p>
                            <div className='mt-10'>
                                {bills.map((item, index) => {
                                    var bill_sum = 0;
                                    return (
                                        <div key={index} className=' mb-5'>
                                            {!item.user_cancelBill &&
                                                <table className='w-full text-sm'>
                                                    <tbody>
                                                        <tr>
                                                            <th className=' border'>ເລກທີບິນ</th>
                                                            <th className=' border'>ວັນທີຂາຍ</th>
                                                            <th className=' border'>ຜູ້ຂາຍ</th>
                                                            <th className=' border'>ລູກຄ້າ</th>
                                                            <th className=' border'>ເຫຼດ</th>
                                                            <th className=' border'>ຄະແນນລວມ</th>
                                                            <th className=' border'>ເງິນຮັບມາ</th>
                                                            <th className=' border'>ທອນ</th>
                                                        </tr>
                                                        <tr>
                                                            <td className=' border text-center'>{item.bill_id}</td>
                                                            <td className=' border text-start text-[12px]'>{displayLaoDate(item.bill_id)}</td>
                                                            <td className=' border text-start'>{item?.bill_user_id?.user_name}</td>
                                                            <td className=' border text-start'>{item?.bill_customer_id?.customer_name}</td>
                                                            <td className=' border text-center'>{item.bill_exchange_rate}</td>
                                                            <td className=' border text-center'>{item.bill_total_point}</td>
                                                            <td className=' border text-end'>{item.bill_money.toLocaleString()}</td>
                                                            <td className=' border text-end'>{item.bill_change.toLocaleString()}</td>

                                                        </tr>
                                                        <tr>
                                                            <th className=' border'>ລະຫັດສິນຄ້າ</th>
                                                            <th className=' border'>ຊື່ສິນຄ້າ</th>
                                                            <th className=' border'>ຕົ້ນທຶນກີບ</th>
                                                            <th className=' border'>ຕົ້ນທຶນບາດ</th>

                                                            <th className=' border'>ຈຳນວນ</th>
                                                            <th className=' border'>ລາຄາກີບ</th>
                                                            <th className=' border'>ລາຄາບາດ</th>
                                                            <th className=' border'>ສ່ວນຫຼຸດ</th>
                                                            <th className=' border'>ລວມ</th>

                                                        </tr>
                                                        {item.bill_item.map((product, key) => {
                                                            bill_sum += product.product_total_lak;
                                                            return (
                                                                <tr key={key}>
                                                                    <td className=' border'>{product.product_id}</td>
                                                                    <td className=' border'>{product.product_name}{" "}{product.product_size}</td>
                                                                    <td className=' border text-end'>{product.product_price_buy_LAK.toLocaleString()}</td>
                                                                    <td className=' border text-end'>{product.product_price_buy_THB.toLocaleString()}</td>
                                                                    <td className=' border text-center'>{product.product_qty}{" "}{product.product_unit.unit_name}</td>
                                                                    <td className=' border text-end'>{product.product_price_sale2_LAK.toLocaleString()}</td>
                                                                    <td className=' border text-end'>{product.product_price_sale2_THB.toLocaleString()}</td>
                                                                    <td className=' border text-center'>{product.product_discount}{"%"}</td>
                                                                    <td className=' border text-end'>{product.product_total_lak.toLocaleString()}</td>

                                                                </tr>
                                                            )
                                                        })}
                                                        <tr>
                                                            <th colSpan={8} className='text-end border'>ລວມ</th>
                                                            <td className=' border text-end'>{bill_sum.toLocaleString()}</td>
                                                        </tr>

                                                        <tr>
                                                            <th colSpan={8} className='text-end border'>ລວມເງິນໃບບິນ</th>
                                                            <td className=' border text-end'>{item.bill_total_lak.toLocaleString()}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>}
                                        </div>
                                    )
                                })}
                            </div>
                            <p className='text-start font-bold text-xl'>ສະຫຼຸບລາຍງານການຂາຍ</p>
                            <table>
                                <tr>
                                    <th className='border text-sm p-2'>ຈຳນວນໃບບິນທັງໝົດ</th>
                                    <td className='border text-sm p-2'>{bills.length}</td>
                                </tr>
                                <tr>
                                    <th className='border text-sm p-2'>ຈຳນວນໃບບິນຖືກຍົກເລີກ</th>
                                    <td className='border text-sm p-2'>{countCancelBill()}</td>
                                </tr>
                                <tr>
                                    <th className='border text-sm p-2'>ຕົ້ນທຶນກີບ</th>
                                    <td className='border text-sm p-2 text-end'>{calculaterBills().price_buy_LAK.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <th className='border text-sm p-2'>ຕົ້ນທຶນບາດ</th>
                                    <td className='border text-sm p-2 text-end'>{calculaterBills().price_buy_THB.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <th className='border text-sm p-2'>ເງິນໄດ້ຮັບໂຕຈິງ</th>
                                    <td className='border text-sm p-2 text-end'>{calculaterBills().total_sale_lak.toLocaleString()}</td>
                                </tr>
                            </table>
                        </div>
                    </>
                } */}
            </div>
        </div>
    )
}

export default ShowBills