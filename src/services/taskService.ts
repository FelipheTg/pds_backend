import { DevDataSource } from "../connections/dbDev";
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

type updateTaskRequest = {
    id: string
    description : string
    date_task: Date 
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
    
    async readOneTask ({id}: findTaskRequest) : Promise <Task | Error> {
        //SELECT * From task where id = id LIMIT 1
        const task = await cursor.findOne({ where : {id}})
        if (!task) {
            return new Error("Task not Found!")
        }
        return task 
    
    }
    
    async readAllTask () {
        // SELECT * FROM tasks ( Ele acha a tabela)
        const tasks = await cursor.find()
        return tasks
    
    }
    
    
    async updateTask ({id, description, date_task }: updateTaskRequest) : Promise <Task | Error> {
        
        const task = await cursor.findOne({ where : {id}})
        if (!task) {
            return new Error("Task not Found!")
        }
              
        task.description = description ? description : task.description
        task.date_task = date_task ? date_task : task.date_task

        // UPDATE tasks WHERE ID = id set description = description, date_task = date_task
        await cursor.save(task)
        return task
    
    }
      


    async  deleteTask ({id}: findTaskRequest): Promise <String | Error > {
       //SELECT * FROM Task WHERE id = id LIMIT 1
        const task = await cursor.findOne({ where : {id}})
        if (!task) {
            return new Error("Task not Found!")
        }
    await cursor.delete(task.id)
    return "Task removed successfully"
    }
}


// Operador Ternario
// if (x % 2 == 0) {
// console.log ("par")
//}
// else {
//} 
//(x % 2 == 0) ? console.log("par" : console.log ("impar"))