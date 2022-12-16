import React from 'react';
import todoLogo from '../../src/assets/logo.png'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { HiMoon } from 'react-icons/hi';
import { BsSunFill } from 'react-icons/bs';
import '../Components/header.css';

export default function Header({ tasks, onAddTask, dark, darkMode, editTodo, setEditTodo }) {




     const [title, setTitle] = React.useState('')

     const updateTodo = (title, id, isCompleted) => {
          const newTodo = tasks.map((task) =>
               task.id === id ? { title, id, isCompleted } : task
          )
          setTitle(newTodo);
          setEditTodo("");
     }

     function handleSubmit(event) {
          event.preventDefault();
          if (!editTodo) {
               onAddTask(title);
               setTitle('');
          } else {
               updateTodo({...tasks}, title, editTodo.id, editTodo.isCompleted)
          }
          console.log("current state", title)
          console.log("editTodo.id", editTodo.id)
          console.log("editTodo.completed", editTodo.isCompleted)
     }

     function onChangeTitle(event) {
          setTitle(event.target.value);
     }

     return (
          <header className={dark ? "header" : "header-light"}>
               <img className='logo' src={todoLogo} alt="logo" />
               <span><h1 className={dark ? "to-sec" : "to-sec-light"}>to</h1></span>
               <span><h1 className='do-sec'>do</h1></span>
               {dark ?
                    <span className='mode-btn'>
                         <button onClick={darkMode} className={dark ? "darkMode" : "lightMode"}><BsSunFill /></button>
                    </span>
                    :
                    <span className='mode-btn'>
                         <button onClick={darkMode} className={dark ? "darkMode" : "lightMode"}> <HiMoon /></button>
                    </span>
               }
               <form
                    onSubmit={handleSubmit}
                    className={dark ? 'task-form' : 'task-form-light'}
               >
                    <input
                         placeholder='Add a new task'
                         value={title}
                         onChange={onChangeTitle}
                         on
                         required
                    />

                    {
                         title ? <button>Add<AiOutlinePlusCircle size={20} /> </button> : ''
                    }
               </form>

          </header>
     )
}