"use client"
import React, { useRef } from 'react'
import Exchang from '@/components/Exchange/ExchangeRateRetail'
import RealtimeClock from '@/components/Clock/RealtimeClock'
import ScanProduct from '@/components/Retail/ScanProduct'
import ShowCart from '@/components/Retail/ShowCart'
import Sale from '@/components/Retail/Sale'
const Retail_page = () => {
    const scanProductRef = useRef<any>(null);
    const focusScanInput = () => {
        if (scanProductRef.current) {
            scanProductRef.current.focusInput();
        }
    };
    return (
        <>
            <div className='p-5 flex justify-between gap-5'>
                <div className='w-[38%] flex flex-col gap-5'>
                    <div className=' flex justify-between items-center p-3 bg-white border rounded-lg shadow-lg'>
                        <RealtimeClock />
                        <Exchang />
                    </div>
                    <div className='h-[690px] px-3 py-5 bg-white border rounded-lg shadow-lg'>
                        <ScanProduct ref={scanProductRef} />
                    </div>
                </div>
                <div className=' w-[62%]'>
                    <ShowCart />
                </div>
            </div>
            <div className=' fixed bottom-0 right-0'>
                <Sale focusScanInput={focusScanInput} />
            </div>
        </>

    )
}

export default Retail_page