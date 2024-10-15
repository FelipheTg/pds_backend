import { Router} from "express"
import { TaskController } from "../controllers/taskController"

const router = Router()
const controller = new TaskController()

router.get("/", (request, response) => {
    response.json("home page")
})

// Rota Read All
router.get("/tasks", controller.readAllTask) 
// Rota 
router.get("/tasks/:id",controller.readOneTask)

router.post("/tasks", controller.createTask)

router.put("tasks/:id", controller.updateTask)

router.delete("/tasks/:id" , controller.deleteTask)


export default router