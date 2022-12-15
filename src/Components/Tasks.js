import Task from './Task/Task';
import '../Components/tasks.css';

export default function Tasks({ tasks, onComplete, onDelete, dark , onClear  }) {

     const tasksQuantity = tasks.length;
     const completed = tasks.filter(task => task.isCompleted).length;

     return (
          <section className='tasks'>
               <header className='head'>
                    <div>
                         <p className={ dark ? 'textBlue' : 'textGreen'}>Tasks :</p>
                         {tasksQuantity ? <span>{tasksQuantity}</span> : "No Tasks"}
                    </div>
                    {tasksQuantity ?
                         <div>
                              <p className={ dark ? 'textBlue' : 'textGreen'}>Completed </p>
                              <span>{completed} of {tasksQuantity} </span>
                         </div> : ""}
               </header>

               <div className='list'>
                    {tasks.map(task => (
                         <Task
                              key={task.id}
                              task={task}
                              onComplete={onComplete}
                              onDelete={onDelete}
                              dark={dark}
                         />
                    ))}
               </div>

              { tasksQuantity > 3 ?  <button className='all-delete' onClick={()=>onClear(tasks.id)}>Delele all</button> : '' }
          </section>
     )
}