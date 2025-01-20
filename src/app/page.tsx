
import { redirect } from "next/navigation";
import Login from "../components/Auth/Login"
import { getCookie } from "@/lib/cookie";
export default async function App() {
  const user = await getCookie("user")
  if (user) {
    const role = JSON.parse(user.value).user_role;
    if (role === "admin") {
      redirect("/admin"); ''
    }
    if (role === "user") {
      redirect("/retail");
    }
  }
  return (
    <Login />
  );
}
