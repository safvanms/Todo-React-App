import React from 'react';
import '../../Components/Task/task.css';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { BsFillCheckCircleFill } from 'react-icons/bs';


export default function Task({ task, onComplete, onDelete, dark, onEdit }) {



     return (

          <div className={dark ? 'task' : 'task-light'}>
               <button className='check' onClick={() => onComplete(task.id)}>
                    {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
               </button>
               <p className={task.isCompleted ? 'textCompleted' : ""}> {task.title}</p>
               <button
                    className='delete'
                    onClick={() => onEdit(task.id)}
               >
                    <CiEdit size={20} />
               </button>

               <button
                    className='delete'
                    onClick={() => onDelete(task.id)}
               >
                    <MdDelete size={20} />
               </button>

          </div>
     )
}
