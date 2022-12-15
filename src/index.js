import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Components/Header';
import Tasks from './Components/Tasks';
import Swal from 'sweetalert2';

const LOCAL_STORAGE_KEY = "todo:savedTasks";

function App() {

    const [dark, setDark] = React.useState(true);

    function darkMode() {
        setDark(prevDark => !prevDark)
    }

    const [tasks, setTasks] = React.useState([])

    function loadSavedTasks() {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (saved) {
            setTasks(JSON.parse(saved));
        }
    }

    useEffect(() => {
        loadSavedTasks();
    }, [])

    function setTasksAndSave(newTasks) {
        setTasks(newTasks)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
    }



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
            alert("Task Deleted !")
        }
        setTasksAndSave(newTasks);
    }

    function deleteAllTaskById(taskId) {
        const newTasks = tasks.filter(task => task.id !== taskId);
        if (newTasks) {
            Swal.fire({
                className:'alert',
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
            />

            <Tasks
                dark={dark}
                tasks={tasks}
                onComplete={toggleTaskCompletedById}
                onDelete={deleteTaskById}
                darkMode={darkMode}
                onClear={deleteAllTaskById}
                task={tasks.id}
            />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));



