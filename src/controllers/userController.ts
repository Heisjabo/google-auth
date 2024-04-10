import { getAllUsers, createUser, getUserByEmail, updateUser, findUserByPk } from "../services/userService";
import { Request,Response } from "express";
import uploadFile from "../middlewares/cloudinary";

export const getUsers = async(req:Request,res:Response) =>{
 try {
    const users = await getAllUsers();
    res.status(200).json({
        status:200,
        data:users
    })
 } catch (error:any) {
    res.status(500).json({
        status:500,
        message:`Error ${error}`
    })
 }
}

export const registerUser = async (req:Request, res:Response) => {
    const file: any = req.file 
    try{
        const { email, name } = req.body
        const userExist = await getUserByEmail(email);
        if(userExist){
            return res.status(409).json({
                message: "User already exists!"
            })
        }
        const result: any = await uploadFile(file)
        const user = await createUser({
            name: name, email: email, profileImage: result
        })
        return res.status(201).json({
            message: 'your account was created successfully!'
        })
    } catch(err: any){
        return res.status(500).json({
            message: `Error ${err}`
        })
    }
}

export const getUserById = async (req:Request, res:Response) => {
    try{
        const id = Number(req.params.id)
        const user = await findUserByPk(id);
        return res.status(200).json(user);
    } catch(err: any){
        return res.status(500).json({
            message: `Error ${err.message}`
        })
    }
}

export const updateUserById = async (req:Request, res:Response) => {
    try{
        const {name, email} = req.body
        const { file } = req
        const id = Number(req.params.id)
        if(email){
            return res.status(403).json({
                message: "Updating email is not allowed"
            })
        }
        if(!name && !file){
            return res.status(400).json({
                message: "Please add a field to update"
            })
        }
        let updateInfo = {}
        if(name){
            updateInfo = {...updateInfo, name }
        }
        if(file){
            const result: any = await uploadFile(file)
            updateInfo = {...updateInfo, profileImage: result}
        }

        const updatedUser = await updateUser(id, updateInfo)

        return res.status(200).json({
            message: "your account was updated successfully!"
        })
        
    } catch(err: any){
        return res.status(500).json({
            message: `Error ${err}`
        })
    }
}