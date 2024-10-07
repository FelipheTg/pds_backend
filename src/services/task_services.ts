import { DevDataSource } from "../connections/db_dev";
import { Task } from "../models/task";

// 1) Estabele conexão com a tabela alvo no banco de dados através de um cursos. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação.
// essas consultas são feitas na tabela do Repository que esta na conexão do DataSource.

const cursor = DevDataSource.getRepository(Task)

// 2)  Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá dp FRONTEND

type newTaskRequest = {
    description: string,
    date_task: Date
}

type findTaskRequest = {
    id: string
}

export class TaskService {
    async createTask ({description, date_task}: newTaskRequest) : Promise< Task | Error> {
        // Insert into tasks VALUES( description, date_task)
        const  task = cursor.create({
            description, date_task
       
        })
        //A função cursor.save() executa a instrução INSERT na tabela
        await cursor.save(task)
        return task
    }
    
    async readOneTask ({id}: findTaskRequest) :
    Promise<Task | Error> {
        //SELECT FROM tasks WHERE id = ID LIMIT 2/
        const task = await cursor.findOne({ where : {id}})
    
    }
    
    async readAllTask () {
        // SELECT * FROM tasks ( Ele acha a tabela)
        const tasks = await cursor.find()
        return tasks
    
    }
    
    
    async updateTask (){
    
    }
    
    async  deleteTask () {
    
    }
}