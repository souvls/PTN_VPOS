
import FormProduct from '@/components/Product/FormProduct';
import { Button } from '@nextui-org/react'
import axios from 'axios';
import Link from 'next/link'
import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'



const page = async () => {
    return (
        <div>
            <div className=' flex justify-start items-center gap-2 shadow-lg'>
                <Link className='p-2' href={"/admin/front-manager/"}>
                    <Button radius="full">
                        <IoArrowBackSharp />
                    </Button>
                </Link>
                <p className=' text-xl font-medium'>ເພີ່ມສິນຄ້າ</p>
            </div>
            <FormProduct/>
        </div>
    )
}

export default page