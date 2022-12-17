import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Components/Header';
import Tasks from './Components/Tasks';
import Swal from 'sweetalert2';

const LOCAL_STORAGE_KEY = "todo:savedTasks";

function App() {

    // for making the app darkmode and light monde 

    const [dark, setDark] = React.useState(true);
    function darkMode() {
        setDark(prevDark => !prevDark)
    }

    // editing the todo 
    const [editTodo, setEditTodo] = React.useState(null)

    //useState for todo tasks
    const [tasks, setTasks] = React.useState([])

    // for storing the todo tasks in the local storage 
    function loadSavedTasks() {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (saved === undefined)
            return
        if (saved) setTasks(JSON.parse(saved));

    }

    useEffect(() => {
        loadSavedTasks();
    }, [])


    function setTasksAndSave(newTasks) {
        setTasks(newTasks)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
    }


    function handleEdit(taskId) {
        const findTask = tasks.find((task) => task.id === taskId);
        setEditTodo(findTask);

        console.log("edit clicked");
    }



    // here the function for add the todo 
    function addTask(taskTitle) {
        setTasksAndSave([
            ...tasks,
            {
                id: crypto.randomUUID(),
                title: taskTitle,
                isCompleted: false
            }

        ])

    }

    function toggleTaskCompletedById(taskId) {
        const newTasks = tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    isCompleted: !task.isCompleted
                }
            }
            return task;
        })
        setTasksAndSave(newTasks);
    }



    function deleteTaskById(taskId) {
        const newTasks = tasks.filter(task => task.id !== taskId);
        if (newTasks) {
            let timerInterval
            Swal.fire({
                title: 'deleting..',
                timer: 500,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                }
            })
        }
        setTasksAndSave(newTasks);
    }

    function deleteAllTaskById(taskId) {
        const newTasks = tasks.filter(task => task.id !== taskId);
        if (newTasks) {
            Swal.fire({
                className: 'alert',
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    setTasksAndSave([]);
                    Swal.fire(
                        'Deleted!',
                        'Your tasks has been deleted.',
                        'success'
                    )
                }
            })
        }

    }



    return (
        <div className={dark ? 'body' : 'container-light'}>

            <Header
                dark={dark}
                onAddTask={addTask}
                darkMode={darkMode}
                editTodo={editTodo}
                setEditTodo={setEditTodo}
                tasks={tasks}
            />

            <Tasks
                dark={dark}
                tasks={tasks}
                onComplete={toggleTaskCompletedById}
                onDelete={deleteTaskById}
                darkMode={darkMode}
                onClear={deleteAllTaskById}
                task={tasks.id}
                onEdit={handleEdit}
                editTodo={editTodo}
            />

        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));