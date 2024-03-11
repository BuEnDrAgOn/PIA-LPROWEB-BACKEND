import express from 'express'
import morgan from 'morgan'
import { PrismaClient } from '@prisma/client'

const app = express()

app.use(morgan('dev'))

app.listen(3000)
console.log('Server Listening on port 3000')
