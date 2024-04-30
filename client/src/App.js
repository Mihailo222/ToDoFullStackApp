import React,{Fragment} from 'react';
import './App.css';

//components
import InputToDo from './components/InputToDo';
import ListTodos from './components/ListToDos';
import EditTodo from './components/EditToDo';

function App() {
  return (<Fragment>
    
    <div className='container'>
    
     <InputToDo/>
     <ListTodos/>
     
    </div>
    
    
    </Fragment>);
}

export default App;
