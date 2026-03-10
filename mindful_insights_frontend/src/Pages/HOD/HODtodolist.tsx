import React, { useState, useEffect } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from "jspdf-autotable";
import { useAuth } from "../../AuthContext";


const HODTodolist: React.FC = () => {
    const [researchDetails, setResearchDetails] = useState<{ topic: string; abstract: string }[]>([]);
    const { accessToken } = useAuth();

    useEffect(() => {
        const fetchResearchDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/research`, {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            });
            if (response.status === 200) {
              setResearchDetails(response.data.data); // Update the state with the fetched data
            } else {
              console.error('Error fetching research details:', response.status);
            }
          } catch (error) {
            console.error('Error fetching research details:', error);
          }
        };
      
        fetchResearchDetails();
      }, [accessToken]);

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
      
          // Adjust Y position for the table
          let startY = 50;
      
          // Prepare the table content
          const tableContent = researchDetails.map((research, index) => [
            index + 1,
            research.topic || "N/A",
            research.abstract || "N/A",
          ]);
      
          // Draw the table
          autoTable(doc, {
            startY,
            head: [['Research', 'Topic', 'Abstract']],
            body: tableContent,
            theme: 'striped',
            headStyles: { fillColor: [0, 116, 204] },
            alternateRowStyles: { fillColor: [240, 240, 240] },
          });
      
          doc.save('research_report.pdf');
        };
      };
  return (
    <div className="tasks-container">
    <div className="todo-container">
        <div className="list-group">
            <label className="list-group-item">
            <input className="form-check-input flex-shrink-0" type="checkbox" value="" checked style={{fontSize:'1.35rem'}} />
            <span className="pt-1 form-checked-content">
                <strong>Finish sales report</strong>
                <small className="text-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3-event" viewBox="0 0 16 16" style={{width: "20px", height: "20px"}}>
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
                <path d="M12 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg>
                1:00–2:00pm
                </small>
            </span>
            </label>
            <label className="list-group-item">
            <input className="form-check-input flex-shrink-0" type="checkbox" value="" style={{fontSize: "1.375em"}}/>
            <span className="pt-1 form-checked-content">
                <strong>Weekly All Hands</strong>
                <small className="text-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3-event" viewBox="0 0 16 16" style={{width: "20px", height: "20px"}}>
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
                <path d="M12 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg>
                2:00–2:30pm
                </small>
            </span>
            </label>
            <label className="list-group-item">
            <input className="form-check-input flex-shrink-0" type="checkbox" value="" style={{fontSize: "1.375em"}}/>
            <span className="pt-1 form-checked-content">
                <strong>Out of office</strong>
                <small className="text-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-alarm" viewBox="0 0 16 16" style={{width: "20px", height: "20px"}}>
                <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
                <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
                </svg>
                Tomorrow
                </small>
            </span>
            </label>
            <label className="list-group-item">
            <input className="form-check-input flex-shrink-0" type="checkbox" value="" style={{fontSize: "1.375em"}}/>
            <span className="pt-1 form-checked-content">
                <strong>Weekly All Hands</strong>
                <small className="text-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3-event" viewBox="0 0 16 16" style={{width: "20px", height: "20px"}}>
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
                <path d="M12 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg>
                2:00–2:30pm
                </small>
            </span>
            </label>
            <label className="list-group-item">
            <input className="form-check-input flex-shrink-0" type="checkbox" value="" style={{fontSize: "1.375em"}}/>
            <span className="pt-1 form-checked-content">
                <strong>Weekly All Hands</strong>
                <small className="text-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3-event" viewBox="0 0 16 16" style={{width: "20px", height: "20px"}}>
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
                <path d="M12 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg>
                2:00–2:30pm
                </small>
            </span>
            </label>
            <label className="list-group-item bg-body-tertiary">
            <input className="form-check-input form-check-input-placeholder bg-body-tertiary flex-shrink-0 pe-none" disabled type="checkbox" value="" style={{fontSize: "1.375em"}}/>
            <span className="pt-1 form-checked-content">
                <span contentEditable="true" className="w-100">Add new task...</span>
                <small className="text-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list-check" viewBox="0 0 16 16" style={{width: "20px", height: "20px"}}>
                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
                </svg>
                Choose list...
                </small>
            </span>
            </label>
        </div>
    </div>

    <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary word-goup" style={{width: "380px"}}>
        <a href="/" className="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
        <svg className="bi pe-none me-2" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
        <span className="fs-5 fw-semibold">List group</span>
        </a>
        <div className="list-group list-group-flush border-bottom scrollarea" style={{ backgroundColor: "#0074CC"}}>
        <a href="#" className="list-group-item list-group-item-action active py-3 lh-sm" aria-current="true">
            <div className="d-flex w-100 align-items-center justify-content-between">
            <strong className="mb-1">Total Research</strong>
            <small>Wed</small>
            </div>
            <div className="col-10 mb-1 small">Click below to download a report of all research carried out in the system </div>
            <div className='col-10 mb-1'><button type="button" className="btn btn-primary" onClick={downloadPDF}>Download Report</button></div>
        </a>
        <a href="#" className="list-group-item list-group-item-action py-3 lh-sm">
            <div className="d-flex w-100 align-items-center justify-content-between">
            <strong className="mb-1">List group item heading</strong>
            <small className="text-body-secondary">Tues</small>
            </div>
            <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
        </a>
        <a href="#" className="list-group-item list-group-item-action py-3 lh-sm">
            <div className="d-flex w-100 align-items-center justify-content-between">
            <strong className="mb-1">List group item heading</strong>
            <small className="text-body-secondary">Mon</small>
            </div>
            <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
        </a>
        </div>
    </div>

    <div className="modal-content rounded-4 shadow">
      <div className="modal-body p-5">
        <h2 className="fw-bold mb-0">What's new</h2>

        <ul className="d-grid gap-4 my-5 list-unstyled small">
          <li className="d-flex gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-fill" viewBox="0 0 16 16" style={{ color: "#0074CC"}}>
            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z"/>
          </svg>
            <div>
              <h5 className="mb-0">Grid view</h5>
              Not into lists? Try the new grid view.
            </div>
          </li>
          <li className="d-flex gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-star-fill" viewBox="0 0 16 16" style={{ color: "#F8BD00"}}>
            <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5M8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.18.18 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.18.18 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.18.18 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.18.18 0 0 1-.134-.098z"/>
          </svg>
            <div>
              <h5 className="mb-0">Bookmarks</h5>
              Save items you love for easy access later.
            </div>
          </li>
          <li className="d-flex gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-reels-fill" viewBox="0 0 16 16" style={{ color: "#319F43"}}>
            <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
            <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
          </svg>
            <div>
              <h5 className="mb-0">Video embeds</h5>
              Share videos wherever you go.
            </div>
          </li>
        </ul>
        <button type="button" className="btn btn-lg btn-primary mt-5 w-100" data-bs-dismiss="modal" style={{ backgroundColor: "#0074CC"}}>Great, thanks!</button>
      </div>
    </div>

    </div>
  )
}

export default HODTodolist