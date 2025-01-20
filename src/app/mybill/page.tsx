import ShowMyBill from '@/components/Bill/ShowMyBill'
import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'

const page = () => {
    return (
        <div>
            <div className=' flex gap-2 items-center shadow-lg'>
                <Link className='p-2' href={"/retail"}>
                    <Button radius="full">
                        <IoArrowBackSharp />
                    </Button>
                </Link>
                <p className=' text-xl font-medium'>ລາຍການບິນ</p>
            </div>
            <ShowMyBill />
        </div>
    )
}

export default page