import React, { useEffect } from 'react';
import todoLogo from '../../src/assets/logo.png'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { HiMoon } from 'react-icons/hi';
import { BsSunFill } from 'react-icons/bs';
import '../Components/header.css';

export default function Header({ tasks, onAddTask, dark, darkMode, editTodo, setEditTodo , setTasks }) {




     const [title, setTitle] = React.useState('')


     const updateTodo = (title, taskId, isCompleted) => {
          const newTodo = tasks.map((task) =>
               task.id === taskId ? { title, taskId, isCompleted } : task
          )
          setTasks(newTodo);
          setEditTodo("");
     }

     useEffect(() => {
          if (editTodo) {
               setTitle(editTodo.title)
          } else {
               setTitle('') 
          }
     }, [setTitle, editTodo])


     function handleSubmit(event) {
          event.preventDefault();
          if (!editTodo) {
               onAddTask(title);
               setTitle('');
          } else {
               updateTodo(title, editTodo.id, editTodo.isCompleted)
               setTitle('');

          }

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
                         required
                    />


                    {
                         title ?
                              <button
                                   className={editTodo ? "grn-btn" : 'blue-btn'}
                              >
                                   Add
                                   {
                                        editTodo ? "" : < AiOutlinePlusCircle size={20}
                                        />
                                   }
                              </button>
                              : ''
                    }


               </form>

          </header>
     )
}