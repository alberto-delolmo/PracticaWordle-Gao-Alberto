import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app: express.Application = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const rootPath = path.join(__dirname, "../..");

app.use(express.static(path.join(rootPath, "public")));

app.use("/build", express.static(path.join(rootPath, "build")));


app.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(rootPath, "public", "index.html"));
});

app.get("/winner", (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(rootPath, "public", "winner.html"));
});

app.get("/loser", (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(rootPath, "public", "loser.html"));
});

app.listen(3000, () => {
    console.log("Wordle is listening at port http://localhost:3000");
});