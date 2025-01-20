import React from 'react'
import AdminMenu from '@/components/Admin/AdminMenu'
import { getCookie } from '@/lib/cookie';
import { redirect } from 'next/navigation';
const page = async () => {
  let user = null;
  const cookie = await getCookie("user")
  if (cookie) {
    user = await JSON.parse(cookie.value);
  } else {
    redirect("/")
  }
  return (
    <AdminMenu />
  )
}

export default page