import React from 'react'
import bg from '@/app/assets/bg-admin-menu.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { FaChartLine } from 'react-icons/fa6'
import { IoStorefrontSharp } from 'react-icons/io5'
import { IoIosPeople } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { GrMoney } from "react-icons/gr";
import { FcMoneyTransfer } from "react-icons/fc";
import { AiFillProduct } from "react-icons/ai";
import { HiDocumentReport } from "react-icons/hi";
const AdminMenu = () => {
    return (
        <div className='relative  w-screen h-screen overflow-hidden'>
            <Image alt="bg" className='blur-sm' src={bg} />
            <div className='w-full absolute top-28'>
                <div className='mt-5 w-full flex justify-center items-center gap-5'>
                    <Link href={"/admin/report_product"} className='w-60 bg-white rounded-xl p-2 hover:bg-sky-500 ease-out duration-200 hover:text-white'>
                        <div className=' w-full flex justify-center items-center'>
                            <HiDocumentReport size={50} />
                        </div>
                        <p className=' text-center text-xl'>ລາຍງານສິນຄ້າ</p>
                    </Link>
                    <Link href={"/admin/report_sale"} className='w-60 bg-white rounded-xl p-2 hover:bg-sky-500 ease-out duration-200 hover:text-white'>
                        <div className=' w-full flex justify-center items-center'>
                            <CiViewList size={50} />
                        </div>
                        <p className=' text-center text-xl'>ລາຍງານການຂາຍ</p>
                    </Link>
                </div>
                <div className='mt-5 w-full flex justify-center items-center gap-5  pt-10'>
                    <Link href={"/retail"} className='w-60 bg-white rounded-xl p-2 hover:bg-sky-500 ease-out duration-200 hover:text-white'>
                        <div className=' w-full flex justify-center items-center'>
                            <GrMoney size={50} />
                        </div>
                        <p className=' text-center text-xl'>ຂາຍຍ່ອຍ</p>
                    </Link>
                    {/* href={"/wholesale"} */}
                    {/* <Link href={"#"} className='w-60 bg-white rounded-xl p-2 hover:bg-sky-500 ease-out duration-200 hover:text-white'>
                        <div className=' w-full flex justify-center items-center'>
                            <FcMoneyTransfer size={50} />
                        </div>
                        <p className=' text-center text-xl'>ຂາຍສົ່ງ</p>
                    </Link> */}


                </div>
                <div className='mt-5 w-full flex justify-center items-center gap-5 pt-10'>
                    <Link href={"/admin/front-manager/menu"} className='w-60 bg-white rounded-xl p-2 hover:bg-sky-500 ease-out duration-200 hover:text-white'>
                        <div className=' w-full flex justify-center items-center'>
                            <IoStorefrontSharp size={50} />
                        </div>
                        <p className=' text-center text-xl'>ຈັດການສິນຄ້າໜ້າຮ້ານ</p>
                    </Link>
                    {/* <Link href={"/#"} className=' w-60 bg-white rounded-xl p-2 hover:bg-sky-500 ease-out duration-200 hover:text-white'>
                        <div className=' w-full flex justify-center items-center'>
                            <AiFillProduct size={50} />
                        </div>
                        <p className=' text-center text-xl'>ຈັດການສາງ</p>
                    </Link> */}
                    <Link href={"/admin/customer-manager"} className='w-60 bg-white rounded-xl p-2 hover:bg-sky-500 ease-out duration-200 hover:text-white'>
                        <div className=' w-full flex justify-center items-center'>
                            <IoIosPeople size={50} />
                        </div>
                        <p className=' text-center text-xl'>ຈັດການສະມາຊິກ</p>
                    </Link>

                </div>
            </div>


        </div>
    )
}

export default AdminMenu