import { DevDataSource } from "./connections/dbDev";
import router from "./routes/routes";
import express = require ("express")
import cors = require ("cors")


//Inicializar a conexão com o banco de dados quando o servidor subir 
DevDataSource.initialize().then()
 console.log("DataBase connected!")

 // Instancia o servidor express 

 const app = express()
 // Configura o servidor para a leitura de arquvivos JSON
 app.use(express.json())
// Adiciona arquivo de rotas

app.use(cors({
  origin: "http://localhost:3000"
}))

// Adiciona arquivo de rotas
 app.use(router)

 app.listen(3333, () => console.log("server online on port 3333."))

 