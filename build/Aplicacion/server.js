import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
/**Crea una nueva aplicación Express y la guarda en la constante "app" */
var app = express();
/** Convierte la URL del módulo actual en una ruta del sistema y la guarda en __filename. */
var __filename = fileURLToPath(import.meta.url);
/**Obtiene el nombre de la carpeta en la que se encuentra __filename y lo guarda en la constante __dirname*/
var __dirname = path.dirname(__filename);
/** Ruta raíz del proyecto (sube dos niveles desde build/Aplicacion) */
var rootPath = path.join(__dirname, "../..");
/**permisos publicos al acceso de la carpeta ../public */
app.use(express.static(path.join(rootPath, "public")));
/**permisos publicos al acceso de la carpeta ../build */
app.use("/build", express.static(path.join(rootPath, "build")));
/**
 * Cuando se realiza una petición GET a la ruta "/",
 * el servidor envía el archivo index.html como respuesta.
 */
app.get("/", function (req, res) {
    res.sendFile(path.join(rootPath, "public", "index.html"));
});
/** Cuando se realiza una peticion get a la ruta "/winner"
 * el servidor envía el archivo winner.html como respuesta*/
app.get("/winner", function (req, res) {
    res.sendFile(path.join(rootPath, "public", "winner.html"));
});
/** Cuando se realiza una peticion get a la ruta "/loser"
 * el servidor envía el archivo loser.html como respuesta*/
app.get("/loser", function (req, res) {
    res.sendFile(path.join(rootPath, "public", "loser.html"));
});
/**Inicia el escucha en el puerto 3000 con un mensaje en terminal de que "Wordle is listening at port 3000..." */
app.listen(3000, function () {
    console.log("Wordle is listening at port 3000...");
});
