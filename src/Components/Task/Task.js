import React from 'react';
import '../../Components/Task/task.css';
import { MdDelete } from 'react-icons/md';
import { BsFillCheckCircleFill } from 'react-icons/bs';


export default function Task({ task, onComplete , onDelete ,dark }) {


     return (
          
          <div className={dark ? 'task' : 'task-light'}>
               <button className='check' onClick={() => onComplete(task.id)}>
                    {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
               </button>
               <p className={task.isCompleted ? 'textCompleted' : ""}> {task.title}</p>
               <button
                className='delete'
                onClick={()=>onDelete(task.id)}
                >
                    <MdDelete size={20} />
               </button>
          </div>
     )
}
