"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 5001;
// init DB
const db = new database_1.Database("localhost");
db.addTables();
app.post("/api/tire/add", (req, res) => {
    let tire = req.body;
    db.addTire(tire, (id) => {
        res.send(Object.assign(Object.assign({}, tire), { id }));
    }, (err) => res.status(500).json(err));
});
app.get("/api/tires/list", (req, res) => {
    db.getTires((tires) => {
        res.send(tires);
    }, (err) => res.status(500).json(err));
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
