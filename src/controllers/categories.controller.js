import prisma from '../prisma.js'

export const create = async(req, res) =>{
    const categoryName = req.body.category
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

export const readAll = async(req, res) => {
    try{
        const categories = await prisma.categories.findMany()
        res.json(categories)
    } catch(e){
        console.log(e)
    }
}

export const update = async(req, res) => {
    const {categoryId} = req.params
    const categoryItem = req.body

    try{
        const categoryUpdated = await prisma.categories.update({
            where:{
                category_id: +categoryId
            },
            data:{
                category: categoryItem.category
            }
        })
        res.json(categoryUpdated)
    } catch(e){
        console.log(e)
    }
}

export const deleteCategory = async(req, res) => {
    let {categoryId} = req.params
    try{
        const category = await prisma.categories.delete({
            where: {
                category_id: +categoryId
            }
        })
        res.json(category)
    } catch(e){
        console.log(e)
    }
}