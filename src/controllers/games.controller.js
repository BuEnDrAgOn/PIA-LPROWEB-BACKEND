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
                        data:[{console_id: consoleID[0]}]
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
    const {gameName} = req.params
    try {
        const game = await prisma.games.findUnique({
            where: {
                game_name: gameName
            },
            select:{
                game_name: true,
                game_score: true,
                games_console:{
                    select:{
                        consoles:{
                            select:{
                                console: true
                            }
                        }
                    }
                },
                games_category:{
                    select:{
                        categories:{
                            select:{
                                category: true
                            }
                        }
                    }
                },
                games_info:{
                    select:{
                        game_features_general: true,
                        game_features_specific: true,
                        game_sinopsis: true,
                        game_fpage: true
                    }
                }
            }
        })
        res.json(game)
    } catch(e) {
        console.log(e)
    }
}

export const readGameList = async(req, res) => {
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
    try{
        const game = await prisma.games.delete({
            where:{
                game_name: 'Halo 5'
            }
        })
        res.json(game)
    } catch(e){
        console.log(e)
    }
}