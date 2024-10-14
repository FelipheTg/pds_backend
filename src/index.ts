import { DevDataSource } from "./connections/dbDev";
import rotas from "./routes/routes";
import express = require ("express")

//Inicializar a conexão com o banco de dados quando o servidor subir 
DevDataSource.initialize().then()
 console.log("DataBase connected!")

 // Instancia o servidor express 

 const app = express()
 // Configura o servidor para a leitura de arquvivos JSON
 app.use(express.json())

 app.listen(333, () => console.log("server online on port 3333."))

 