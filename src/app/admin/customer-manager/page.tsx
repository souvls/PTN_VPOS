import React from 'react'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { IoArrowBackSharp } from 'react-icons/io5'
import FormCustomer from '@/components/Customer/FormCustomer'
import ListCustomer from '@/components/Customer/ListCustomer'
const page = () => {
    return (
        <div>
            <div className=' flex justify-start items-center gap-2 shadow-lg'>
                <Link className='p-2' href={"/admin"}>
                    <Button radius="full">
                        <IoArrowBackSharp />
                    </Button>
                </Link>
                <p className=' text-xl font-medium'>ຈັດການສະມາຊິກ</p>
            </div>
            <div>
                <FormCustomer />
            </div>
            <div>
                <ListCustomer/>
            </div>

        </div>
    )
}

export default page