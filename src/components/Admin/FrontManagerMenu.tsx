import React from 'react'
import bg from '@/app/assets/bg-admin-menu.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { CiBoxList } from "react-icons/ci";
import { IoMdAddCircle } from "react-icons/io";
import { Button } from '@nextui-org/react';
import { IoArrowBackSharp } from 'react-icons/io5';
const FrontManagerMenu = () => {
    return (
        <div className='relative  w-screen h-screen overflow-hidden'>
            <Image alt="bg" className='blur-sm' src={bg} />
            <div className=' absolute top-2 left-2'>
                <Link href={"/admin"}>
                    <Button radius="full">
                        <IoArrowBackSharp />
                    </Button>
                </Link>
            </div>

            <div className='w-full absolute top-28'>
                <div className='mt-5 w-full flex justify-center items-center gap-5'>
                    <Link href={"/admin/front-manager/unit-manager"} className='w-60 bg-white rounded-xl p-2 hover:bg-sky-500 ease-out duration-200 hover:text-white'>
                        <p className=' text-center text-xl'>ໜ່ວຍເອີ້ນສິນຄ້າ</p>
                    </Link>
                    <Link href={"/admin/front-manager/category-manager"} className='w-60 bg-white rounded-xl p-2 hover:bg-sky-500 ease-out duration-200 hover:text-white'>
                        <p className=' text-center text-xl'>ປະເພດສິນຄ້າ</p>
                    </Link>
                </div>
                <div className='mt-5 w-full flex justify-center items-center gap-5'>
                    <Link href={"/admin/front-manager/list-product"} className='w-60 bg-white rounded-xl p-2 hover:bg-sky-500 ease-out duration-200 hover:text-white'>
                        <div className=' w-full flex justify-center items-center'>
                            <CiBoxList size={50} />
                        </div>
                        <p className=' text-center text-xl'>ລາຍການສິນຄ້າ</p>
                    </Link>
                    <Link href={"/admin/front-manager/add-product"} className='w-60 bg-white rounded-xl p-2 hover:bg-sky-500 ease-out duration-200 hover:text-white'>
                        <div className=' w-full flex justify-center items-center'>
                            <IoMdAddCircle size={50} />
                        </div>
                        <p className=' text-center text-xl'>ເພີ່ມສິນຄ້າໃໝ່</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FrontManagerMenu