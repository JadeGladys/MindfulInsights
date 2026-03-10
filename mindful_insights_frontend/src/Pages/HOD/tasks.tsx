import React, { useEffect, useState } from "react";
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from "jspdf-autotable";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import HodWrapper from "../../components/hod-components/hodwrapper";
import HODTodolist from "./HODtodolist";

interface Research {
  research_ID: number;
  topic: string;
  objective: string;
  startDate: string;
  endDate: string;
  description: string;
  status: string;
  hypothesis: string;
  areaOfResearch: string;
  abstract: string;
  recordedBy: {
    id: number;
    userID: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    password: string;
  };
  analyst: {
    id: number;
    userID: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
  }; 
}

const HODTasks: React.FC = () => {
  const { accessToken, userID } = useAuth();
  const [researches, setResearches] = useState<Research[]>([]);

  useEffect(() => {
    const fetchResearches = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/research/status/completed`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log("Fetched researches:", response.data);  // Log the response data
        setResearches(response.data);
      } catch (error) {
        console.error("Error fetching researches:", error);
      }
    };

    fetchResearches();
  }, [accessToken, userID]);
  

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Page 1
    doc.setFontSize(22);
    doc.text('Mindful Insights', 70, 30);
  
    doc.setFontSize(18);
    doc.text('Topic: ' + researches[0].topic, 10, 60);
  
    doc.setFontSize(14);
    doc.text('End Date: ' + researches[0].endDate, 10, 80);
    doc.text('Prepared by: ' + researches[0].recordedBy.username + ', ' + researches[0].recordedBy.userID, 10, 100);
    doc.text('Analysed by: ' + researches[0].analyst.username + ', ' + researches[0].analyst.userID, 10, 120);
  
    // Add a new page
    doc.addPage();
  
    // Page 2: Table of Contents
    doc.setFontSize(18);
    doc.text('Table of Contents', 10, 20);
  
    let tocY = 30;
    doc.text('1. Abstract ............................................... 3', 10, tocY);
    doc.text('2. Hypothesis ............................................. 4', 10, tocY + 10);
    doc.text('3. Area of Research ....................................... 5', 10, tocY + 20);
  
    // Add a new page
    doc.addPage();
  
    // Page 3: Abstract
    doc.setFontSize(18);
    doc.text('Abstract', 10, 20);
    doc.setFontSize(14);
    doc.text(researches[0].abstract, 10, 40, { maxWidth: 180 });
  
    // Add a new page
    doc.addPage();
  
    // Page 4: Hypothesis
    doc.setFontSize(18);
    doc.text('Hypothesis', 10, 20);
    doc.setFontSize(14);
    doc.text(researches[0].hypothesis, 10, 40, { maxWidth: 180 });
  
    // Add a new page
    doc.addPage();
  
    // Page 5: Area of Research
    doc.setFontSize(18);
    doc.text('Area of Research', 10, 20);
    doc.setFontSize(14);
    doc.text(researches[0].areaOfResearch, 10, 40, { maxWidth: 180 });
  
    doc.save('completed_research_report.pdf');
  };

  return (
    <HodWrapper>
      <div className="dashboard-container">
        <h1>TASKS</h1>
        <div className="table">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Project</th>
                <th scope="col">Submitted</th>
                <th scope="col">Created By</th>
                <th scope="col">View</th>
                <th scope="col">Report</th>
                {/* <th scope="col">Publication</th> */}
              </tr>
            </thead>
            <tbody>
              {researches.map((research) => (
                <tr key={research.research_ID}>
                  <td>{research.research_ID}</td>
                  <td>{research.topic}</td>
                  <td>{new Date(research.startDate).toLocaleDateString()}</td>
                  <td>{research.recordedBy.userID}</td>
                  <td><Link to={`/ResearchReview/${research.research_ID}`}>Review</Link></td>
                  <td><button className="btn btn-primary" onClick={downloadPDF}>Download Report</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h1task">
          <h1>METRICS</h1>
          <HODTodolist />
        </div>
      </div>
    </HodWrapper>
  );
};

export default HODTasks;
