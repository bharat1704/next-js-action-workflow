'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskId, setNewTaskId] = useState(null);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const taskId = Date.now();
      setTasks([...tasks, { id: taskId, text: newTask, completed: false }]);
      setNewTask('');
      setNewTaskId(taskId);
      
      // Remove the new class after animation
      setTimeout(() => {
        setNewTaskId(null);
      }, 1000);
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Manager</h1>
      
      <form onSubmit={addTask} className={styles.form}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Add Task</button>
      </form>

      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li 
            key={task.id} 
            className={`${styles.taskItem} ${task.id === newTaskId ? styles.new : ''}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className={styles.checkbox}
            />
            <span className={task.completed ? styles.completed : ''}>
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
