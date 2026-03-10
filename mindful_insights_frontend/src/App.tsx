import React, { useEffect, useState } from 'react';
import './App.css';
import './css/chatStyle.css'
import './css/tasks.css'
import Dashboard from './Pages/Dashboard';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Tasks from './Pages/Tasks';
import Register from './Pages/register';
import Login from './Pages/login';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import TopBar from './scenes/global/topBar';
import Workspace from './Pages/Workspace';
import ResearchProject from './Pages/ResearchProject';
import Collaboration from './Pages/Collaboration';
import PublishedResearh from './Pages/publishedResearch';
import Message from './Pages/Message';
import AnalystDashboard from './Pages/Analyst/AnalystDashboard';
import Tools from './Pages/Analyst/Tools';
import { AuthProvider } from './AuthContext';
import ATasks from './Pages/Analyst/tasks';
import PreRegister from './Pages/pre-registration';
import HODashboard from './Pages/HOD/HODashboard';
import HODTasks from './Pages/HOD/tasks';
import ResearchReview from './Pages/HOD/research-review';
import AResearchReview from './Pages/Analyst/research-review';
import Blog from './Pages/blogpost';


function App() {
  const { theme, colorMode } = useMode();

  return (
    <AuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <div className="App">
            <Router>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/pre-register" element={<PreRegister />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/topbar" element={<TopBar />} />
                <Route path="/workspace" element={<Workspace />} />
                <Route path="/workspace/ResearchProject/:research_ID" element={<ResearchProject />} />
                <Route path="/message" element={<Message />} />
                <Route path="/collaboration" element={<Collaboration />} />
                <Route path="/PbResearch" element={<PublishedResearh />} />
                <Route path="/ADashboard" element={<AnalystDashboard />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/Atasks" element={<ATasks />} />
                <Route path="/tools/:research_ID" element={<Tools />} />
                <Route path="/AResearchReview/:research_ID" element={<AResearchReview />} />
                <Route path="/HODashboard" element={<HODashboard />} />
                <Route path="/HODTasks" element={<HODTasks />} />
                <Route path="/ResearchReview/:research_ID" element={<ResearchReview />} />
                <Route path="/ResearchReview" element={<ResearchReview />} />
                <Route path="/blog" element={<Blog />} />
                
                {/* <Route path="/ADashboard" element={<AnalystDashboard />} />
                <Route path="/tools" element={<Tools />} /> */}
              </Routes>
            </Router>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default App;
