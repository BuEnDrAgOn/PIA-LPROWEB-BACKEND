import prisma from '../prisma.js'

export const create = async(req, res) =>{
    const faq = req.body.faq
    try{
        const fqa = await prisma.fqa.create({
             data: {
                 fqa: faq
             }
         })
         res.json(fqa)
    }
   catch(e){
    console.log(e)
   }
}

export const index = async(req, res) => {
    try{
        const fqa = await prisma.fqa.findMany()
        res.json(fqa)
    } catch(e){
        console.log(e)
    }
}

export const show = async(req, res) => {
    try{
        const fqa = await prisma.fqa.findMany()
        res.json(fqa)
    } catch(e){
        console.log(e)
    }
}

export const update = async(req, res) => {
    const {faqId} = req.params
    const faqItem = req.body

    try{
        const faqUpdated = await prisma.fqa.update({
            where:{
                fqa_id: +faqId
            },
            data:{
                fqa_title: faqItem.fqa_title,
                fqa_answer: faqItem.fqa_answer
            }
        })
        res.json(faqUpdated)
    } catch(e){
        console.log(e)
    }
}

export const deleteFQA = async(req, res) => {
    let {faqId} = req.params
    try{
        const faq = await prisma.fqa.delete({
            where: {
                fqa_id: +faqId
            }
        })
        res.json(faq)
    } catch(e){
        console.log(e)
    }
}