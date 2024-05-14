import prisma from '../prisma.js'

export const create = async(req, res) =>{
    const newUser = req.body
    try{
        const user = prisma.users.create({
            data:{
                newUser
            }
        })
        res.json(user)
    } catch(e){
        console.log(e)
    }
}

export const read = async(req, res) => {
    console.log('Hola')
}

export const update = async(req, res) => {
    console.log('Hola')
}

export const deleteUser = async(req, res) => {
    console.log('Hola')
}