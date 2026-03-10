import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "../../AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import HodWrapper from "../../components/hod-components/hodwrapper";

const ResearchReview: React.FC = () => {
    const { research_ID } = useParams();
    const { accessToken } = useAuth();
    const navigate = useNavigate();

    const [research, setResearch] = useState({
        topic: '',
        areaOfResearch: '',
        hypothesis: '',
        dataCollected: null,
        dataset: null,
        dataCollectionMethods: [] as string[],
        status: '',
        comments: '',
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [comments, setComments] = useState<string | null>(null);

    useEffect(() => {
        const fetchResearch = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/research/${research_ID}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setResearch(response.data);
                setComments(response.data.comments || '');
            } catch (error) {
                console.error("Error fetching research:", error);
            }
        };

        if (research_ID) {
            fetchResearch();
        }
    }, [research_ID, accessToken]);

    const handleApprove = async () => {
        try {
            await axios.patch(`http://localhost:3000/api/research/${research_ID}`, 
                { 
                    status: 'approved', 
                    comments: comments || null 
                }, 
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
            setResearch(prevResearch => ({ ...prevResearch, status: 'approved', comments: comments || '' }));
            setSuccessMessage('Research status updated successfully!');
            setTimeout(() => {
                setSuccessMessage(null);
                navigate('/HODTasks');
            }, 2000);
        } catch (error) {
            console.error("Error updating research status:", error);
        }
    };

    const handleDeny = async () => {
        try {
            await axios.patch(`http://localhost:3000/api/research/${research_ID}`, 
                { 
                    status: 'WorkInProgress', 
                    comments: comments || null 
                }, 
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
            setResearch(prevResearch => ({ ...prevResearch, status: 'pending', comments: comments || '' }));
            setSuccessMessage('Research status updated to pending!');
            setTimeout(() => {
                setSuccessMessage(null);
                navigate('/HODTasks');
            }, 2000);
        } catch (error) {
            console.error("Error updating research status:", error);
        }
    };

    return (
        <HodWrapper>
            <div className="dashboard-container">
                <div className="row">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="" style={{ color: "#0074CC" }}>Instructions</span>
                            <span className="badge bg-primary rounded-pill"></span>
                        </h4>
                        <div className="modal-content rounded-4 shadow">
                            <div className="modal-header border-bottom-0">
                                <h1 className="modal-title fs-4"><span className="" style={{ color: "#0074CC" }}>COMMENTS</span></h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body py-0">
                                <textarea 
                                    className="form-control" 
                                    id="comments" 
                                    rows={3} 
                                    cols={6} 
                                    value={comments || ''}
                                    onChange={(e) => setComments(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                                <button type="button" className="btn btn-lg" style={{ backgroundColor: "#f8be0098" }}>Save changes</button>
                            </div>
                        </div>
                        <img src={process.env.PUBLIC_URL + '/assets/images/collab-illu.PNG'} alt="Image:)" />
                    </div>

                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Research Details</h4>
                        {successMessage && (
                            <div className="alert alert-success" role="alert">
                                {successMessage}
                            </div>
                        )}
                        <form className="needs-validation">
                            <div className="row g-3">
                                <div className="col-sm-12">
                                    <label htmlFor="topic" className="form-label">Topic</label>
                                    <textarea
                                        className="form-control"
                                        id="topic"
                                        rows={3}
                                        cols={6}
                                        value={research.topic}
                                        readOnly
                                    />
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="areaOfResearch" className="form-label">Area of Research</label>
                                    <textarea
                                        className="form-control"
                                        id="areaOfResearch"
                                        rows={3}
                                        cols={6}
                                        value={research.areaOfResearch}
                                        readOnly
                                    />
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="hypothesis" className="form-label">Hypothesis</label>
                                    <textarea
                                        className="form-control"
                                        id="hypothesis"
                                        rows={3}
                                        cols={6}
                                        value={research.hypothesis}
                                        readOnly
                                    />
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="dataCollectionMethods" className="form-label">Data Collection Methods:</label>
                                    <textarea
                                        className="form-control"
                                        id="dataCollectionMethods"
                                        rows={3}
                                        cols={6}
                                        value={research.dataCollectionMethods ? research.dataCollectionMethods.join(", ") : ''}
                                        readOnly
                                    />
                                </div>

                                {research.dataCollectionMethods && research.dataCollectionMethods.length > 0 && (
                                    <div className="col-12">
                                        <h4>Selected Data Collection Methods:</h4>
                                        <ul>
                                            {research.dataCollectionMethods.map((method: string, index: number) => (
                                                <li key={index}>{method}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="col-md-6">
                                    <label htmlFor="dataCollected" className="form-label">Data Collected (PDF)</label>
                                    {research.dataCollected && (
                                        <a href={URL.createObjectURL(new Blob([research.dataCollected]))} target="_blank" rel="noopener noreferrer">
                                            View Data Collected
                                        </a>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="dataset" className="form-label">Dataset (PDF or Excel)</label>
                                    {research.dataset && (
                                        <a href={URL.createObjectURL(new Blob([research.dataset]))} target="_blank" rel="noopener noreferrer">
                                            View Dataset
                                        </a>
                                    )}
                                </div>
                            </div>

                            <hr className="my-4" />
                            <button type="button" className="btn btn-lg btn-primary mt-5 w-100" onClick={handleApprove} style={{ backgroundColor: "#0074CC" }}>Approve</button>
                            <button type="button" className="btn btn-lg btn-primary mt-5 w-100" onClick={handleDeny} style={{ backgroundColor: "#319F43" }}>Deny</button>
                        </form>
                    </div>
                </div>
            </div>
        </HodWrapper>
    );
};

export default ResearchReview;


// appending comments

// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import { useAuth } from "../../AuthContext";
// import { useParams, useNavigate } from "react-router-dom";
// import HodWrapper from "../../components/hod-components/hodwrapper";

// const ResearchReview: React.FC = () => {
//     const { research_ID } = useParams();
//     const { accessToken } = useAuth();
//     const navigate = useNavigate();

//     const [research, setResearch] = useState({
//         topic: '',
//         areaOfResearch: '',
//         hypothesis: '',
//         dataCollected: null,
//         dataset: null,
//         dataCollectionMethods: [] as string[],
//         status: '',
//         comments: '',
//     });
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const [newComment, setNewComment] = useState<string>('');

//     useEffect(() => {
//         const fetchResearch = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3000/api/research/${research_ID}`, {
//                     headers: {
//                         'Authorization': `Bearer ${accessToken}`
//                     }
//                 });
//                 setResearch(response.data);
//             } catch (error) {
//                 console.error("Error fetching research:", error);
//             }
//         };

//         if (research_ID) {
//             fetchResearch();
//         }
//     }, [research_ID, accessToken]);

//     const handleApprove = async () => {
//         try {
//             await axios.patch(`http://localhost:3000/api/research/${research_ID}`, 
//                 { 
//                     status: 'approved', 
//                     comments: newComment || null 
//                 }, 
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${accessToken}`
//                     }
//                 }
//             );
//             setResearch(prevResearch => ({ ...prevResearch, status: 'approved' }));
//             setSuccessMessage('Research status updated successfully!');
//             setTimeout(() => {
//                 setSuccessMessage(null);
//                 navigate('/HODTasks');
//             }, 2000);
//         } catch (error) {
//             console.error("Error updating research status:", error);
//         }
//     };

//     const handleDeny = async () => {
//         try {
//             await axios.patch(`http://localhost:3000/api/research/${research_ID}`, 
//                 { 
//                     status: 'WorkInProgress', 
//                     comments: newComment || null 
//                 }, 
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${accessToken}`
//                     }
//                 }
//             );
//             setResearch(prevResearch => ({ ...prevResearch, status: 'pending' }));
//             setSuccessMessage('Research status updated to pending!');
//             setTimeout(() => {
//                 setSuccessMessage(null);
//                 navigate('/HODTasks');
//             }, 2000);
//         } catch (error) {
//             console.error("Error updating research status:", error);
//         }
//     };

//     return (
//         <HodWrapper>
//             <div className="dashboard-container">
//                 <div className="row">
//                     <div className="col-md-5 col-lg-4 order-md-last">
//                         <h4 className="d-flex justify-content-between align-items-center mb-3">
//                             <span className="" style={{ color: "#0074CC" }}>Instructions</span>
//                             <span className="badge bg-primary rounded-pill"></span>
//                         </h4>
//                         <div className="modal-content rounded-4 shadow">
//                             <div className="modal-header border-bottom-0">
//                                 <h1 className="modal-title fs-4"><span className="" style={{ color: "#0074CC" }}>COMMENTS</span></h1>
//                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                             </div>
//                             <div className="modal-body py-0">
//                                 <textarea 
//                                     className="form-control" 
//                                     id="newComment" 
//                                     rows={3} 
//                                     cols={6} 
//                                     value={newComment}
//                                     onChange={(e) => setNewComment(e.target.value)}
//                                 />
//                             </div>
//                             <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
//                                 <button type="button" className="btn btn-lg" style={{ backgroundColor: "#f8be0098" }} onClick={handleApprove}>Save changes</button>
//                             </div>
//                         </div>
//                         <img src={process.env.PUBLIC_URL + '/assets/images/collab-illu.PNG'} alt="Image:)" />
//                     </div>

//                     <div className="col-md-7 col-lg-8">
//                         <h4 className="mb-3">Research Details</h4>
//                         {successMessage && (
//                             <div className="alert alert-success" role="alert">
//                                 {successMessage}
//                             </div>
//                         )}
//                         <form className="needs-validation">
//                             <div className="row g-3">
//                                 <div className="col-sm-12">
//                                     <label htmlFor="topic" className="form-label">Topic</label>
//                                     <textarea
//                                         className="form-control"
//                                         id="topic"
//                                         rows={3}
//                                         cols={6}
//                                         value={research.topic}
//                                         readOnly
//                                     />
//                                 </div>

//                                 <div className="col-sm-12">
//                                     <label htmlFor="areaOfResearch" className="form-label">Area of Research</label>
//                                     <textarea
//                                         className="form-control"
//                                         id="areaOfResearch"
//                                         rows={3}
//                                         cols={6}
//                                         value={research.areaOfResearch}
//                                         readOnly
//                                     />
//                                 </div>

//                                 <div className="col-sm-12">
//                                     <label htmlFor="hypothesis" className="form-label">Hypothesis</label>
//                                     <textarea
//                                         className="form-control"
//                                         id="hypothesis"
//                                         rows={3}
//                                         cols={6}
//                                         value={research.hypothesis}
//                                         readOnly
//                                     />
//                                 </div>

//                                 <div className="col-sm-12">
//                                     <label htmlFor="dataCollectionMethods" className="form-label">Data Collection Methods:</label>
//                                     <textarea
//                                         className="form-control"
//                                         id="dataCollectionMethods"
//                                         rows={3}
//                                         cols={6}
//                                         value={research.dataCollectionMethods ? research.dataCollectionMethods.join(", ") : ''}
//                                         readOnly
//                                     />
//                                 </div>

//                                 {research.dataCollectionMethods && research.dataCollectionMethods.length > 0 && (
//                                     <div className="col-12">
//                                         <h4>Selected Data Collection Methods:</h4>
//                                         <ul>
//                                             {research.dataCollectionMethods.map((method: string, index: number) => (
//                                                 <li key={index}>{method}</li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}

//                                 <div className="col-md-6">
//                                     <label htmlFor="dataCollected" className="form-label">Data Collected (PDF)</label>
//                                     {research.dataCollected && (
//                                         <a href={URL.createObjectURL(new Blob([research.dataCollected]))} target="_blank" rel="noopener noreferrer">
//                                             View Data Collected
//                                         </a>
//                                     )}
//                                 </div>

//                                 <div className="col-md-6">
//                                     <label htmlFor="dataset" className="form-label">Dataset (PDF or Excel)</label>
//                                     {research.dataset && (
//                                         <a href={URL.createObjectURL(new Blob([research.dataset]))} target="_blank" rel="noopener noreferrer">
//                                             View Dataset
//                                         </a>
//                                     )}
//                                 </div>

//                                 <div className="col-12">
//                                     <label htmlFor="comments" className="form-label">Comments</label>
//                                     <textarea
//                                         className="form-control"
//                                         id="comments"
//                                         rows={5}
//                                         cols={6}
//                                         value={research.comments}
//                                         readOnly
//                                     />
//                                 </div>
//                             </div>
//                             <hr className="my-4" />
//                             <div className="row">
//                                 <div className="col-md-6">
//                                     <button
//                                         type="button"
//                                         className="btn btn-success"
//                                         onClick={handleApprove}
//                                     >
//                                         Approve
//                                     </button>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <button
//                                         type="button"
//                                         className="btn btn-danger"
//                                         onClick={handleDeny}
//                                     >
//                                         Deny
//                                     </button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </HodWrapper>
//     );
// };

// export default ResearchReview;
