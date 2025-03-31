import type { Request, Response } from 'express'
import Project from '../models/Project'
import Task from '../models/Task'
import mongoose, { ObjectId } from 'mongoose'


export class TaskController {

    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body)
            task.project = req.project._id as mongoose.Types.ObjectId
            req.project.tasks.push(task._id as mongoose.Types.ObjectId)
            await Promise.allSettled([req.project.save(), task.save()]) //guardando el proyecto y la tarea al mismo tiempo para mayor performance
            res.send('Tarea Creada Correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project._id }).populate('project') //buscando todas las tareas del proyecto y populando el campo project para traer la información del proyecto
            res.json(tasks)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static getTaskById = async (req: Request, res: Response) => {
        try {
            res.json(req.task)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            res.send('Tarea Actualizada Correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString())
            await Promise.allSettled([req.project.save(), req.task.deleteOne()]) //guardando el proyecto y eliminando la tarea al mismo tiempo para mayor performance
            res.send('Tarea Eliminada Correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static updateStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body
            req.task.status = status
            await req.task.save()
            res.send('Tarea Actualizada')
        } catch (error) {

        }
    }
}