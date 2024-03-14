import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes/index.js'

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use('/api', router)

app.listen(3000, () =>{
    console.log('Example app listening on port 3000')
})

