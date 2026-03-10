import React, { Component, SyntheticEvent } from "react";
import '../css/login.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { withRouter } from "../components/withRouter";

interface RegisterProps {
    location: {
        state: {
            role: string;
        }
    };
    navigate: any;
    params: any;
}

class Register extends Component<RegisterProps> {
    firstName = '';
    lastName = '';
    userID = '';
    userName = '';
    email = '';
    password = '';
    passwordConfirm = '';
    state = {
        redirect: false,
        role: this.props.location.state?.role || '' // Get the role from the navigation state
    };

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/api/register', {
                userID: this.userID,
                username: this.userName,
                email: this.email,
                password: this.password,
                retypedPassword: this.passwordConfirm,
                roles: [this.state.role] // Send the role as an array
            });
            
            console.log(response.data);
            this.setState({ redirect: true });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Registration failed:', error.response?.data);
                console.error('Detailed error message:', error.response?.data.message);
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/login" replace />;
        }
        
        return(
            <div className="general-container">
                <div className="my-login-container">
                    <div className="my-login-header">
                        <h1>SIGNUP</h1>
                    </div>
                    <div className="my-login-form-container">
                        <form onSubmit={this.submit}>
                            <div className="my-username-field">
                                <label>UserID</label>
                                <input type="text" id="UserID" name="UserID" placeholder="UserID" required 
                                onChange={e => this.userID = e.target.value}/>
                            </div>
                            <div className="my-username-field">
                                <label>Username</label>
                                <input type="text" id="username" name="username" placeholder="Username" required 
                                onChange={e => this.userName = e.target.value}/>
                            </div>
                            <div className="my-username-field">
                                <label>Email</label>
                                <input type="email" id="Email" name="Email" placeholder="Email" required 
                                onChange={e => this.email = e.target.value}/>
                            </div>
                            <div className="my-password-field">
                                <label>Password</label>
                                <input type="password" id="password" name="password" placeholder="Password" required 
                                onChange={e => this.password = e.target.value}/>
                            </div>
                            <div className="my-password-field">
                                <label>Confirm Password</label>
                                <input type="password" id="Confirmpassword" name="Confirmpassword" placeholder="Confirm Password" required 
                                onChange={e => this.passwordConfirm = e.target.value}/>
                            </div>
                            <button type="submit">SIGNUP</button>
                            <div className="my-forgot-password">
                                <a href="#">Forgot password?</a>
                            </div>
                        </form>
                        <div className="my-sign-up">
                            <p>or sign up using</p>
                            <a href="#">f</a> 
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

export default withRouter(Register);
