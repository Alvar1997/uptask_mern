import mongoose, { Document, Schema, Types } from "mongoose"

const taskStatus = {
    PENDING : 'pending',
    ON_HOLD : 'onHold',
    IN_PROGRESS : 'inProgress',
    UNDER_REVIEW : 'underReview',
    COMPLETED : 'completed'
} as const //para hacerlas readonly

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus] //para hacerlas readonly

export interface ITask extends Document { //exportando interfaz de tarea
    name: string
    description: string
    project: Types.ObjectId
    status: TaskStatus
}

export const TaskSchema: Schema = new Schema({ //exportando esquema de tarea
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project'
    },
    status: {
        type: String,
        enum: Object.values(taskStatus), //para que solo acepte los valores de taskStatus
        default: taskStatus.PENDING
    }
}, { timestamps: true }) //timestamps para que guarde la fecha de creación y modificación

const Task = mongoose.model<ITask>('Task', TaskSchema) //creando modelo de tarea
export default Task