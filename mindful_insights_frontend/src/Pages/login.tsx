import React, { useState, SyntheticEvent } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";

const Login = () => {
  const { setAccessToken, setUsername, setUserID, setID } = useAuth();
  const [localUsername, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username: localUsername,
        password
      }, { withCredentials: true });

      console.log("Login response:", response.data);

      if (response.data.token) {
        setAccessToken(response.data.token);
        setUsername(localUsername);
        setUserID(response.data.userId);
        setID(response.data.id);

         // Redirect based on role
        if (response.data.roles.includes('analyst')) {
          setRedirectPath('/ADashboard');
        } else if (response.data.roles.includes('researcher')) {
          setRedirectPath('/dashboard');
        }else if (response.data.roles.includes('hod')) {
          setRedirectPath('/HODashboard');
        }
        return; // Add this line to exit the function after setting redirectPath
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Use the error message from the server if available
          setErrorMessage(error.response.data.message || 'An unexpected error occurred. Please try again.');
        } else if (error.request) {
          setErrorMessage('No response from the server. Please check your network connection.');
        } else {
          setErrorMessage('Error in setting up the request. Please try again.');
        }
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
      console.error('Login failed:', error);
    }
  };

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="general-container">
      <div className="my-login-container">
        <div className="my-login-header">
          <h1>LOGIN</h1>
        </div>
        <div className="my-login-form-container">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={submit}>
            <div className="my-username-field">
              <label>username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                placeholder="UserName" 
                required 
                onChange={e => setLocalUsername(e.target.value)}
              />
            </div>
            <div className="my-password-field">
              <label>Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="............" 
                required 
                onChange={e => setPassword(e.target.value)}
              />
              <div className="my-checkbox-container">
                <input type="checkbox" id="remember-me"/>
                <label>Remember me</label>
              </div>
            </div>
            <button type="submit">LOGIN</button>
            <div className="my-forgot-password">
              <a href="#">Forgot password?</a>
            </div>
            <div className="my-forgot-password">
              <p><a href='/pre-register'>New User    Sign-UP</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>  
  );
}

export default Login;


// import '../css/login.css';
// import axios from "axios";
// import React, { useState, SyntheticEvent } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";

// const Login = () => {
//   const { setAccessToken, setUsername, setUserID, setID } = useAuth();
//   const [localUsername, setLocalUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [redirect, setRedirect] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const submit = async (e: SyntheticEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/login', {
//         username: localUsername,
//         password
//       }, { withCredentials: true });

//       console.log("Login response:", response.data);

//       if (response.data.token) {
//         setAccessToken(response.data.token);
//         setUsername(localUsername);
//         setUserID(response.data.userId);
//         setID(response.data.id);
//         setRedirect(true);
//       } else {
//         setErrorMessage('Login failed. Please check your credentials.');
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           // Use the error message from the server if available
//           setErrorMessage(error.response.data.message || 'An unexpected error occurred. Please try again.');
//         } else if (error.request) {
//           setErrorMessage('No response from the server. Please check your network connection.');
//         } else {
//           setErrorMessage('Error in setting up the request. Please try again.');
//         }
//       } else {
//         setErrorMessage('An unexpected error occurred. Please try again.');
//       }
//       console.error('Login failed:', error);
//     }
//   };

//   if (redirect) {
//     return <Navigate to="/ADashboard" replace />;
//   }