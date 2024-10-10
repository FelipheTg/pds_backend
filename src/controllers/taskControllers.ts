import { Request, Response} from "express"
import { TaskService } from "../services/taskService"

const service = new TaskService()


export class TaskController {
    async createTask (req: Request, res: Response) {
        // Captura informações do formulário
        const { description, date_task } = req.body
        // tudo que esta vindo esta vindo pelo body // e o que estive pela URL e parâmetro
        const result =  await service.createTask({description, date_task})
    if (result instanceof Error) {
        // Retorna a mensagem de erro
        return res.status(500).json(result.message)
    }
    // Do contrario, se for uma nova Task, retorne-a para o usúario
    return res.status(204).json(result)
    }

    async readAllTask (req: Request, res: Response) {
       const result = await service.readAllTask ()
       if (result instanceof Error) {
        return res.status(500).json (result.message)
       }
       //Se a lista estiver vazia
        if (result.length == 0) {
            // Mostre a seguinte mensagem para usuario
            return res.status(200).json(" No tasks found")
        }
        // Do contrario, devolva a lista para o usuario
        return res.status(200).json(result)
    }
    async readOneTask (req: Request, res: Response) {
        const {id} = req.params
        const result = await service.readOneTask({id})
        if (result instanceof Error) {
            res.status(404).json(result.message)
        }
        return res.json(result)
    }
    async updateTask (req: Request, res: Response) {
        const {id} = req.params
        const { description, date_task} = req.body
        const result = await service.updateTask({id, description, date_task})
        if (result instanceof Error) {
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

    async deleteTask (req: Request, res: Response) {
        const {id} = req.params
        const result = await service.deleteTask({ id})
        if (result instanceof Error) {
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

}