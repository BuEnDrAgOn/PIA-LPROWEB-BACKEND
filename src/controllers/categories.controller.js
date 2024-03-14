import client from '../client.js'

export const create = async(req, res) =>{
   const category = await client.categories.create({
        data: {
            category: 'Aventura'
        }
    })
    res.json(category)
}

export const read = async(req, res) => {
    console.log('Hola')
}

export const update = async(req, res) => {
    console.log('Hola')
}

export const deleteCategory = async(req, res) => {
    const category = await client.categories.delete({
        where: {
            category: 'Aventura'
        }
    })
    res.json(category)
}