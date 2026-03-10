import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import '../../css/Analyst.css';
import { useAuth } from "../../AuthContext";

interface AnalysisResultsProps {
    analysis: any;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
    const { research_ID } = useParams<{ research_ID: string }>();
    const [researchDetails, setResearchDetails] = useState<{ topic: string; abstract: string } | null>(null);
    const { accessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!research_ID) {
            console.error("Research ID is not defined.");
            navigate("/tasks");
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

    const downloadPDF = () => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(22);
        doc.text('Mindful Insights', 10, 20);

        // Load and add the logo image
        const imgSrc = `${process.env.PUBLIC_URL}/assets/images/image2.png`;
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => {
            doc.addImage(img, 'PNG', 160, 10, 30, 30); // Adjust the position and size as needed

            // Adjust Y position for the first table based on whether research details are present
            const firstTableY = 50;

            // Prepare research table content if research details are available
            const researchTableContent = researchDetails
                ? [
                    ["Topic", researchDetails.topic],
                    ["Abstract", researchDetails.abstract],
                ]
                : [];

            // Define the analysis table content
            const analysisTableContent = [
                ["Title", analysis.title],
                ["Research Question", analysis.researchQuestion],
                ["Study Design", analysis.studyDesign],
                ["Sample Size", analysis.sampleSize],
                ["Demographics", analysis.demographics],
                ["Primary Outcome", analysis.primaryOutcome],
                ["Secondary Outcome", analysis.secondaryOutcome],
                ["Statistical Tests", analysis.statisticalTests],
                ["Data Analysis Software", analysis.dataAnalysisSoftware],
                ["Ethical Considerations (Informed Consent)", analysis.ethicalConsiderationsInformedConsent ? "Yes" : "No"],
                ["Ethical Considerations (Confidentiality)", analysis.ethicalConsiderationsConfidentiality ? "Yes" : "No"],
                ["Ethical Considerations (Debriefing)", analysis.ethicalConsiderationsDebriefing ? "Yes" : "No"],
                ["Additional Notes", analysis.additionalNotes],
            ];

            // Prepare the result table content
            const resultTableContent = [
                ["Mean", analysis.mean],
                ["Standard Deviation", analysis.standardDeviation],
                ["T-Test", analysis.tTest],
            ];

            // Draw the first table (research details if available, otherwise analysis table)
            autoTable(doc, {
                startY: firstTableY,
                head: researchDetails ? [['Field', 'Value']] : [['Metric', 'Value']],
                body: researchDetails ? researchTableContent : analysisTableContent,
                theme: 'striped',
                headStyles: { fillColor: [0, 116, 204] },
                alternateRowStyles: { fillColor: [240, 240, 240] },
                didDrawPage: (data) => {
                    const finalY = data.cursor?.y || firstTableY;

                    // Add the second table
                    autoTable(doc, {
                        startY: finalY + 10,
                        head: researchDetails ? [['Field', 'Value']] : [['Metric', 'Value']],
                        body: researchDetails ? analysisTableContent : resultTableContent,
                        theme: 'striped',
                        headStyles: { fillColor: [0, 116, 204] },
                        alternateRowStyles: { fillColor: [240, 240, 240] },
                        didDrawPage: (data2) => {
                            const finalY2 = data2.cursor?.y || finalY + 10;

                            // Add the third table (if research details are available)
                            if (researchDetails) {
                                autoTable(doc, {
                                    startY: finalY2 + 10,
                                    head: [['Metric', 'Value']],
                                    body: resultTableContent,
                                    theme: 'striped',
                                    headStyles: { fillColor: [0, 116, 204] },
                                    alternateRowStyles: { fillColor: [240, 240, 240] },
                                });
                            }

                            doc.save('analysis_report.pdf');
                        }
                    });
                }
            });
        };
    };

    return (
        <div className="analysis-results">
            <h2>Analysis Results</h2>
            <div className="analysisCard">
                <p className="col-md-12"><strong>Title:</strong> {analysis.title}</p>
                <p className="col-md-12"><strong>Research Question:</strong> {analysis.researchQuestion}</p>
                <p className="col-md-12"><strong>Study Design:</strong> {analysis.studyDesign}</p>
                <p className="col-md-12"><strong>Sample Size:</strong> {analysis.sampleSize}</p>
                <p className="col-md-12"><strong>Demographics:</strong> {analysis.demographics}</p>
                <p className="col-md-12"><strong>Primary Outcome:</strong> {analysis.primaryOutcome}</p>
                <p className="col-md-12"><strong>Secondary Outcome:</strong> {analysis.secondaryOutcome}</p>
                <p className="col-md-12"><strong>Statistical Tests:</strong> {analysis.statisticalTests}</p>
                <p className="col-md-12"><strong>Data Analysis Software:</strong> {analysis.dataAnalysisSoftware}</p>
                <p className="col-md-12"><strong>Ethical Considerations (Informed Consent):</strong> {analysis.ethicalConsiderationsInformedConsent ? "Yes" : "No"}</p>
                <p className="col-md-12"><strong>Ethical Considerations (Confidentiality):</strong> {analysis.ethicalConsiderationsConfidentiality ? "Yes" : "No"}</p>
                <p className="col-md-12"><strong>Ethical Considerations (Debriefing):</strong> {analysis.ethicalConsiderationsDebriefing ? "Yes" : "No"}</p>
                <p className="col-md-12"><strong>Additional Notes:</strong> {analysis.additionalNotes}</p>
                <div className="card mb-4 rounded-3 shadow-sm">
                    <div className="card-header py-3 text-color-bg">
                        <h4 className="my-0 fw-normal">Analysis Results</h4>
                    </div>
                    <div className="card-body">
                        <ul className="list-unstyled mt-3 mb-4">
                            <li><h1>Mean: <small>{analysis.mean}</small></h1></li>
                            <li><h1>Standard Deviation: <small>{analysis.standardDeviation}</small></h1></li>
                            <li><h1>T-Test: <small>{analysis.tTest}</small></h1></li>
                        </ul>
                        <button type="button" className="w-100 btn btn-lg text-color-bg" onClick={downloadPDF}>Download Report</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnalysisResults;
