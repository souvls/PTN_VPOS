"use client"
import React from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button } from '@nextui-org/react'
import { CiSettings } from "react-icons/ci";
import Link from 'next/link';
import { deleteCookie } from '@/lib/cookie';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface UserProps {
    id?: string,
    username?: string,
    user_name?: string,
    user_role?: string
}
const NavbarWholesale: React.FC<UserProps> = ({ id, username, user_name, user_role }) => {
    const router = useRouter();
    const handleLogout = () => {
        Swal.fire({
            title: "ອອກຈາກລະບົບ",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ອອກຈາກລະບົບ",
            cancelButtonText: "ຍົກເລີກ"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCookie('user');
                router.replace("/")
            }
        });
    }
    return (
        <div>
            <div className='w-full bg-red-700  py-3'>
                <div className=' flex justify-between items-center'>
                    <div className=" flex items-center justify-start">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    color="primary"
                                    variant={"light"}
                                    className="capitalize"
                                >
                                    {<CiSettings color={"#fff"} size={25} />}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Dropdown Variants"
                                //color={"Default"}
                                variant={"light"}
                            >
                                <DropdownItem>
                                    {user_role === "admin" && <Link href={"/admin"}>admin</Link>}
                                </DropdownItem>
                                <DropdownItem >
                                    <Link href={"/mybill"}>ຈັດການໃບບິນ</Link>
                                </DropdownItem>
                                <DropdownItem onClick={handleLogout} key="delete" className="text-danger" color="danger">
                                    ອອກຈາກລະບົບ
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <div className=' text-white text-sm flex gap-2'>
                            <p>{id},</p>
                            <p>{username},</p>
                            <p>{user_name},</p>
                            <p>ຂາຍຍ່ອຍ</p>
                        </div>
                    </div>
                    <div className='me-10'>
                        <Link href={"/wholesale"} target='bank' className=' bg-white p-2 rounded-lg'>ເປີດໜ້າໃໝ່</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarWholesale