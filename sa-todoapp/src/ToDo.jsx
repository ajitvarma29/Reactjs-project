import React, { useState } from 'react'
import './ToDo.css'

const ToDo = () => {

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue,setEditValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()!== '') {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
      }

      setTodos([...todos, newTodo]);
      setInputValue('');
    }  
  }

  const deleteTodo = (id) => {
    const updateTodos = todos.filter((value) => value.id !== id);
    setTodos(updateTodos);
  }

  const enterEditMode = (id, text) => {
    setEditMode(true);
    setEditId(id);
    setEditValue(text);
  }

  const updateTodo = () => {
    const updatedTodos = todos.map((value) => {
      if (value.id === editId) {
        return {...value, text:editValue};
      }
      return value;
    });

    setTodos(updatedTodos);
    setEditMode(false);
    setEditId(null);
    setEditValue('');
  }

  return (
    <div>
      <p>To Do List</p>
      <input type='text' value={inputValue} onChange={(event) => setInputValue(event.target.value)} ></input>

      {
        editMode ? (
          <div>
            <input type='text' value={editValue} onChange={(e)=> setEditValue(e.target.value)}/>
            <button onClick={updateTodo}>Update</button>
          </div>
        ) : (
          <button onClick={addTodo}>Add</button>
        ) 
      }
      <ul>
        {todos.map((value) =>(
          <li key={value.id}>
            {value.text}
            <button onClick={() =>deleteTodo(value.id)} >Delete</button>
            <button onClick={() =>enterEditMode(value.id, value.text)} >Edit</button>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default ToDo