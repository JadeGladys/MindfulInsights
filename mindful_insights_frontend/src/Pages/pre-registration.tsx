import React from "react";
import '../css/login.css';
import { useNavigate } from 'react-router-dom';

const PreRegister = () => {
    const navigate = useNavigate();

    const handleRoleSelection = (role: string) => {
        navigate('/register', { state: { role } });
    };

    return (
        <div className="general-container">
            <div className="my-login-container">
                <div className="my-login-header">
                    <h1>SIGNUP</h1>
                </div>
                <div className="my-login-form-container">
                    <form>
                        <div className="modal-content rounded-4 shadow">
                            <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                                <button type="button" className="btn btn-lg btn-primary" onClick={() => handleRoleSelection('researcher')}>Researcher</button>
                                <button type="button" className="btn btn-lg btn-secondary" onClick={() => handleRoleSelection('analyst')}>Analyst</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PreRegister;