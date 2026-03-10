import React from "react";
import '../css/login.css';
import { useNavigate } from 'react-router-dom';

const PreRegister = () => {
    const navigate = useNavigate();

    const handleRoleSelection = (role: string) => {
        navigate('/register', { state: { role } });
    };

    return(
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






// import React, {Component, SyntheticEvent} from "react";
// import '../css/login.css';
// import axios from 'axios';
// import { Navigate, useNavigate } from 'react-router-dom';

// class PreRegister extends Component {
//     firstName = '';
//     lastName = '';
//     userID = '';
//     userName = '';
//     email = '';
//     password = '';
//     passwordConfirm = '';
//     state = {
//         redirect: false
//     };
//     submit = async (e:SyntheticEvent) => {
//         e.preventDefault();
        
//         const reponse = await axios.post('http://localhost:3000/api/register', {
//             userID: this.userID,
//             username: this.userName,
//             email: this.email,
//             password: this.password,
//             retypedPassword: this.passwordConfirm,
//         });
//         console.log(reponse.data);
//         this.setState({
//             redirect: true
//         })
//     }
//     render() {
//         if (this.state.redirect) {
//             return <Navigate to="/login" replace />;
//         }
        
//         return(
//             <div className="general-container">
//               <div className="my-login-container">
//                 <div className="my-login-header">
//                     <h1>SIGNUP</h1>
//                 </div>
//                 <div className="my-login-form-container">
//                     <form onSubmit={this.submit}>
//                     <div className="modal-content rounded-4 shadow">
//                         <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
//                             <button type="button" className="btn btn-lg btn-primary">Save changes</button>
//                             <button type="button" className="btn btn-lg btn-secondary" data-bs-dismiss="modal">Close</button>
//                         </div>
//                     </div>
//                     </form>
//                 </div>
//                 </div>
//             </div> 
//         );
//     }
// }

// export default PreRegister;

