import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  BarChart2,
  Book,
  Plus,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({
    title: "",
    due_date: "",
    priority: "medium",
    subject: "",
  });

  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  const API_BASE_URL = "http://localhost:3000";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // Get the token from localStorage or wherever you store it
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/api/tasks/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if response is ok (status 200-299)
      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (newTask.title && newTask.due_date) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/tasks/dashboard`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          await fetchTasks();
          setNewTask({
            title: "",
            due_date: "",
            priority: "medium",
            subject: "",
          });
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const toggleTaskComplete = async (id, completed) => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: !completed }),
      });
      if (response.ok) {
        await fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchTasks();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-[#8BA2B6] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#8BA2B6] p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
            <button className="flex items-center px-4 py-2 bg-white text-[#8BA2B6] rounded-lg hover:bg-gray-100 transition-colors">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar View
            </button>
            <button className="flex items-center px-4 py-2 bg-white text-[#8BA2B6] rounded-lg hover:bg-gray-100 transition-colors">
              <BarChart2 className="w-4 h-4 mr-2" />
              Analytics
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Due Today Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-[#8BA2B6] mr-4" />
              <div>
                <p className="text-sm text-gray-500">Due Today</p>
                <p className="text-2xl font-bold">
                  {
                    tasks.filter(
                      (t) =>
                        new Date(t.due_date).toDateString() ===
                        new Date().toDateString()
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Completed Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center">
              <CheckCircle2 className="w-8 h-8 text-[#8BA2B6] mr-4" />
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold">
                  {tasks.filter((t) => t.completed).length}
                </p>
              </div>
            </div>
          </div>

          {/* Total Tasks Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center">
              <Book className="w-8 h-8 text-[#8BA2B6] mr-4" />
              <div>
                <p className="text-sm text-gray-500">Total Tasks</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Task */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Add New Task</h2>
          </div>
          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BA2B6]"
              />
              <input
                type="date"
                value={newTask.due_date}
                onChange={(e) =>
                  setNewTask({ ...newTask, due_date: e.target.value })
                }
                className="md:w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BA2B6]"
              />
              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BA2B6]"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <input
                type="text"
                placeholder="Subject"
                value={newTask.subject}
                onChange={(e) =>
                  setNewTask({ ...newTask, subject: e.target.value })
                }
                className="md:w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BA2B6]"
              />
              <button
                onClick={handleAddTask}
                className="flex items-center justify-center px-4 py-2 bg-[#8BA2B6] text-white rounded-lg hover:bg-[#7A91A5] transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Tasks</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border ${
                    task.completed ? "bg-gray-50" : "bg-white"
                  } flex flex-col md:flex-row md:items-center justify-between gap-4`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        toggleTaskComplete(task.id, task.completed)
                      }
                      className="w-5 h-5 rounded border-gray-300 text-[#8BA2B6] focus:ring-[#8BA2B6]"
                    />
                    <div>
                      <h3
                        className={`font-medium ${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-sm text-gray-500">
                          {task.subject}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        priorityColors[task.priority]
                      }`}
                    >
                      {task.priority}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
