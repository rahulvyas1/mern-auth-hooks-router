import React, { useState } from "react";
import axios from "axios";
import request from "request";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("tab_login");
  const [name, setName] = useState("");
  const [password2, setPassword2] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function ProtectedRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  function Index() {
    return <h2>Home</h2>;
  }

  function Secret() {
    return <h1>You are in the  secret area! Click log out now for logging out.</h1>;
  }

  const handleSignUp = event => {
    event.preventDefault();

    // console.log("email: " + email);
    // console.log("password: "+ password);
    // console.log("Active Tab:"+ activeTab);
    axios
      .post("https://aqueous-coast-83605.herokuapp.com/api/users/register", {
        name: name,
        email: email,
        password: password,
        password2: password2
      })
      .then(function(response) {
        console.log(response);
        setHasError(false);
      })
      .catch(function(error) {
        console.log(error);
        setHasError(true);
      });
  };

  const handleSignIn = event => {
    event.preventDefault();
    console.log("email: " + email);

    axios
      .post("https://aqueous-coast-83605.herokuapp.com/api/users/login", {
        email: email,
        password: password
      })
      .then(function(response) {
        console.log("logged in");
        console.log(response);
        setErrorResponse("Logged in as +" + name);

        if (response.status == "200") {
          //user is logged in
          // setHasError(false);
          setIsAuthenticated(true);
        }
      })
      .catch(function(error) {
        setIsAuthenticated(false);
        setHasError(true);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("error response");
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  const handleTabChange = event => {
    // console.log(event.target.id);
    setActiveTab(event.target.id);
    // console.log(activeTab);
    console.log(event.target.className);
  };

  return (
    <div className="container">
      <Router>
        <div>

          <div className="section is-fullheight">
            <nav
              className="navbar"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                  <img
                    src="https://bulma.io/images/bulma-logo.png"
                    width="112"
                    height="28"
                  />
                </a>
                <div class="navbar-start">
                {isAuthenticated ? (<a onClick={()=> setIsAuthenticated(false)} className="navbar-item"> Log Out</a>) :
                (<Link to="/" className="navbar-item">Login/Signup</Link>)}
                  <Link to="/protected" className="navbar-item">Secret Area</Link>
                </div>

                <a
                  role="button"
                  className="navbar-burger"
                  aria-label="menu"
                  aria-expanded="false"
                />
              </div>
            </nav>
            {isAuthenticated ? (
                  <article className="message">
                    {" "}
                    <div className="message-body">
                      {errorResponse} {email}{" "}
                    </div>
                  </article>
                ) : (
<div className="container">
              <div className="column is-4 is-offset-4">
                <div className="tabs is-large">
                  <ul>
                    <li
                      className={activeTab == "tab_login" ? "is-active" : null}
                    >
                      <a onClick={e => handleTabChange(e)} id="tab_login">
                        Login
                      </a>
                    </li>
                    <li
                      className={activeTab == "tab_signup" ? "is-active" : null}
                    >
                      <a onClick={e => handleTabChange(e)} id="tab_signup">
                        Sign Up
                      </a>
                    </li>
                  </ul>
                </div>
                {activeTab == "tab_login" ? (
                  <div className="box">
                    <form onSubmit={e => handleSignIn(e)}>
                      <div className="field">
                        <label className="label">Email Address</label>
                        <div className="control">
                          <input
                            className="input"
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                          <input
                            className="input"
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="button is-block is-info is-fullwidth"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="box">
                    <form onSubmit={e => handleSignUp(e)}>
                      <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                          <input
                            className="input"
                            type="text"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Email Address</label>
                        <div className="control">
                          <input
                            className="input"
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                          <input
                            className="input"
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Re-Password</label>
                        <div className="control">
                          <input
                            className="input"
                            type="password"
                            name="password2"
                            value={password2}
                            onChange={e => setPassword2(e.target.value)}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="button is-block is-info is-fullwidth"
                      >
                        Sign Up
                      </button>
                    </form>
                  </div>
                )}

                
              </div>
            </div>
                )}
            
          </div>
          <Route path="/" exact component={Index} />
          <ProtectedRoute component={Secret} path="/protected" />
        </div>
      </Router>
    </div>
  );
}

export default App;
