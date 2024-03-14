"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Database {
    constructor(host) {
        this.client = new pg_1.Client({
            user: 'albertoinsurecert',
            host: host,
            database: 'tiretooldb',
            password: '',
            port: 5432,
        });
        this.client.connect((err) => {
            if (err) {
                console.error("connection error", err.stack);
            }
            else {
                console.log("connected");
            }
        });
    }
    addTables() {
        const query = `
            CREATE TABLE IF NOT EXISTS public.Tires (
                id SERIAL PRIMARY KEY,
                rimSize INT,
                width INT,
                aspectRatio INT
            )
        `;
        this.client.query(query, (err, res) => {
            if (err) {
                console.error(err.stack);
            }
            else {
                console.log('Tire Table created');
            }
        });
        const query2 = `
            CREATE TABLE IF NOT EXISTS public.Users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                lastName VARCHAR(100),
                email VARCHAR(100),
                password VARCHAR(100)
            )
        `;
        this.client.query(query2, (err, res) => {
            if (err) {
                console.error(err.stack);
            }
            else {
                console.log('User Table created');
            }
        });
    }
    toTire(x) {
        return {
            id: x.id,
            rimSize: x.rimsize,
            width: x.width,
            aspectRatio: x.aspectratio
        };
    }
    addTire(a, callback, error) {
        const query = `INSERT INTO public.Tires(
            rimSize, 
            width, 
            aspectRatio) 
        VALUES ($1, $2, $3) RETURNING *`;
        const params = [a.rimSize, a.width, a.aspectRatio];
        this.client.query(query, params, (err, res) => {
            if (err) {
                console.error(err.stack);
                error(err);
            }
            else {
                console.log('Tire added');
                const addedTire = res.rows[0];
                callback(addedTire.id);
            }
        });
    }
    updateTire(a) {
        const query = `UPDATE public.Tires
        SET rimSize = $1, 
            width = $2, 
            aspectRatio = $3
        WHERE id = $4`;
        const params = [
            a.rimSize,
            a.width,
            a.aspectRatio,
            a.id
        ];
        this.client.query(query, params, (err, res) => {
            if (err) {
                console.error(err.stack);
            }
            else {
                console.log('Tire updated');
            }
        });
    }
    getTires(callback, error) {
        const query = `SELECT * FROM public.Tires`;
        this.client.query(query, (err, res) => {
            if (err) {
                console.error(err.stack);
                error(err);
            }
            else {
                console.log('Tires', res.rows);
                const tires = res.rows.map((x) => this.toTire(x));
                console.log('tires, ', tires);
                callback(tires);
            }
        });
    }
    getTireById(id, callback, error) {
        const query = `SELECT * FROM public.Tires WHERE id = $1`;
        const params = [id];
        this.client.query(query, params, (err, res) => {
            if (err) {
                console.error(err.stack);
                error(err);
            }
            else {
                console.log('Tire by id');
                const tires = res.rows.map((x) => this.toTire(x));
                callback(tires);
            }
        });
    }
}
exports.Database = Database;
