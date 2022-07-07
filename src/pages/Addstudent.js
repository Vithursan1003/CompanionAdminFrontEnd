import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Addstudent() {
  //data types of input data
  const history = useHistory();

  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginsubmit = (e) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("api/login", data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          history.push("/");
        } else if (res.data.status === 401) {
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 ">
          <div className="card">
            <div className="card-header">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={loginsubmit}>
                <div className="form-group mb-1">
                  <label>Email ID</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInput}
                    value={loginInput.email}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {loginInput.error_list.email}
                  </span>
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInput}
                    value={loginInput.password}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {loginInput.error_list.email}
                  </span>
                </div>
                <div className="form-group mb-3">
                  <button type="submit" className="btn btn-primary">
                    login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addstudent;
