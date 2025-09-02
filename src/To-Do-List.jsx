import { useState, useEffect } from "react";
import "./index.css"; // Import the CSS file

function To_Do_List() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load saved tasks
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };
   const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h2> React To-Do List</h2>

        <div className="input-area">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul className="task-list">
          {tasks.map((t, i) => (
            <li key={i} className={t.completed ? "completed" : ""}>
              <span onClick={() => toggleTask(i)}>{t.text}</span>
              <button className="delete-btn" onClick={() => deleteTask(i)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default To_Do_List;

