import axios from "axios";
import { useState } from "react";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevTask) => {
      return {
        ...prevTask,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: user.username,
      password: user.password,
    };

    if (!data.username || !data.password) {
      setError("Please, complete all required fields");
      return;
    }

    if (data.username.trim() === "" || data.password.trim() === "") {
      setError("Please, check that there are no spaces at the beginning");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/users`, data);
    } catch (err) {
        if(err.response.status === 409) {
            setError(err.response.data.message);
        } else {
            console.log(err);
        } 
      return;
    }

    window.location.href = "/sign-in";
    setUser({
      username: "",
      password: "",
    });
    setError("");
  };

  return (
    <div className="App">
      <div className="container center-align">
        <div className="row">
          <div className="col s5">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Sign up</span>
                <p className="red-text text-darken-1">{error}</p>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        placeholder="Username"
                      />
                    </div>
                    <div className="input-field input-wrapper col s12">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Password"
                      />
                      <a href="#showPassword">
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="material-icons input-icon"
                        >
                          {showPassword ? "visibility" : "visibility_off"}
                        </span>
                      </a>
                    </div>
                    <div className="input-field col s12">
                      <button type="submit" className="btn light-blue darken-4">
                        Sign up
                      </button>
                    </div>
                    <div className="input-field col s12">
                      <p>
                        Do you have an account?{" "}
                        <a href="sign-in">Sign in here</a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
