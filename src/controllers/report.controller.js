import prisma from "../prisma.js"

export const userCount = async (req, res) =>{
    try{
        const countNewUsers = await prisma.users.count({
            where: {
                AND: [
                    {
                        created_at: {
                            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Primer día del mes actual
                        },
                    },
                    {
                        created_at: {
                            lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1), // Primer día del mes siguiente
                        },
                    },
                ],
            },
        });

        const countUsers = await prisma.users.count()

        const users ={
            newUsers: countNewUsers,
            totalUsers: countUsers
        }
        res.json(users)
    }catch (e){
        res.json(e)
        console.log(e)
    }
}

export const userActivity = async (req, res) => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    try{
        const usersCountMonthly = await prisma.users.count({
            where: {
              user_score: {
                some: {
                  updated_at: {
                    gte: firstDayOfMonth,
                    lte: lastDayOfMonth
                  }
                }
              }
            }
        })
        
        const usersCountTotal = await prisma.users.count({
            where: {
                user_score: {
                    some:{}
                }
            }
        })

        const user = {
            activityMonth: usersCountMonthly,
            activityTotal: usersCountTotal
        }

        res.json(user)
    }catch(e){
        console.log(e)
        res.json(e)
    }
}

export const bestGame = async (req, res) =>{
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    try{

        const gamesWithAverageScore = await prisma.user_score.groupBy({
          by: ['game_id'],
          where: {
            updated_at: {
              gte: firstDayOfMonth,
              lte: lastDayOfMonth
            }
          },
          _avg: {
            score: true
          },
          orderBy: {
            _avg: {
              score: 'desc'
            }
          },
          take: 1
        });

        const game = await prisma.games.findUnique({
            where:{
                game_id: gamesWithAverageScore[0].game_id
            },
            select:{
                game_name: true,
                game_score: true
            }
        })
        game.scoreThisMonth = gamesWithAverageScore[0]._avg.score
        res.json(game)
    }catch(e){
        console.log(e)
        res.json(e)
    }
}