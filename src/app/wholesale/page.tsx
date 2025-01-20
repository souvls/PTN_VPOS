import React from 'react'
import { getCookie } from '@/lib/cookie'
import { redirect } from 'next/navigation'
import { CartProvider } from '@/contexts/CartWholesaleContext';
import NavbarWholesale from '@/components/Navbar/NavbarWholesale'
import Wholesale_page from './Wholesale_page'
const page = async () => {
  let user = null;
  const cookie = await getCookie("user")
  if (cookie) {
    user = JSON.parse(cookie.value);
  } else {
    redirect("/")
  }
  return (
    <CartProvider>
      <NavbarWholesale id={user._id} user_name={user.user_name} username={user.username} user_role={user.user_role} />
      <Wholesale_page />
    </CartProvider>
  )
}

export default page