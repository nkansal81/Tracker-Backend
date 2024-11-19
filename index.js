import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "crud"
})

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json("this is the backend")
})

app.get("/book", (req,res)=>{
    // const q = "SELECT * FROM book"
    
    const q = "SELECT * FROM book ORDER BY title ASC"
    db.query(q,(err,data)=>{
        console.log(data);
        if(err) return res.json(err)
        return res.json(data)
    })
})

// app.get("/task", (req,res)=>{
//     const q = "SELECT * FROM data"
//     db.query(q,(err,data)=>{
//         console.log(data);
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })

app.get("/task/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "SELECT * FROM data WHERE bookId = ?;"
    db.query(q,[bookId],(err,data)=>{
        console.log(data);
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/taskId/:id", (req,res)=>{
    const taskId = req.params.id;
    const q = "SELECT * FROM data WHERE id = ?;"
    db.query(q,[taskId],(err,data)=>{
        console.log(data);
        if(err) return res.json(err)
        return res.json(data)
    })
})

// app.get("/task/:id", (req,res)=>{
//     const bookId = req.params.id;
//     const q = "SELECT b.*, d.* FROM book AS b JOIN data AS d ON b.id = d.bookId WHERE b.id = ?;"
//     db.query(q,[bookId],(err,data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })

app.post("/task", (req,res)=>{
    const q = "INSERT INTO data (`task`,`estimate`,`bookId`) VALUES (?)"
    const values = 
          [
             req.body.task, 
             req.body.estimate,
             req.body.bookId
         ]
    db.query(q,[values],(err,data) => {
     if(err) return res.json(err)
     return res.json("User task has been created successfully");
    })
 })

app.post("/book", (req,res)=>{
   const q = "INSERT INTO book (`title`, `desc`,`project_key`,`price`,`sprint`,`logged`,`rem`) VALUES (?) "
   const values = 
         [
            req.body.title, 
            req.body.desc,
            req.body.project_key,
            req.body.price,
            req.body.sprint,
            req.body.logged,
            req.body.rem
         ]
   db.query(q,[values],(err,data) => {
    if(err) return res.json(err)
    return res.json("Book has been created successfully");
   })
})

app.put("/book/:id", (req,res)=> {
    const bookId = req.params.id;
    const q = "UPDATE book SET `title` = ?, `desc` = ?,`project_key` = ?,`price` = ?,`sprint` = ?,`logged` = ?,`rem` = ? WHERE id = ?";
    const values = 
         [
            req.body.title, 
            req.body.desc,
            req.body.project_key,
            req.body.price,
            req.body.sprint,
            req.body.logged,
            req.body.rem
        ]
    db.query(q,[...values,bookId],(err,data) => {
        if(err) return res.json(err)
        return res.json("Book has been updated successfully");
    })
})

app.put("/booklogged/:id", (req,res)=> {
    const bookId = req.params.id;
    const q = "UPDATE book SET `logged` = ? WHERE id = ?";
    const values = 
        [
            req.body.logged,
        ]
    db.query(q,[...values,bookId],(err,data) => {
        if(err) return res.json(err)
        return res.json("Book logged has been updated successfully");
    })
})

app.put("/bookRem/:id", (req,res)=> {
    const bookId = req.params.id;
    const q = "UPDATE book SET `rem` = ? WHERE id = ?";
    const values = 
        [
            req.body.rem,
        ]
    db.query(q,[...values,bookId],(err,data) => {
        if(err) return res.json(err)
        return res.json("Remaining estimate has been updated successfully");
    })
})

app.put("/updateTask/bookId/:bookId/taskId/:id", (req,res)=> {
    const TaskId = req.params.id;
    const bookId = req.params.bookId;

    const q = "UPDATE data SET `task` = ?,`estimate` = ?,`bookId` = ? WHERE id = ?";
    // const values = 
    //         [
    //             req.body.task, 
    //             req.body.estimate,
    //             req.body.bookId,
    //             TaskId
    //         ]

    // db.query(q, values, (err, results) => {
    //     if (err) {
    //         console.error('Error executing the query:', err);
    //         return;
    //     }
    //     console.log('Task updated successfully:', results);
    // });
    const values = 
         [
            req.body.task, 
            req.body.estimate,
        ]
    db.query(q,[...values,bookId,TaskId],(err) => {
        if(err) return res.json(err)
        return res.json("Task has been updated successfully");
    })
})

app.delete("/book/:id", (req,res)=> {
    const bookId = req.params.id;
    const q = "DELETE FROM book WHERE id = ?";
    db.query(q,[bookId],(err,data) => {
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully");
    })
})

app.listen(8800, ()=>{
    console.log("connected to backend");
})