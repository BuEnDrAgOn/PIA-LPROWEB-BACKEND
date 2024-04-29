import prisma from '../prisma.js'

export const create = async(req, res) =>{
    const {gameName} = req.body
    const {consoleID} = req.body
    const {categoryID} = req.body
    try{
        const game = await prisma.games.create({
            data:{
                game_name: gameName,
                games_console:{
                    createMany:{
                        data:[{console_id: consoleID[0]}, {console_id: consoleID[1]}]
                    }
                },
                games_category:{
                    create:[{
                        category_id: 1
                    }]
                }
            }
            
        })
        res.json(game)
    } catch(e){
        console.log(e)
    }
}

export const read = async(req, res) => {
    const {consoleName, categoryName} = req.params
    try{
        const games = await prisma.games.findMany({
            where:{
                games_console:{
                    some:{
                        consoles:{
                            console: consoleName
                        }
                    }
                },
                games_category: {
                    some:{
                        categories:{
                            category: categoryName
                        }
                    }
                }
            },
            orderBy:{
                game_score: 'desc'
            }
        })
        res.json(games)
    } catch(e){
        console.log(e)
    }
}

export const readAll = async(req, res) => {
    try{
        const games = await prisma.games.findMany({
            select:{
                game_name: true,
                games_category:{
                    select:{
                        categories:{
                            select:{
                                category: true
                            }
                        }
                    }
                },
                games_console:{
                    select:{
                        consoles:{
                            select:{
                                console: true
                            }
                        }
                    }
                }
            }
        })
        res.json(games)
    } catch(e){
        console.log(e)
    }
}

export const update = async(req, res) => {
    console.log('Hola')
}

export const deleteGames = async(req, res) => {
    console.log('Hola')
}