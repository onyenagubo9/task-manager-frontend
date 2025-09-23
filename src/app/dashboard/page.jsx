'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TASK_STATUSES = ['All', 'Pending', 'Completed'];

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState('Pending');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const router = useRouter();

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.push('/login');
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://task-manager-api.railway.app/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const filteredTasks = tasks.filter((task) =>
    filter === 'All' ? true : task.status === filter
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingTaskId ? 'PUT' : 'POST';
    const url = editingTaskId
      ? `http://localhost:5000/tasks/${editingTaskId}`
      : 'http://localhost:5000/tasks';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formTitle,
          description: formDescription,
          status: formStatus,
        }),
      });

      if (!res.ok) throw new Error('Failed to save task');
      setFormTitle('');
      setFormDescription('');
      setFormStatus('Pending');
      setEditingTaskId(null);
      fetchTasks();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete task');
      fetchTasks();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (task) => {
    setFormTitle(task.title);
    setFormDescription(task.description);
    setFormStatus(task.status);
    setEditingTaskId(task._id);
  };

  if (!token) {
    return <div className="p-6 text-center text-red-600">You must be logged in.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🧠 Task Manager Dashboard
        </h1>
        
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🧠 Task Manager Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {TASK_STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Task Form */}
        <div className="bg-white shadow-md rounded-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingTaskId ? '✏️ Edit Task' : '➕ Add New Task'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Task Title"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Task Description (optional)"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />

            <select
              className="w-full px-4 py-2 border rounded-md"
              value={formStatus}
              onChange={(e) => setFormStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
              >
                {editingTaskId ? 'Update Task' : 'Add Task'}
              </button>
              {editingTaskId && (
                <button
                  type="button"
                  onClick={() => {
                    setFormTitle('');
                    setFormDescription('');
                    setFormStatus('Pending');
                    setEditingTaskId(null);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Task List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 rounded-md shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {task.description || 'No description'}
                </p>
                <p className="text-sm mb-3">
                  <span className="font-semibold">Status:</span>{' '}
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      task.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {task.status}
                  </span>
                </p>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-sm px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
