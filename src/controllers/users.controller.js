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
            select:{
                user_id: true,
                user_email: true,
                user_name: true,
                user_password: true,
                roles:{
                    select:{
                        role_name: true
                    }
                }
            }
        })

        if(!logIn){
            res.status(404).json({message: 'Credenciales incorrectas'})
        } else{
            const token = jwt.sign({...logIn}, 'LabPwebPIA')
            res.status(200).json(token)
        }
        
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