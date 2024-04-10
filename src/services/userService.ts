import User from "../db/models/users";
import { UserAttributes } from "../db/models/users";

export const getAllUsers = async() =>{
try {
    const users = await User.findAll();
    return users;
} catch (error:any) {
    throw new Error(error.message)
}
}

export const createUser = async (userInfo: UserAttributes) => {
        const user: UserAttributes = await User.create({
            name: userInfo.name,
            email: userInfo.email,
            profileImage: userInfo.profileImage
        })
        return user
}

export const findUserByPk = async (id: number) => {
    const user = await User.findByPk(id)
    return user
}

export const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ where: { email: email } })
    return user
}

export const updateUser = async (userId: number, updatedUserInfo: Partial<UserAttributes>) => {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }
        await user.update(updatedUserInfo, { where: { id: userId }});
        return user;
};
