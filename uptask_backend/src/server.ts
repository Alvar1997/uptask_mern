import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import {corsConfig} from './config/cors'
import { connectBD } from './config/db'
import projectRoutes from './routes/ProjectRoutes'

dotenv.config()//configurando dotenv
connectBD()//conectando a base de datos

const app = express()//inicializando express
app.use(cors(corsConfig))//Habilitando cors

//Logging
app.use(morgan('dev'))//Habilitando el uso de morgan para logging

app.use(express.json())//Leer datos de formularios

//Rutas
app.use('/api/projects', projectRoutes)

export default app //exportando app