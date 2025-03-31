import mongoose from "mongoose"
import {exit} from "process"

export const connectBD = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL) //connect to the database
        const url = `${connection.host}:${connection.port}` //get the host and port of the database
        console.log(`MongoDB conectado en: ${url}`.magenta.bold)//log the connection
    } catch (error) {
        console.log('Error al conectar a MongoDB'.red.bold)//log the error
        exit(1)//exit with failure
    }
}