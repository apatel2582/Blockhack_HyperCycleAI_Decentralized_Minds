import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EstimationModel from './EstimationModel';
import axios from 'axios';
import "./Main.css";
const sampleData = require("../respExample.json");
const sampleEstimation = require("../respEstimationExample.json")
// import dotenv from 'dotenv';
// dotenv.config();



function Main({ onUpload, fileHandle, file }) {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [estimation, setEstimation] = useState(500);  // Example estimation value
  const [isLoading, setLoading] = useState(false);



  // let hasAccpeted = null;
  const handleAccept = async () => {
    setLoading(true);
    setModalOpen(false);
    try {
      console.log("file :-",file)
      const response = await fetch('http://localhost:3000/audit-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-confirmed': true
        },
        body: JSON.stringify({ contract: file })  // Sending the estimation value
      });


      if (!response.ok) {
        console.log("error while fetching the audit of th contract");
        throw new Error('Network response was not ok');
      }

      const resp = await response.json();
      
      // const response = sampleData

      // if (response.msg !== "Success") {
      //   throw new Error('Network response was not ok');
      // }

      // const responseData = await response.result.json();
      const responseData = resp
      console.log(responseData)
      if (responseData.msg === "Success") { // Check if the success flag is true in the response
        onUpload(responseData.result)
        navigate('/analysis');  // Redirect to the analysis page
      } else {
        // console.error(responseData.message);
        console.error("error resposne data ")
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }

    setLoading(false);

  };

  const handleReject = () => {
    console.log('Estimation Rejected');
    setModalOpen(false);
  };

  const handleFile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file)

    if (!file.name.endsWith('.sol')) {
      alert('Only .sol files are allowed!');
      e.target.value = null;
      return;
    }

    // Read file content
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileContent = event.target.result;
      console.log("file content ", fileContent)
      fileHandle(fileContent);
      try {
        setLoading(true);
        try {
          const response = await fetch('http://localhost:3000/audit-contract', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'cost_only': true
            },
            body: JSON.stringify({ contract: fileContent })
          });
          console.log("resp ", response);
          if (!response.ok) {
            console.log("error while fetch ");
            return;
          }
          const resp = await response.json();
          console.log("final resp ", resp);

          const costEstimation = resp;

          if (costEstimation.msg === "Success") {
            setEstimation(costEstimation.result.estimationCost);
            setModalOpen(true)
          } else {
            alert("Error while fetching cost estimation");
            return;
          }
        } catch (err) {
          console.log("error fetch ", err)
        }
        setLoading(false)

        // const data = await response.json();

      } catch (error) {
        console.error("Failed to analyze the contract:", error);
      }
    };

    reader.readAsText(file);
  };


  return (
    <div className="main-container">
      <h2>AI Smart Contract Auditor</h2>
      {isLoading ? <div className="loading-wrapper"><div className="loading-main">Loading...</div></div> : <input type="file" onChange={handleFile} />}

      {isModalOpen && (
        <EstimationModel
          estimation={estimation}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </div>
  );

  /**
   * <input type="file" onChange={handleFile} />
      {isLoading && <div className="loading-wrapper"><div className="loading-main">Loading...</div></div>} Show a loading message/spinner while waiting for response
   */
}

export default Main;