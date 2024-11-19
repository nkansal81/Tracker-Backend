import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const dbUser = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "crud"
})

app.use(express.json());
app.use(cors());

app.listen(8800, ()=>{
    console.log("connected to user backend");
})