import '../css/ResearchProject.css';
import React, { useState, useEffect } from "react";
import Wrapper from "../components/wrapper";
import { useAuth } from "../AuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResearchProject: React.FC = () => {
    const { research_ID } = useParams();
    const { accessToken } = useAuth();
    const navigate = useNavigate();

    const [research, setResearch] = useState({
        topic: '',
        objective: '',
        startDate: '',
        endDate: '',
        abstract: '',
        description: '',
        areaOfResearch: '',
        hypothesis: '',
        dataCollected: null,
        dataset: null,
        dataCollectionMethods: [] as string[],
        comments: ''
    });

    useEffect(() => {
        const fetchResearch = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/research/${research_ID}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setResearch(response.data);
            } catch (error) {
                console.error("Error fetching research:", error);
            }
        };

        if (research_ID) {
            fetchResearch();
        }
    }, [research_ID, accessToken]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        if (e.target instanceof HTMLSelectElement && e.target.multiple) {
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
            setResearch(prevState => ({
                ...prevState,
                [id]: selectedOptions
            }));
        } else {
            setResearch(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, files } = e.target;
        if (files && files.length > 0) {
            setResearch(prevState => ({
                ...prevState,
                [id]: files[0]
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        
        const propertiesToUpdate = ['topic', 'objective', 'startDate', 'endDate', 'abstract', 'description', 'areaOfResearch', 'hypothesis', 'dataCollected', 'dataset'] as const;
        propertiesToUpdate.forEach((key: keyof typeof research) => {
            if (key in research) {
                const value = research[key];
                if (value !== null && value !== undefined) {
                    if (Array.isArray(value)) {
                        value.forEach(val => formData.append(key, val));
                    } else {
                        formData.append(key, value as string | Blob);
                    }
                }
            }
        });

    
        try {
            const response = await axios.patch(`http://localhost:3000/api/research/${research_ID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`
                },
            });
            console.log('Server response:', response.data); // Debug log
            navigate(`/workspace`);
        } catch (error) {
            console.error('There was an error updating the research:', error);
        }
    };

    return (
        <Wrapper>
            <div className="dashboard-container">
                <div className="row">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Instructions</span>
                            <span className="badge bg-primary rounded-pill"></span>
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <strong>To customize and carry out your research Collection method, please follow these steps:</strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <ol>
                                    <li>Open the <a href="https://www.google.com/forms/">Google Forms</a> link provided.</li>
                                    <li>Click on "Use Template" to create a copy of the form for your research.</li>
                                    <li>Customize the form questions and settings as needed for your research.</li>
                                    <li>Share the form with your participants and collect responses.</li>
                                    <li>Once you have collected all responses, follow the steps below to convert responses to PDF:</li>
                                </ol>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <strong>Converting Google Forms all responses to PDF:</strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <ol>
                                    <li>Go to the Responses tab in your Google Form.</li>
                                    <li>Click on the three dots (more icon) at the corner beside 'Link Sheet'.</li>
                                    <li>Select the "Print all responses" option and then save the PDF file.</li>
                                </ol>
                            </li>
                        </ul>
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
                                    placeholder="Briefly describe changes you would like"
                                    value={research.comments}
                                    onChange={handleInputChange}
                                    
                                />
                            </div>
                            <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                            </div>
                        </div>
                    </div>


                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Research Steps</h4>
                        <form className="needs-validation" onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-sm-12">
                                    <label htmlFor="topic" className="form-label">Topic</label>
                                    <textarea
                                        className="form-control"
                                        id="topic"
                                        rows={3}
                                        cols={6}
                                        placeholder="Briefly describe a general area of research"
                                        value={research.topic}
                                        onChange={handleInputChange}
                                        
                                    />
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="objective" className="form-label">Objective</label>
                                    <textarea
                                        className="form-control"
                                        id="objective"
                                        rows={3}
                                        cols={6}
                                        placeholder="Briefly describe a general area of research"
                                        value={research.objective}
                                        onChange={handleInputChange}
                                        
                                    />
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="abstract" className="form-label">Abstract</label>
                                    <textarea
                                        className="form-control"
                                        id="abstract"
                                        rows={3}
                                        cols={6}
                                        placeholder="Briefly describe a general area of research"
                                        value={research.abstract}
                                        onChange={handleInputChange}
                                        
                                    />
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        rows={3}
                                        cols={6}
                                        placeholder="Briefly describe a general area of research"
                                        value={research.description}
                                        onChange={handleInputChange}
                                        
                                    />
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="areaOfResearch" className="form-label">Area to Research</label>
                                    <textarea
                                        className="form-control"
                                        id="areaOfResearch"
                                        rows={3}
                                        cols={6}
                                        placeholder="Briefly describe a general area of research"
                                        value={research.areaOfResearch}
                                        onChange={handleInputChange}
                                        
                                    />
                                    <div className="invalid-feedback">
                                        Valid Area of research is .
                                    </div>
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="hypothesis" className="form-label">Hypothesis</label>
                                    <textarea
                                        className="form-control"
                                        id="hypothesis"
                                        rows={3}
                                        cols={6}
                                        placeholder="Briefly describe a general area of research"
                                        value={research.hypothesis}
                                        onChange={handleInputChange}
                                        
                                    />
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="dataCollectionMethod" className="form-label">Data Collection Method</label>
                                    <textarea
                                        className="form-control"
                                        id="dataCollectionMethod"
                                        rows={3}
                                        cols={6}
                                        placeholder="Briefly describe a general area of research"
                                        value={research.dataCollectionMethods}
                                        onChange={handleInputChange}
                                        
                                    />
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="dataCollected" className="form-label">Data Collected</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="dataCollected"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="dataset" className="form-label">Dataset</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="dataset"
                                        accept=".pdf, .xlsx"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="startDate" className="form-label">Start Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="startDate"
                                        value={research.startDate}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="endDate" className="form-label">End Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="endDate"
                                        value={research.endDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <button className="w-100 btn btn-primary btn-lg mt-3" type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default ResearchProject;
