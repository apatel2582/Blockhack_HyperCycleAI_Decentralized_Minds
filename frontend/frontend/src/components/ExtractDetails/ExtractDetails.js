import React from "react";
import axios from "axios";
import "./ExtractDetails.css";

function ExtractDetails({ filePath, onDetailsExtracted }) {
  const extractDetails = async () => {
    try {
      const response = await axios.post("http://localhost:3000/files/extract", {
        filePath,
      });

      if (response.data && response.data.extractedDetails) {
        onDetailsExtracted(response.data.extractedDetails);
      } else {
        alert("Failed to extract details from file.");
      }
    } catch (error) {
      alert(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  return (
    <div className="extract-details">
      <h3>Step 2: Extract Details from File</h3>
      <button className="btn btn-secondary" onClick={extractDetails}>
        Extract Details
      </button>
    </div>
  );
}

export default ExtractDetails;
