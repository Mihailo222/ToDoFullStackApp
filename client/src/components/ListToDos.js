import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditToDo";

const ListTodos = () => {
    
    const [todos, setTodos] = useState([]);


    //delete todo


const deleteTodo = async(id) => {

    try {
        const deleteTodo = await fetch(`http://localhost:5005/todos/${id}`,{
            method: "DELETE"
        });
    
        //odmah na klik se desava update liste
        setTodos(todos.filter(todo => todo.todo_id !== id)) //update tabele
    } catch (error) {
        console.log(error.error)
     }
    }


    //list todos
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5005/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
            
          //  console.log(jsonData)
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getTodos();
    },[]); //only one request
    
    
    
    return ( <Fragment>
        <table className="table mt-5 text-center">
        <thead>
        <tr>
            <th> Description </th>
            <th> EditTodo </th>
            <th> Delete </th>
        </tr>
        </thead>
        <tbody>
            {todos.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td><EditTodo todo={todo} /></td>
                <td><button className="btn btn-danger" onClick={()=>deleteTodo(todo.todo_id)}>Delete</button></td>
              </tr>  
        ))}
        </tbody>
        </table>
    </Fragment>);
}

export default ListTodos;