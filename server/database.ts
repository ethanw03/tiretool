import { Client } from 'pg';
import dotenv from 'dotenv';
import { Tire, User } from "./model";


dotenv.config();

export class Database {
    client: Client;

    constructor(host: string) {
        this.client = new Client({
            user: 'albertoinsurecert',
            host: host,
            database: 'tiretooldb', 
            password:'',
            port: 5432,
        });
        this.client.connect((err) => {
            if (err) {
              console.error("connection error", err.stack);
            } else {
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
            } else {
                console.log('Tire Table created');
            }
        });
    
        const query2 = `
            CREATE TABLE IF NOT EXISTS public.Users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                lastName VARCHAR(100),
                email VARCHAR(100),
                password VARCHAR(100),
                is_admin BOOLEAN,
            )
        `;
        this.client.query(query2, (err, res) => {
            if (err) {
                console.error(err.stack);
            } else {
                console.log('User Table created');
            }
        });
    }

    // casting functions 
    toTire(x: any): Tire {
        return {
            id: x.id,
            rimSize: x.rimsize, 
            width: x.width,
            aspectRatio: x.aspectratio 
        } as Tire;
    }

    // adding 
    addTire(a: Tire, callback: (id: number) => void, error: (err: any) => void): void {
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
            } else {
                console.log('Tire added');
                const addedTire = res.rows[0];
                callback(addedTire.id);
            }
        });
    }

    // update
    updateTire(a: Tire) {
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
            } else {
                console.log('Tire updated');
            }
        });
    }

    // getters
    getTires(callback: (tires: Tire[]) => void, error: (err: any) => void): void {
        const query = `SELECT * FROM public.Tires`;
        this.client.query(query, (err, res) => {
            if (err) {
                console.error(err.stack);
                error(err);
            } else {
                const tires = res.rows.map((x) => this.toTire(x));
                callback(tires);
            }
        });
    }

    getTireById(id: number, callback: (tires: Tire[]) => void, error: (err: any) => void): void {
        const query = `SELECT * FROM public.Tires WHERE id = $1`;
        const params = [id];
        this.client.query(query, params, (err, res) => {
            if (err) {
                console.error(err.stack);
                error(err);
            } else {
                console.log('Tire by id');
                const tire = res.rows.map((x) => this.toTire(x));
                console.log(tire);
                callback(tire);
            }
        });
    }
}

