import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { projectExists } from '../middleware/project'
import { taskBelongsToProject, taskExists } from '../middleware/task'

const router = Router() //inicializando router

router.post('/',
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción del proyecto es Obligatoria'),
    handleInputErrors,
    ProjectController.createProject
) //ruta para crear proyecto

router.get('/', ProjectController.getAllProjects) //ruta para obtener todos los proyectos

router.get('/:id',
    param('id').isMongoId().withMessage('ID no válido'), //validando que el id sea un id de mongo
    handleInputErrors,
    ProjectController.getProjectById
) //ruta para obtener un proyecto por id

router.put('/:id',
    param('id').isMongoId().withMessage('ID no válido'), //validando que el id sea un id de mongo
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción del proyecto es Obligatoria'),
    handleInputErrors,
    ProjectController.updateProject
)//ruta para actualizar proyecto

router.delete('/:id',
    param('id').isMongoId().withMessage('ID no válido'), //validando que el id sea un id de mongo
    handleInputErrors,
    ProjectController.deleteProject
) //ruta para obtener un proyecto por id

/** Routes for tasks */
router.param('projectId', projectExists) //validando que el proyecto exista

router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción de la tarea es Obligatorio'),
    handleInputErrors,
    TaskController.createTask
)//ruta para crear tarea utilizando nested resources routing

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)//ruta para obtener todas las tareas de un proyecto

router.param('taskId', taskExists) //validando que la tarea exista
router.param('taskId', taskBelongsToProject) //validando que la tarea pertenezca al proyecto

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'), //validando que el taskId sea un id de mongo
    handleInputErrors,
    TaskController.getTaskById
)//ruta para obtener una tarea por id

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'), //validando que el taskId sea un id de mongo
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción de la tarea es Obligatorio'),
    handleInputErrors,
    TaskController.updateTask
)//ruta para actualizar tarea

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'), //validando que el taskId sea un id de mongo
    handleInputErrors,
    TaskController.deleteTask
)//ruta para eliminar tarea

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID no válido'), //validando que el taskId sea un id de mongo
    body('status')
        .notEmpty().withMessage('El estado de la tarea es Obligatorio'),
    handleInputErrors,
    TaskController.updateStatus
) //ruta para cambiar el estatus de la tarea
export default router //exportando router