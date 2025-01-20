"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { IoArrowBackSharp } from "react-icons/io5";
import { Button, Input } from '@nextui-org/react';
import axios from 'axios';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';

const Category = (props: { _id: string, category_name: string }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [category, set_category] = useState({ _id: props._id, category_name: props.category_name })

    const handleEdit = async () => {
        try {
            const res = await axios.put("/api/category", { id: category._id, category_name: category.category_name });
            window.location.reload();
        } catch {
            window.location.reload();
        }
    }
    const handleDelete = async () => {
        try {
            await axios.delete("/api/category?id=" + category._id)
            window.location.reload();
        } catch {
            Swal.fire({
                text: "ມີສິນຄ້າປະເພດນີ້ໃນລະບົບ",
                title: "ລົບບໍ່ໄດ້",
                icon: "error"
            })
        }
    }
    return (
        <div className='mb-3 flex gap-3'>
            <Button
                color='primary'
                onClick={() => setIsEdit(!isEdit)}
            >
                <MdEdit />
            </Button>
            <Input
                type='text'
                value={category.category_name}
                onChange={(e) => set_category({ ...category, category_name: e.target.value })}
                isDisabled={!isEdit}
            />
            <Button
                color='success'
                isDisabled={!isEdit}
                onClick={handleEdit}
            >
                ບັນທຶກ
            </Button>
            <Button
                color='danger'
                isDisabled={!isEdit}
                onClick={handleDelete}
            >
                <MdDelete />
            </Button>
        </div>
    )
}

const page = () => {
    const [categorys, setCategory] = useState([{ _id: "", category_name: "" }]);
    const [category_name, set_category_name] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        fetchdata();
    }, []);
    const fetchdata = async () => {
        const res = await axios.get("/api/category");
        setCategory(res.data.result)
    }
    const handleAddCategory = async () => {
        if (category_name) {
            try {
                setIsLoading(true);
                const res = await axios.post("/api/category", { category_name: category_name });
                setIsLoading(false);
                Swal.fire({
                    text: "ສຳເລັດ",
                    icon: "success"
                }).then(() => {
                    window.location.reload();
                })

            } catch {
                setIsLoading(false);
                Swal.fire({
                    icon: "error"
                })
            }
        }
    }
    return (
        <div>
            <div className=' flex gap-2 items-center shadow-lg'>
                <Link className='p-2' href={"/admin/front-manager/menu"}>
                    <Button radius="full">
                        <IoArrowBackSharp />
                    </Button>
                </Link>
                <p className=' text-xl font-medium'>ປະເພດສິນຄ້າ</p>
            </div>
            <div className=' w-[500px] mx-auto mt-5'>
                <div className=' bg-white shadow-lg rounded-lg p-5'>
                    <p>ເພີ່ມໃໝ່</p>
                    <div className=' flex gap-3'>
                        <Input
                            type='text'
                            placeholder=''
                            value={category_name}
                            onChange={e => set_category_name(e.target.value)}
                        />
                        <Button onClick={handleAddCategory} color='primary'>+</Button>
                    </div>
                </div>
                <div className=' bg-white shadow-lg rounded-lg p-5 mt-5 border-t-2'>
                    {categorys.slice().reverse().map((item, index) => {
                        return (
                            <Category key={index} {...item} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default page