const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors())
app.use(express.json()); //dozvoljava nam da dobijemo pristum req.body i vadimo json


//create a todo
app.post("/todos", async (req,res) => {
    try {
        const {description} = req.body; //kupi "description": "I have to clean my room" json telo http requesta 
        const newTodo = await pool.query("INSERT INTO todo(description) VALUES ($1) RETURNING *",[description]); 
        console.log(newTodo);
        res.json(newTodo.rows[0]); //na ovo ceka http request i bez responsa ovde on i dalje na postmanu je oznacen kao sending request...
        //HTTP odgovor oslusnut postmanom je sa res.json(newTodo) cela newToDo promenljiva tj. ceo upit: command, row count, oid.....,rows inserted...
    } catch (error) {
        console.error(err.message);
    }
});

//select all todos
app.get('/todos', async (req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo;");
        res.json(allTodos.rows);
    } catch (err) {
     console.error(err.message);
    }
});

//get a todo

//: imamo dinamicki URL sa dinamickim parametrima=> req.params ={id: pa to sto ukucas posle todos} je http odogovr
app.get("/todos/:id", async (req,res) => {
try {
    const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1;",[id]);
    res.json(todo.rows[0]); //ovo je http response
} catch (error) {
    
}
});


//update a todo

app.put("/todos/:id", async (req, res) => {
    
    try{
    const {id} = req.params;
    const {description} = req.body;

    const updateToDo = await pool.query(
        "UPDATE todo SET description=$1 WHERE todo_id =$2",
        [description, id]
    );
    res.json("Todo changed successfully!")
    }
    catch(error){
        console.error(error.message);
    }

});

//delete a todo

app.delete("/todos/:id", async (req,res) =>{
    try{
    const {id} = req.params;
    const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);
    res.json("Todo was deleted successfully!");
}
    catch(error){
        console.log(error.message);
    }






});





















app.listen(5005,() => {
    console.log("App is running");
})