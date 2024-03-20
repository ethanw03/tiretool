import express, {Express, Request, Response} from "express";
import { Database } from "./database";
import { Tire, User } from "./model";

const app: Express = express();
app.use(express.json());
const PORT = process.env.PORT || 5001;

// init DB
const db = new Database("localhost");
db.addTables();

// add tire
app.post("/api/tire/add", (req: Request, res: Response) => {
    let tire = req.body as Tire;
    db.addTire(
        tire,
        (id) => {
            res.send({ ...tire, id });
        },
        (err) => res.status(500).json(err)
    );
    });

// get all tires
app.get("/api/tires/list", (req: Request, res: Response) => {
    db.getTires(
        (tires) => {
            res.send(tires);
        },
        (err) => res.status(500).json(err)
    );
});

// get tire by id 
app.get("/api/tires/:id", (req: Request, res: Response) => {
    let tireId = parseInt(req.params.id);
    db.getTireById(
        tireId,
        (tire) => {
            console.log('got tire', tire)
            res.send(tire);
        },
        (err) => res.status(500).json(err)
    );
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
