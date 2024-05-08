import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';


function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            console.log(localStorage);
            const response = await axios.get('http://localhost:3005/api/tasks', {
                headers: {
                    'X-Token': `${token}`
                }
            });
            console.log(response);
            setTasks(response.data);
        } catch (error) {
            console.error('Error al cargar las tareas:', error);
        }
    };

    const toggleTaskStatus = async (task) => {
        const newStatus = task.estado === 'pendiente' ? 'completada' : 'pendiente';

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3005/api/tasks/${task._id}`, { estado: newStatus }, {
                headers: {
                    'X-Token': `${token}`
                }
            });
            fetchTasks();
        } catch (error) {
            console.error('Error al cambiar el estado de la tarea:', error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            await axios.post('http://localhost:3005/api/tasks', {
                nombre: newTaskName,
                estado: 'pendiente'
            }, {
                headers: {
                    'X-Token': `${token}`
                }
            });
            setNewTaskName('');
            fetchTasks();
        } catch (error) {
            console.error('Error al crear la tarea:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const token = localStorage.getItem('token');

            await axios.delete(`http://localhost:3005/api/tasks/${id}`, {
                headers: {
                    'X-Token': `${token}`
                }
            });
            fetchTasks();
        } catch (error) {
            console.error('Error al borrar la tarea:', error);
        }
    };


    return (
        <div className="taskListContainer">
            <h1 className="taskTitle">Lista de Tareas</h1>
            <ul className="taskList">
                {tasks.map(task => (
                    <li key={task._id} className="taskItem">
                        {task.nombre} - {task.estado}
                        <input
                            type="checkbox"
                            checked={task.estado === 'completada'}
                            onChange={() => toggleTaskStatus(task)}
                            className="taskInput"
                        />
                        <button onClick={() => handleDeleteTask(task._id)} className="deleteButton">
                            Borrar
                        </button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCreateTask} className="formContainer">
                <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="Nombre de la nueva tarea"
                    required
                    className="taskInputText"
                />
                <button type="submit" className="createButton">Crear Tarea</button>
            </form>
        </div>
    );
}

export default TaskList;
