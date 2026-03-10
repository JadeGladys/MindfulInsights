import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { create, all } from "mathjs";
import AnalystWrapper from "../../components/analysts-component/wrapper";
import '../../css/Analyst.css';
import AnalysisResults from "../../components/analysts-component/analysisResults";
import { useParams, useNavigate } from "react-router-dom";

const math = create(all);

const Tools: React.FC = () => {
  const [showAnalysisResult, setShowAnalysisResult] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [researchDetails, setResearchDetails] = useState({ topic: "", abstract: "" });
  const { accessToken } = useAuth();
  const { research_ID } = useParams<{ research_ID: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!research_ID) {
      console.error("Research ID is not defined.");
      navigate("/Atasks");
      return;
    }

    const fetchResearchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/research/${research_ID}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (response.status === 200) {
          setResearchDetails(response.data);
        } else {
          console.error('Error fetching research details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching research details:', error);
      }
    };

    fetchResearchDetails();
  }, [research_ID, navigate, accessToken]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const sampleSizeStr = formData.get('sampleSize') as string;
    const primaryOutcome = formData.get('primaryOutcome') as string;

    const sampleSize = parseInt(sampleSizeStr, 10);
    const primaryOutcomeArray = primaryOutcome.split(',').map(value => parseFloat(value));

    if (primaryOutcomeArray.length !== sampleSize) {
      alert('Sample size does not match the number of primary outcome measures.');
      return;
    }

    const mean = math.mean(primaryOutcomeArray);
    const stdDev = math.std(primaryOutcomeArray);

    if (typeof mean === 'number' && typeof stdDev === 'number') {
      const tTest = mean / (stdDev / Math.sqrt(sampleSize));
      console.log('Mean:', mean);
      console.log('Standard Deviation:', stdDev);
      console.log('T-Test:', tTest);
    } else {
      alert('Error in calculation: mean or standard deviation is not a number');
    }

    const data = {
      title: formData.get('title'),
      researchQuestion: formData.get('researchQuestion'),
      studyDesign: formData.get('studyDesign'),
      sampleSize: sampleSize,
      demographics: formData.get('demographics'),
      primaryOutcome: primaryOutcome,
      secondaryOutcome: formData.get('secondaryOutcome'),
      statisticalTests: formData.get('statisticalTests'),
      dataAnalysisSoftware: formData.get('dataAnalysisSoftware'),
      ethicalConsiderationsInformedConsent: formData.get('ethicalConsiderations') === 'Informed Consent',
      ethicalConsiderationsConfidentiality: formData.get('ethicalConsiderations') === 'Confidentiality',
      ethicalConsiderationsDebriefing: formData.get('ethicalConsiderations') === 'Debriefing',
      additionalNotes: formData.get('additionalNotes'),
      research_ID: parseInt(research_ID ?? '0', 10)
    };

    try {
      const response = await axios.post("http://localhost:3000/api/analysis", data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        console.log('Analysis recorded successfully:', response.data);
        setAnalysisData(response.data);
        setShowAnalysisResult(true);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error recording analysis:', error);
    }
  };

  return (
    <AnalystWrapper>
      <div className="dashboard-container">
        <h1>{researchDetails.topic}</h1>
        <p>{researchDetails.abstract}</p>
        <div className="form-container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/analystbg.PNG)` }}>
          <form className="toolsForm" onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="col-md-6">
              <label className="form-label" htmlFor="title">Title:</label>
              <input className="form-control" type="text" id="title" name="title"/>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="researchQuestion">Research Question:</label>
              <input className="form-control" type="text" id="researchQuestion" name="researchQuestion"/>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="studyDesign">Study Design:</label>
              <select className="form-select" id="studyDesign" name="studyDesign">
                <option value="">Select study design...</option>
                <option value="Cross-sectional">Cross-sectional</option>
                <option value="Longitudinal">Longitudinal</option>
                <option value="Experimental">Experimental</option>
                <option value="Observational">Observational</option>
                <option value="Qualitative">Qualitative</option>
                <option value="Mixed Methods">Mixed Methods</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="sampleSize">Sample Size:</label>
              <input className="form-control" type="number" id="sampleSize" name="sampleSize"/>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="demographics">Demographics:</label>
              <input className="form-control" type="text" id="demographics" name="demographics"/>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="primaryOutcome">Primary Outcome Measures:</label>
              <input className="form-control" type="text" id="primaryOutcome" name="primaryOutcome" placeholder="Enter comma-separated values"/>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="secondaryOutcome">Secondary Outcome Measures:</label>
              <input className="form-control" type="text" id="secondaryOutcome" name="secondaryOutcome"/>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="statisticalTests">Statistical Tests:</label>
              <input className="form-control" type="text" id="statisticalTests" name="statisticalTests"/>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="dataAnalysisSoftware">Data Analysis Software:</label>
              <input className="form-control" type="text" id="dataAnalysisSoftware" name="dataAnalysisSoftware"/>
            </div>
            
            <div className="checkbox-area">
              <div className="labl-inp">
                <input type="checkbox" id="ethicalConsiderations" name="ethicalConsiderations" value="Informed Consent"/>
                <label className="form-label" htmlFor="ethicalConsiderations">Ethical Considerations</label>
              </div>
              <div className="labl-inp">
                <input type="checkbox" id="ethicalConsiderations" name="ethicalConsiderations" value="Confidentiality"/>
                <label className="form-label" htmlFor="ethicalConsiderations">Informed Consent</label>
              </div>
              <div className="labl-inp">
                <input type="checkbox" id="ethicalConsiderations" name="ethicalConsiderations" value="Debriefing"/>
                <label className="form-label" htmlFor="ethicalConsiderations">Confidentiality</label>
              </div>
              <div className="labl-inp"><label className="form-label" htmlFor="ethicalConsiderations">Debriefing</label></div>
              
              <label className="form-label" htmlFor="additionalNotes">Additional Notes:</label>
              <textarea id="additionalNotes" name="additionalNotes"></textarea>
            </div>
           
            <button type="submit">Submit</button>
          </form>
          {showAnalysisResult && analysisData && (
            <AnalysisResults analysis={analysisData} />
          )}
        </div>
      </div>
    </AnalystWrapper>
  );
}

export default Tools;
