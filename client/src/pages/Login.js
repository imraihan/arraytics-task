import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/userslice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);

  const [userData, setUserData] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();

    await dispatch(loginUser(userData));
    // if (!error) {
    navigate('/');
    // }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            {/* {error && <p>Error: {error}</p>} */}
            {user ? <p>Login Successful</p> : null}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
