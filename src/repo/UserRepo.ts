import User from "@/models/User";


export async function findOneUserById(id: string) {
    try {
        const user = await User.findById(id);
        if (!user) {
            return false;
        }
        return user;
    } catch (err) {
        console.log(err);
        throw err
    }
}
export async function findOneUserByUserName(username: string) {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return null;
        }
        return user;
    } catch (err) {
        console.log(err);
        throw err
    }
}