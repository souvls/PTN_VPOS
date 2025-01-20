import { findOneUserByUserName } from "@/repo/UserRepo";

export async function Login(username: string, password: string) {
    const user = await findOneUserByUserName(username);
    if (user) {
        if (user.password !== password) {
            return 1
        }
        return user;
    } else {
        return 0
    }
}