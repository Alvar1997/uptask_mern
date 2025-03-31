import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {corsConfig} from './config/cors'
import { connectBD } from './config/db'
import projectRoutes from './routes/ProjectRoutes'

dotenv.config()//configurando dotenv
connectBD()//conectando a base de datos

const app = express()//inicializando express
app.use(cors(corsConfig))//Habilitando cors

app.use(express.json())//Habilitando el uso de json

//Rutas
app.use('/api/projects', projectRoutes)

export default app //exportando app