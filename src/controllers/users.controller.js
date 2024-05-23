import prisma from '../prisma.js'
import jwt from 'jsonwebtoken'

export const create = async(req, res) =>{
    const newUser = req.body
    try{
        const user = await prisma.users.create({
            data:{
                user_name: newUser.user_name,
                user_email: newUser.user_email,
                user_password: newUser.user_password
            }
        })
        res.json(user)
    } catch(e){
        if(e.code === 'P2002' && e.meta.target.includes('user_email')){
            res.status(409).json({message:'Error: correo ya existente'})
        }
    }
}

export const read = async(req, res) => {
    const user = req.body
    try{
        const logIn = await prisma.users.findUnique({
            where:{
                user_email: user.user_email,
                user_password: user.user_password
            },
            select:{
                user_id: true,
                user_email: true,
                user_name: true,
                user_password: true,
                roles:{
                    select:{
                        role_name: true
                    }
                }
            }
        })

        if(!logIn){
            res.status(404).json({message: 'Credenciales incorrectas'})
        } else{
            const token = jwt.sign({...logIn}, 'LabPwebPIA')
            res.status(200).json(token)
        }
        
    }catch(e){
        console.log(e)
    }
}

export const update = async(req, res) => {
    const user = req.body

    try{
        const userUpdated = await prisma.users.update({
            where: {
                user_id: +user.user_id
            },
            data: {
                user_email: user.user_email,
                user_name: user.user_name,
                user_password: user.new_password
            },
        })
        
        
        if (!userUpdated) {
            res.status(404).json({message: 'Credenciales incorrectas'})
        } else {
            const token = jwt.sign({...userUpdated}, 'LabPwebPIA')
            res.status(200).json(token)
        }
    } catch(e){
        console.log(e);
    }
}

export const deleteUser = async(req, res) => {
    console.log('Hola')
}

// User Score

export const updateUserScore = async (req, res) => {
    const userScore = req.body

    try{
        const existingRecord = await prisma.user_score.findUnique({
            where:{
                user_id_game_id:{
                    user_id: userScore.user_id,
                    game_id: userScore.game_id
                }
            }
        })
        
        if(existingRecord){
            await prisma.user_score.update({
                where:{
                    user_id_game_id:{
                        user_id: userScore.user_id,
                        game_id: userScore.game_id
                    }
                },
                data:{
                    score: userScore.score,
                    updated_at: new Date()
                }
            })
        } else{
            await prisma.user_score.create({
                data:{
                    user_id: userScore.user_id,
                    game_id: userScore.game_id,
                    score: userScore.score
                }
            })
        }

        res.json('Se actualizó exitosamente')
    }catch(e){
        console.log(e)
    }
}

export const userGameScore = async (req, res) =>{
    const {gameId} = req.query
    const {userId} = req.query
    
    try{
        const scores = await prisma.user_score.findUnique({
            where:{
                user_id_game_id:{
                    game_id: +gameId,
                    user_id: +userId
                }
            }
        })

        res.json(scores)
        
    }catch(e){
        console.log(e)
    }
}

export const createUserQuestion = async (req, res) => {
    const question = req.body

    try{
        const userQuestion = await prisma.user_question.create({
            data:{
                question_info: question.question_info,
                user_id: question.user_id
            }
        })
        res.json(userQuestion)
    } catch(e) {
        res.status(409).json({message: 'Error al crear pregunta'})
    }
}

export const readUsersQuestions = async (req, res) => {
    try{
        const questions = await prisma.user_question.findMany({
            orderBy:{
                created_at: 'desc'
            },
            include:{
                users: true
            }
        })
        res.json(questions)
    } catch(e){
        console.log(e)
    }
}

export const deleteUserQuestion = async (req, res) => {
    const {question_id} = req.params
    try{
        await prisma.user_question.delete({
            where:{
                question_id: +question_id
            }
        })
        res.json({message:'Se eliminó con éxito'})
    } catch(e){
        console.log(e);
    }
}

export const deleteAllQuestions = async (req, res) => {
    try{
        await prisma.user_question.deleteMany()
        res.json({message:'Se eliminó con éxito'})
    } catch(e){
        console.log(e)
    }
}
