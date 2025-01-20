"use client"
import React from 'react'
import { useState } from 'react';
const RealtimeClock = () => {
    const daysLao = [
        "ວັນອາທິດ",
        "ວັນຈັນ",
        "ວັນອັງຄານ",
        "ວັນພຸດ",
        "ວັນພະຫັດ",
        "ວັນ​ສຸກ",
        "ວັນເສົາ"
    ];
    const [currentTime, setCurrenTime] = useState("");
    const currentDate = new Date();
    const dayIndex = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const todayLao = daysLao[dayIndex];
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Adjust month index for Lao calendar (0-based vs. 1-based)
    const year = currentDate.getFullYear();
    const laoDate = `${todayLao},${day}/${month}/${year}`;
    setInterval(() => {
        const time = new Date().toLocaleTimeString();
        setCurrenTime(time);
    }, 1000);
    return (
        <div>
            <p className=" text-lg font-bold text-center">{currentTime}</p>
            <p>{laoDate}</p>
        </div>
    )
}


export default RealtimeClock