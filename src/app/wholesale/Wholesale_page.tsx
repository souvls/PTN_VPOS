import React from 'react'
import RealtimeClock from '@/components/Clock/RealtimeClock'
import Exchang from '@/components/Exchange/ExchangeRateWholesale'
import ScanProduct from '@/components/Wholesale/SacanProduct'
import ShowCart from '@/components/Wholesale/ShowCart'
import Sale from '@/components/Wholesale/Sale'



const Wholesale_page = () => {
  return (
    <div className=''>
      <div className='p-5 flex justify-between gap-5'>
        <div className='w-[60%]'>
          <div className='px-2 py-5 h-[800px] bg-white rounded-xl shadow-lg border-2'>
            <ShowCart />
          </div>
        </div>
        <div className=' w-[40%]'>
          <div className='px-2 py-5 h-[800px] bg-white rounded-xl shadow-lg border-2'>
            <div className=' flex justify-between items-center'>
              <RealtimeClock />
              <Exchang />
            </div>
            <ScanProduct />
          </div>
        </div>
      </div>
      <div className=' fixed bottom-0 right-0'>
        <Sale />
      </div>
    </div>
    // <div>
    //   fdgdfgfdgdfgfg
    //   <ScanProduct/>
    // </div>
  )
}

export default Wholesale_page