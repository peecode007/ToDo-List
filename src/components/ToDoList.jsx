import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmed = input.trim();
    if (trimmed === '') return alert('Task cannot be empty.');
    const newTask = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  const saveEdit = (id) => {
    const trimmed = editingText.trim();
    if (trimmed === '') return alert('Task cannot be empty.');
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: trimmed } : task
    ));
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-700">📝 To-Do List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new task..."
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <div className="flex justify-center gap-2 mb-4">
        {['all', 'active', 'completed'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {filteredTasks.length === 0 && (
          <li className="text-center text-gray-500">No tasks to show.</li>
        )}

        {filteredTasks.map(task => (
          <li
            key={task.id}
            className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg"
          >
            <div className="flex items-center gap-2 flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task.id)}
                className="w-4 h-4"
              />

              {editingId === task.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(task.id);
                    if (e.key === 'Escape') cancelEdit();
                  }}
                  autoFocus
                  className="flex-grow px-2 py-1 rounded border border-gray-300 focus:outline-none"
                />
              ) : (
                <span
                  className={`flex-grow ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.text}
                </span>
              )}
            </div>

            <div className="flex gap-2 ml-4">
              {editingId === task.id ? (
                <>
                  <button
                    onClick={() => saveEdit(task.id)}
                    className="text-green-600 hover:text-green-800 text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(task.id, task.text)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
