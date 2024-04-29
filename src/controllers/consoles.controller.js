import prisma from '../prisma.js'

export const create = async(req, res) =>{
    let {consoleItem} = req.body
    try{
        const consoleName = await prisma.consoles.create({
            data: {
                console: consoleItem
            }
        })
        res.json(consoleName)
    } catch(e){
        console.log(e)
    }
}

export const read = async(req, res) => {
    try{
        const console = await prisma.consoles.findMany()
        res.json(console)
    } catch(e){
        console.log(e)
    }
}

export const update = async(req, res) => {
    console.log('Hola')
}

export const deleteConsoles = async(req, res) => {
    let {consoleItem} = req.body
    try{
        const console = await prisma.consoles.delete({
            where: {
                console: consoleItem
            }
        })
        res.json(console)
    } catch(e){
        console.log(e)
    }
}