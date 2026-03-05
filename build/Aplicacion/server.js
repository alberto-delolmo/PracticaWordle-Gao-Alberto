import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
var app = express();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var rootPath = path.join(__dirname, "../..");
app.use(express.static(path.join(rootPath, "public")));
app.use("/build", express.static(path.join(rootPath, "build")));
app.get("/", function (req, res) {
    res.sendFile(path.join(rootPath, "public", "index.html"));
});
app.get("/winner", function (req, res) {
    res.sendFile(path.join(rootPath, "public", "winner.html"));
});
app.get("/loser", function (req, res) {
    res.sendFile(path.join(rootPath, "public", "loser.html"));
});
app.listen(3000, function () {
    console.log("Wordle is listening at port http://localhost:3000");
});
