import Report_product from '@/components/Product/Report_product'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'

const page = () => {
    return (
        <div>
            <div className=' flex justify-start items-center gap-2 shadow-lg'>
                <Link className='p-2' href={"/admin"}>
                    <Button radius="full">
                        <IoArrowBackSharp />
                    </Button>
                </Link>
                <p className=' text-xl font-medium'>ລາຍງານສິນຄ້າ</p>
            </div>
            <Report_product/>
        </div>
    )
}

export default page