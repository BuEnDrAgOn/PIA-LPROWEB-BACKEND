import prisma from '../prisma.js'

export const create = async(req, res) =>{
    let consoleItem = req.body.console
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
    const {consoleId} = req.params
    const consoleItem = req.body

    try{
        const consoleUpdated = await prisma.consoles.update({
            where:{
                console_id: +consoleId
            },
            data:{
                console: consoleItem.console
            }
        })
        res.json(consoleUpdated)
    } catch(e){
        console.log(e)
    }
}

export const deleteConsoles = async(req, res) => {
    let {consoleId} = req.params
    try{
        const console = await prisma.consoles.delete({
            where: {
                console_id: +consoleId
            }
        })
        res.json(console)
    } catch(e){
        console.log(e)
    }
}