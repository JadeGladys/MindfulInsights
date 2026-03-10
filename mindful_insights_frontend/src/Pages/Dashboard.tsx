import React, {Component} from "react";
import Wrapper from "../components/wrapper";
import MyChart from "../components/MyChart";
import Todolist from "../components/todolist";


 const Dashboard: React.FC = () => {
        return(
            <Wrapper>
                <div className="dashboard-container">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2 text-wrapper">Dashboard</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group me-2">
                            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                        </div>
                        <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
                            <svg className="bi"><use xlinkHref="#calendar3"/></svg>
                            This week
                        </button>
                        </div>
                    </div>
                    <div className="my-cards-container" id="custom-cards">

                        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch ">
                        <div className="col">
                            <div className="dashboard-card card rounded-4 shadow-lg" style={{ backgroundColor: 'rgba(0, 116, 204, 0.7)' }}>
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-black text-shadow-1">
                                <p className="dashb-card-text">ANALYSES CONDUCTED</p>
                                <h2 className="card-number">85</h2>
                                <ul className="d-flex card-list">
                                <li className="d-flex align-items-center me-3">
                                    <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill"/></svg>
                                    <small>Earth</small>
                                </li>
                                <li className="d-flex align-items-center">
                                    <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3"/></svg>
                                    <small>3d</small>
                                </li>
                                </ul>
                            </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="dashboard-card card rounded-4 shadow-lg" style={{ backgroundColor: 'rgba(248, 189, 0, 0.6)' }}>
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-black text-shadow-1">
                                <p className="dashb-card-text">ENGAGEMENT</p>
                                <h2 className="card-number">97</h2>
                                <ul className="d-flex card-list">
                                <li className="d-flex align-items-center me-3">
                                    <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill"/></svg>
                                    <small>Earth</small>
                                </li>
                                <li className="d-flex align-items-center">
                                    <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3"/></svg>
                                    <small>3d</small>
                                </li>
                                </ul>
                            </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="dashboard-card card rounded-4 shadow-lg" style={{ backgroundColor: 'rgba(49, 159, 67, 0.7)' }}>
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-black text-shadow-1">
                                <p className="dashb-card-text">COLLABORATIVE PROJECTS</p>
                                <h2 className="card-number">104</h2>
                                <ul className="d-flex card-list">
                                <li className="d-flex align-items-center me-3">
                                    <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill"/></svg>
                                    <small>Earth</small>
                                </li>
                                <li className="d-flex align-items-center">
                                    <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3"/></svg>
                                    <small>3d</small>
                                </li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                <div className="h1task">
                <Todolist/>
                </div>
                </div>
            </Wrapper>
        );
    };

export default Dashboard;