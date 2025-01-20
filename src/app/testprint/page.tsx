"use client"
import React, { useRef } from 'react'
import Image from 'next/image'
import { useReactToPrint } from 'react-to-print';
import qr1 from "@/app/assets/myqr1.jpg"
import logo1 from "@/app/assets/logo.svg"
import { Button } from '@nextui-org/react';
const page = () => {
    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });
    return (
        <div className=' w-[960px] mx-auto mt-5'>
            <div ref={printRef} className=' w-[210mm] px-5 py-5' >
                <div className='w-full flex justify-between pb-3 border-b-2'>
                    <div>
                        <Image src={logo1} alt='' width={100} />
                    </div>
                    <div className=' mt-7'>
                        <p className=' text-[20px] font-bold text-center'>ຮ້ານຂາຍເຄື່ອງສຳອາງ</p>
                        <p className=' text-[20px] font-bold text-center'>ພັດທະນາ (ແຫຼ້) ສາລະວັນ</p>
                        <p className=' text-[18px] font-bold text-center'>ບ. ຫຼັກສອງ, ມ.ສາລະວັນ, ຂ.ສາລະວັນ</p>
                        <p className=' text-[18px] font-bold text-center'>ໂທ 22078999</p>
                    </div>
                    <div>
                        <Image src={qr1} alt='' width={100} />
                    </div>
                </div>
                <div className=' w-full'>
                    <p className='text-[20px] text-center font-bold py-3'>ໃບບິນຂາຍສົ່ງ</p>
                </div>
                <div className='w-full flex justify-between'>
                    <div>
                        <p className=' text-sm'>ວັນເສົາ,14/09/2024 11:00</p>
                        <p className=' text-sm'>ອັດຕາແລກປ່ຽນ: 720</p>
                        <p className=' text-sm'>ພະນັກງານຂາຍ: ນ.ຄຳ</p>
                    </div>
                    <div>
                        <p className=' text-sm font-bold'>ຂໍ້ມູນລູກຄ້າ</p>
                        <p className=' text-sm'>ລະຫັດ: PTN001</p>
                        <p className=' text-sm'>ຊື່: soulixai</p>
                        <p className=' text-sm'>ເບີໂທ: 020 56388013</p>
                        <p className=' text-sm'>ທີ່ຢູ່:ບ. ຫຼັກສອງ, ມ.ສາລະວັນ, ຂ.ສາລະວັນ</p>
                    </div>
                </div>
                <div className=' w-full mt-3'>
                    <table className='w-full text-sm'>
                        <thead>
                            <tr>
                                <th className='border py-2'>ລຳດັບ</th>
                                <th className='border'>ລະຫັດສິນຄ້າ</th>
                                <th className='border'>ຊື່ສິນຄ້າ</th>
                                <th className='border'>ລາຄາ LAK</th>
                                <th className='border'>ລາຄາ THB</th>
                                <th className='border'>ຈຳນວນ</th>
                                <th className='border'>ລວມ LAK</th>
                                <th className='border'>ລວມ THB</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='border text-center'>1</td>
                                <td className='border'>8850273229101</td>
                                <td className='border'>ເດລີເຟສ ສະເປ ສົ້ມ 300ມລ</td>
                                <td className='border text-end'>0</td>
                                <td className='border text-end'>65</td>
                                <td className='border text-center'>1 ຂວດ</td>
                                <td className='border text-end'>0</td>
                                <td className='border text-end'>65</td>
                            </tr>
                            {Array.from({ length: 50 }).map((_, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='border text-center'>{index+2}</td>
                                        <td className='border'>8850273229101</td>
                                        <td className='border'>ເດລີເຟສ ສະເປ ສົ້ມ 300ມລ</td>
                                        <td className='border text-end'>48,000</td>
                                        <td className='border text-end'>0</td>
                                        <td className='border text-center'>12 ຂວດ</td>
                                        <td className='border text-end'>576,000</td>
                                        <td className='border text-end'>0</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan={6} className='border text-end text-xl font-bold' >
                                    ລວມ
                                </td>
                                <td className='border text-end text-xl font-bold' >
                                    1,000,789.00
                                </td>
                                <td className='border text-end text-xl font-bold' >
                                    1,000.00
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className=' flex justify-around mt-10'>
                    <p className=' font-bold'>ຜູ້ຮັບເງິນ</p>
                    <p className=' font-bold'>ຜູ້ຈ່່າຍເງິນ</p>
                </div>
                <div className=' m-20'>
                    <p className=' text-center italic'>ຂອບໃຈລູກຄ້າທີ່ອຸດໜູນ</p>
                </div>
            </div>
            <Button onClick={handlePrint}> Print</Button>
        </div>

    )
}

export default page