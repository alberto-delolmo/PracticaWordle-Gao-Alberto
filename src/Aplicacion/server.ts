import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

/**Crea una nueva aplicación Express y la guarda en la constante "app" */
const app:express.Application = express();
/** Convierte la URL del módulo actual en una ruta del sistema y la guarda en __filename. */
const __filename = fileURLToPath(import.meta.url);
//Necesario por que Express usa rutas absolutas
/**Obtiene el nombre de la carpeta en la que se encuentra __filename y lo guarda en la constante __dirname*/
const __dirname = path.dirname(__filename);


/**Permisos publicos al acceso de la carpeta __dirname */
app.use(express.static(__dirname));
/**Permisos publicos al acceso de la carpeta ../public */
app.use(express.static(path.join(__dirname, "..", "public")));
/**
 * Cuando se realiza una petición GET a la ruta "/",
 * el servidor envía el archivo index.html como respuesta.
 */
app.get("/", (req: express.Request, res: express.Response)=>{
    res.sendFile(path.join(__dirname,'..','public', 'index.html'));
})
/** Cuando se realiza una peticion get a la ruta "/winner"
 * el servidor envía el archivo winner.html como respuesta*/
app.get("/winner", (req: express.Request, res: express.Response)=>{
    res.sendFile(path.join(__dirname,'..','public', 'winner.html'));
})
/** Cuando se realiza una peticion get a la ruta "/loser"
 * el servidor envía el archivo loser.html como respuesta*/
app.get("/loser", (req: express.Request, res: express.Response)=>{
    res.sendFile(path.join(__dirname,'..','public', 'loser.html'));
})
/**Inicia el escucha en el puerto 3000 con un mensaje en terminal de que "Wordle is listening at port 3000..." */
app.listen(3000, ()=>{console.log("Wordle is listening at port 3000...")})