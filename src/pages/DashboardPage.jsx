import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../redux/actions/taskActions';
import Navbar from '../components/Navbar'

const TaskManagementPage = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  const [editedTaskDescription, setEditedTaskDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editedTaskStatus, setEditedTaskStatus] = useState('Open'); 
  const tasksPerPage = 5; 

  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);


  const handleCreateTask = () => {
    if (newTaskTitle && newTaskDescription) {
      dispatch(createTask({ title: newTaskTitle, description: newTaskDescription }));
      setNewTaskTitle('');
      setNewTaskDescription('');
    }
  };


  const handleUpdateTask = (taskId) => {
    if (editedTaskTitle && editedTaskDescription && editedTaskStatus) {
      dispatch(
        updateTask(taskId, {
          title: editedTaskTitle,
          description: editedTaskDescription,
          status: editedTaskStatus, 
        })
      );
      setEditingTask(null);
      setEditedTaskTitle('');
      setEditedTaskDescription('');
      setEditedTaskStatus('Open');
    }
  };

 
  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };


  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-4xl font-bold text-center text-blue-800">Task Manager</h1>

        {/* Task creation form */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Create a New Task</h2>
          <div className="space-y-2 sm:space-y-0 sm:flex sm:space-x-4">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task title"
              className="flex-1 p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Task description"
              className="flex-1 p-3 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleCreateTask}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task list */}
        {loading ? (
          <p className="text-center text-gray-600">Loading tasks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks available.</p>
        ) : (
          <div className="overflow-y-auto max-h-80"> {/* Scrollable container */}
            <ul className="space-y-4">
              {currentTasks.map((task) => (
                <li
                  key={task.id}
                  className="p-4 bg-white text-black rounded-lg shadow-md space-y-2 border border-gray-200"
                >
                  {editingTask === task.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editedTaskTitle}
                        onChange={(e) => setEditedTaskTitle(e.target.value)}
                        className="p-3 border border-gray-300 rounded-md w-full"
                      />
                      <input
                        type="text"
                        value={editedTaskDescription}
                        onChange={(e) => setEditedTaskDescription(e.target.value)}
                        className="p-3 border border-gray-300 rounded-md w-full"
                      />
                      <select
                          value={editedTaskStatus}
                          onChange={(e) => setEditedTaskStatus(e.target.value)}
                          className="p-3 border border-gray-300 rounded-md w-full"
                        >
                          <option value="Open">Open</option>
                          <option value="In-progress">In-progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateTask(task.id)}
                          className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTask(null)}
                          className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition"
                        >
                          Cancel
                        </button>
                        
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h2 className="text-xl font-semibold">Title: {task.title}</h2>
                        <p className="text-gray-700">Description: {task.description}</p>
                      
                        <p
                          className={`font-semibold ${
                            task.status === 'Open'
                              ? 'text-green-600'
                              : task.status === 'In Progress'
                              ? 'text-yellow-500'
                              : 'text-red-600'
                          }`}
                        >
                          Status: {task.status}
                        </p>
                        <p className="text-gray-500">Task Created: {new Date(task.updatedAt).toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => {
                            setEditingTask(task.id);
                            setEditedTaskTitle(task.title);
                            setEditedTaskDescription(task.description);
                          }}
                          className="px-4 py-2 bg-yellow-600 rounded-md hover:bg-yellow-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default TaskManagementPage;
