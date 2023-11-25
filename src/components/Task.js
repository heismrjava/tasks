import axios from "axios";
import { useEffect, useState } from "react";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    _id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    const getTasks = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/tasks");
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };
    getTasks();
  }, [tasks]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      _id: task._id,
      title: task.title,
      description: task.description,
    };

    if (!data.title || !data.description) {
      return;
    }

    if (data.title.trim() === "" || data.description.trim() === "") {
      return;
    }

    if (!data._id) {
      try {
        await axios.post("http://localhost:5000/api/tasks", data);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await axios.put(`http://localhost:5000/api/tasks/${data._id}`, data);
      } catch (err) {
        console.error(err);
      }
    }

    setTask({
      _id: "",
      title: "",
      description: "",
    });
  };

  const deleteTask = async (_id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete it?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${_id}`);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateTask = async (_id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/tasks/${_id}`
      );
      setTask(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      {/* Navegacion */}
      <nav className="light-blue darken-4">
        <div className="container">
          <a className="brand-logo" href="/tasks">
            Tasks
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col s5">
            <div className="card">
              <div className="card-content">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input type="hidden" name="_id" value={task._id} />
                    </div>
                    <div className="input-field col s12">
                      <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        placeholder="Task Title"
                      />
                    </div>
                    <div className="input-field col s12">
                      <textarea
                        placeholder="Task Description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        className="materialize-textarea"
                      ></textarea>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col s7">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  return (
                    <tr key={task._id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>
                        <button
                          className="btn light-blue darken-4"
                          onClick={() => deleteTask(task._id)}
                        >
                          <i className="material-icons">delete</i>
                        </button>
                        <button
                          className="btn light-red darken-4"
                          onClick={() => updateTask(task._id)}
                          style={{ margin: "4px" }}
                        >
                          <i className="material-icons">edit</i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
