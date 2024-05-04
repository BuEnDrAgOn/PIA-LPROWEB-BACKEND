import prisma from '../prisma.js'

export const create = async(req, res) =>{
    const {categoryName} = req.body
    try{
        const category = await prisma.categories.create({
             data: {
                 category: categoryName
             }
         })
         res.json(category)
    }
   catch(e){
    console.log(e)
   }
}
export const read = async(req, res) => {
    'hola'
}

export const readAll = async(req, res) => {
    try{
        const categories = await prisma.categories.findMany()
        res.json(categories)
    } catch(e){
        console.log(e)
    }
}

export const update = async(req, res) => {
    console.log('Hola')
}

export const deleteCategory = async(req, res) => {
    const category = await prisma.categories.delete({
        where: {
            category: 'Aventura'
        }
    })
    res.json(category)
}