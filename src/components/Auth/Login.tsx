"use client"

import { useState } from "react";
import * as React from "react";
import { Input, Button } from "@nextui-org/react";
import Full_spinner from '../Spinner/Full_spinner';
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import { setCookie } from "@/lib/cookie";
export default function Home() {
  const router = useRouter();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handdleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (!Username.trim() || !Password.trim()) {
      Swal.fire({
        title: "ຜິດພາດ",
        text: "ປ້ອນຂໍ້ມູນບໍ່ຄົບ",
        icon: "error"
      })
    } else {
      setLoading(true);
      try {
        const res = await axios.post("/api/login", { Username, Password })
        if (res.data.code === 0) {
          setLoading(false);
          Swal.fire({
            title: "ຜິດພາດ",
            text: res.data.message,
            icon: "error"
          })
        } else if (res.data.code === 1) {
          setLoading(false);
          Swal.fire({
            title: "ຜິດພາດ",
            text: res.data.message,
            icon: "error"
          })
        } else {
          setCookie("user", res.data.result);
          if (res.data.result.user_role == 'admin') {
            router.replace("/admin");
          } else {
            router.replace("/retail")
          }
        }



      } catch (error) {
        setLoading(false);
        if (error instanceof Error) {
          Swal.fire({
            title: "ຜິດພາດ",
            text: error.message,
            icon: "error"
          })
        } else {
          console.error('Unexpected error:', error);
        }

      }
    }
  }
  return (
    <div className=" relative w-full h-screen bg-gradient-to-r from-indigo-500 from-33% via-sky-500 via-33% to-emerald-500 to-33%">
      {loading && <Full_spinner />}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className=" w-[500px] bg-white border-2 rounded-lg p-5 shadow-lg">
          <h1 className=" text-2xl text-center font-bold">ລະບົບຈັດການຮ້ານ</h1>
          <div className="mt-10">
            <Input
              type="text"
              label="ຊື່ຜູ້ໃຊ້"
              className=""
              value={Username}
              onChange={e => setUsername(e.target.value)}
            />
            <Input
              type="password"
              label="ລະຫັດຜ່ານ"
              className="mt-3"
              value={Password}
              onChange={e => setPassword(e.target.value)}
            />
            <div>
              <Button onClick={handdleSubmit} className="w-full mt-5" color="primary">ເຂົ້າສູ່ລະບົບ</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



