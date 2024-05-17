import prisma from '../prisma.js'
import jwt from 'jsonwebtoken'

export const create = async(req, res) =>{
    const newUser = req.body
    try{
        const user = await prisma.users.create({
            data:{
                user_name: newUser.user_name,
                user_email: newUser.user_email,
                user_password: newUser.user_password
            }
        })
        res.json(user)
    } catch(e){
        console.log(e)
    }
}

export const read = async(req, res) => {
    const user = req.body
    try{
        const logIn = await prisma.users.findUnique({
            where:{
                user_email: user.user_email,
                user_password: user.user_password
            },

            include:{
                roles:{
                    select:{
                        role_name: true
                    }
                }
            }
        })

        const token = jwt.sign({...logIn}, 'LabPwebPIA')
        res.json(token)
    }catch(e){
        console.log(e)
    }
}

export const update = async(req, res) => {
    console.log('Hola')
}

export const deleteUser = async(req, res) => {
    console.log('Hola')
}