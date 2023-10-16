import { useState } from "react";
function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    _id: "",
    title: "",
    description: "",
  });

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
    if(!task._id) {
      fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((response) => response.json())
        .catch((err) => console.log(err));
    } else {
      fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((response) => response.json())
        .catch((err) => console.log(err));
    }

    setTask({
      _id: "",
      title: "",
      description: "",
    });
  };

  const getTasks = () => {
    fetch("http://localhost:5000/api/tasks")
      .then(response => response.json())
      .then(data => {
        setTasks(data)
        console.log(data);
      });
  };
  getTasks();

  const deleteTask = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if(confirm("Are you sure you want to delete it?")) {
      fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .catch((err) => console.log(err));
    }
  };
  
  const updateTask = (id) => {
    fetch(`/api/tasks/${id}`)
      .then(response => response.json())
      .then(data => {
        setTask({
          _id: data._id,
          title: data.title,
          description: data.description,
        })
      });
  };

  return (
    <div className="App">
      {/* Navegacion */}
      <nav className="light-blue darken-4">
        <div className="container">
          <a className="brand-logo" href="/">
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
                      <input
                        type="hidden"
                        name="_id"
                        value={task._id}
                      />
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

export default App;
