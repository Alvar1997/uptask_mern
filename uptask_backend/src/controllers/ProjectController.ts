import { Request, Response } from 'express'
import Project from '../models/Project'

export class ProjectController {

    static createProject = async (req: Request, res: Response) => { //Creando proyecto
        const project = new Project(req.body)//Crea una instancia de proyecto
        try {
            await project.save()//Guarda el proyecto en la base de datos
            res.send('Proyecto Creado Correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => { //Obteniendo todos los proyectos
        try {
            const projects = await Project.find({})//Obtiene todos los proyectos de la base de datos
            res.json(projects)//Envia los proyectos en formato json
        } catch (error) {
            console.log(error)
        }
    }

    static getProjectById = async (req: Request, res: Response) => { //Obteniendo proyecto por id
        const { id } = req.params
        try {
            const project = await (await Project.findById(id)).populate('tasks')//Obtiene el proyecto por id y trae las tareas asociadas
            if (!project) {
                const error = new Error('Proyecto no encontrado')//Si no encuentra el proyecto crea un error
                res.status(404).json({ error: error.message })
                return
            }
            res.json(project)//Envia los proyectos en formato json
        } catch (error) {
            console.log(error)
        }
    }

    static updateProject = async (req: Request, res: Response) => { //Obteniendo proyecto por id
        const { id } = req.params
        try {
            const project = await Project.findById(id)//Actualiza el proyecto por id
            if (!project) {
                const error = new Error('Proyecto no encontrado')//Si no encuentra el proyecto crea un error
                res.status(404).json({ error: error.message })
                return
            }
            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description = req.body.description
            
            await project.save()//Guarda el proyecto en la base de datos
            res.send('Proyecto Actualizado')
        } catch (error) {
            console.log(error)
        }
    }

    static deleteProject = async (req: Request, res: Response) => { //Obteniendo proyecto por id
        const { id } = req.params
        try {
            const project = await Project.findById(id)//Obtiene el proyecto por id
            if (!project) {
                const error = new Error('Proyecto no encontrado')//Si no encuentra el proyecto crea un error
                res.status(404).json({ error: error.message })
                return
            }
            await project.deleteOne()
            res.send('Proyecto Eliminado')
        } catch (error) {
            console.log(error)
        }
    }

}