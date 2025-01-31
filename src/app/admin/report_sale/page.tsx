;
import { Button } from '@nextui-org/react'
import axios from 'axios';
import Link from 'next/link'
import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'

const page = async () => {
    return (
        <div>
            <div className=' flex justify-start items-center gap-2 shadow-lg'>
                <Link className='p-2' href={"/admin"}>
                    <Button radius="full">
                        <IoArrowBackSharp />
                    </Button>
                </Link>
                <p className=' text-xl font-medium'>ລາຍງານການຂາຍ</p>
            </div>
            <div className=' p-5'>
                ຂາຍຍ່ອຍ
                <table className=' table-auto table-cell'>
                    <tbody>
                        <tr>
                            <th className=' p-2 border-2 border-black'>ລວມກີບ</th>
                            <td className=' p-2 border-2 border-black'>0</td>
                        </tr>
                        <tr>
                            <th className=' p-2 border-2 border-black'>ລວມບາດ</th>
                            <td className=' p-2 border-2 border-black'>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className=' p-5'>
                ຂາຍສົ່ງ
                <table className=' table-auto table-cell'>
                    <tbody>
                        <tr>
                            <th className=' p-2 border-2 border-black'>ລວມກີບ</th>
                            <td className=' p-2 border-2 border-black'>0</td>
                        </tr>
                        <tr>
                            <th className=' p-2 border-2 border-black'>ລວມບາດ</th>
                            <td className=' p-2 border-2 border-black'>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page