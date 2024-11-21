import React, { useContext, useState } from 'react';
import loginimg from "../assets/loginimg.png";
import { Form, FloatingLabel, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, registerApi } from '../services/aalApi';
import { TokenAuthContext } from '../context/AuthContext';

function Auth({ insideRegister }) {
 
  const {isAuthorised,setIsAuthorised} = useContext(TokenAuthContext)
   
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: "", email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userData.email && userData.password) {
      try {
        setIsLoading(true);
        const result = await loginAPI(userData);
        if (result.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token",result.data.token); // Assuming token should be set correctly
          setIsAuthorised(true)
          setUserData({ username: "", email: "", password: "" });
          navigate("/");
        } else {
          if (result.response.status === 404) {
            alert(result.response.data);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please fill the form completely");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userData.username && userData.email && userData.password) {
      try {
        const result = await registerApi(userData);
        if (result.status === 200) {
          alert(`Welcome ${result.data.username}...now please log in`);
          setUserData({ username: "", email: "", password: "" });
          navigate('/login');
        } else {
          if (result.status === 406) {
            alert(result.response.data);
            setUserData({ username: "", email: "", password: "" });
          }
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Fill the form completely you idiot!");
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh" }} className='d-flex justify-content-center align-items-center'>
      <div className='container w-75'>
        <div className='card shadow p-2'>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className='w-100' src={loginimg} alt="login" />
            </div>
            <div className="col-lg-6">
              <h1 className='fw-bolder mt-2'><i className='fa-brands fa-docker'></i>Project Fair</h1>
              <h5 className='fw-bolder mt-2'>Sign {insideRegister ? "up" : "in"} to your Account</h5>
              <Form>
                {insideRegister &&
                  <FloatingLabel controlId="floatingInputName" label="Username" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={userData.username}
                      onChange={e => setUserData({ ...userData, username: e.target.value })}
                    />
                  </FloatingLabel>
                }
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={userData.email}
                    onChange={e => setUserData({ ...userData, email: e.target.value })}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={e => setUserData({ ...userData, password: e.target.value })}
                  />
                </FloatingLabel>
                {insideRegister ? (
                  <div className="mt-3">
                    <button onClick={handleRegister} className="btn btn-success mb-2">
                      Register
                    </button>
                    <p>Already have an account? Click here to <Link to="/login">Login</Link></p>
                  </div>
                ) : (
                  <div className="mt-3">
                    <button onClick={handleLogin} className="btn btn-success mb-2">
                      Login
                      {isLoading && <Spinner animation="border" variant="light" className='ms-1' />}
                    </button>
                    <p>New user? Click here to <Link to="/register">Register</Link></p>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
