// import React from 'react'
// import { getCookie } from '@/lib/cookie'
// import { redirect } from 'next/navigation'

// import { CartProvider } from '@/contexts/CartRetailContext';

// import NavbarRetaile from '@/components/Navbar/NavbarRetaile'
// import Retail_page from './Retail_page'
// const page = async () => {
//   let user = null;
//   const cookie = await getCookie("user")
//   if (cookie) {
//     user = await JSON.parse(cookie.value);
//   } else {
//     redirect("/")
//   }
//   return (
//     <CartProvider>
//       <NavbarRetaile id={user._id} user_name={user.user_name} username={user.username} user_role={user.user_role} />
//       <Retail_page />
//     </CartProvider>
//   )
// }

// export default page