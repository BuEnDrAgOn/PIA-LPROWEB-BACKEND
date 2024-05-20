import prisma from '../prisma.js'

// Create
export const create = async(req, res) =>{
    const newGame = req.body
    newGame.games_console.forEach(console => {
        delete console.game_id
    })
    newGame.games_category.forEach(category => {
        delete category.game_id
    })

    try{
        const game = await prisma.games.create({
            data:{
                game_name: newGame.game_name,
                games_console:{
                    create:
                        newGame.games_console
                
                },
                games_category:{
                    create:
                        newGame.games_category
                    
                },
                games_info:{
                    create:{
                        game_fpage: newGame.games_info.game_fpage
                    }
                }
            }
            
        })
        res.json(game)
    } catch(e){
        console.log(e)
    }
}

export const createGameInfo = async(req, res) => {
    const {gameID} = req.params
    const {sinopsys, general, specific} = req.body
    try{
        const gameInfo = await prisma.games_info.create({
            data:{
                game_id: parseInt(gameID),
                game_sinopsis: sinopsys,
                game_features_general: general,
                game_features_specific: specific,
            }
        })
        res.json(gameInfo)
    } catch(e){
        console.log(e)
    }
}

// Read
export const read = async(req, res) => {
    const {gameName} = req.params
    try {
        const game = await prisma.games.findUnique({
            where: {
                game_name: gameName
            },
            select:{
                game_name: true,
                game_id: true,
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
            include:{
                games_console: true,
                games_category: true,
                games_info: true
            },
            orderBy:{
                game_name: 'desc'
            }
        })
        res.json(games)
    } catch(e){
        console.log(e)
    }
}

// Update

// Controlador para actualizar un juego
export async function updateGame(req, res) {
    const gameId = req.params.gameId;
    const updatedGame = req.body;

    try {
        // Actualizar el juego en la tabla games
        await prisma.games.update({
            where: { game_id: +gameId },
            data: {
                game_name: updatedGame.game_name,
                game_banner: updatedGame.game_banner,
                games_info:{
                    update:{
                        game_fpage: updatedGame.games_info.game_fpage
                    }
                }
            }
        });

        // Obtener las consolas actuales asociadas con el juego
        const currentConsoles = await prisma.games_console.findMany({
            where: { game_id: +gameId }
        });

        // Comparar las consolas actualizadas con las actuales
        const consolesToAdd = updatedGame.games_console.filter(console => !currentConsoles.some(c => c.console_id === console.console_id));
        const consolesToRemove = currentConsoles.filter(console => !updatedGame.games_console.some(c => c.console_id === console.console_id));

        // Agregar consolas nuevas a la tabla games_console
        await prisma.games_console.createMany({
            data: consolesToAdd.map(console => ({
                game_id: +gameId,
                console_id: console.console_id
            }))
        });

        // Eliminar consolas que ya no están asociadas con el juego
        await prisma.games_console.deleteMany({
            where: {
                game_id: +gameId,
                console_id: {
                    in: consolesToRemove.map(console => console.console_id)
                }
            }
        });

        // Categorías

        const currentCategories = await prisma.games_category.findMany({
            where: { game_id: +gameId}
        });

        const categoriesToAdd = updatedGame.games_category.filter(category => !currentCategories.some(c => c.category_id === category.category_id))
        const categoriesToRemove = currentCategories.filter(category => !updatedGame.games_category.some(c => c.category_id === category.category_id))

        await prisma.games_category.createMany({
            data: categoriesToAdd.map(category => ({
                game_id: +gameId,
                category_id: category.category_id
            }))
        })

        await prisma.games_category.deleteMany({
            where:{
                game_id: +gameId,
                category_id: {
                    in: categoriesToRemove.map(category => category.category_id)
                }
            }
        })

        res.status(200).json({ message: "Juego actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el juego:", error);
        res.status(500).json({ message: "Error al actualizar el juego" });
    }
}

export const createOrUpdateGameInfo = async (req, res) => {
    const {gameId} = req.params
    const info = req.body

    try{
        const existingRecord = await prisma.games_info.findUnique({
            where:{
                game_id: +gameId
            }
        })

        if(existingRecord){
            await prisma.games_info.update({
                where:{
                    game_id: +gameId
                },
                data:{
                    game_sinopsis: info.game_sinopsis,
                    game_features_general: info.game_features_general,
                    game_features_specific: info.game_features_specific
                }
            })
        } else{
            await prisma.games_info.create({
                data:{
                    game_id: +gameId,
                    game_sinopsis: info.game_sinopsis,
                    game_features_general: info.game_features_general,
                    game_features_specific: info.game_features_specific
                }
            })
        }

        res.json('Se ha actualizado satisfactoriamente')
    } catch(e) {
        console.log(e)
    }
}


// Delete
export const deleteGames = async(req, res) => {
    const {gameId} = req.params
    try{
        const game = await prisma.games.delete({
            where:{
                game_id: +gameId
            }
        })
        res.json(game)
    } catch(e){
        console.log(e)
    }
}
