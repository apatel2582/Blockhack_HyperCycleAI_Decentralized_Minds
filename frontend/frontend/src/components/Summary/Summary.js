import React, { useState } from "react";
import axios from "axios";
import "./Summary.css";

function Summary({
  contractDetails,
  onSummaryGenerated,
  onRequestAnalysis,
  isLoading,
}) {
  const [isEstimatingCost, setIsEstimatingCost] = useState(false);

  const getSummaryEstimatedCost = async () => {
    setIsEstimatingCost(true);
    try {
      const response = await axios.post(
        "/summary/estimate-cost",
        contractDetails
      );

      if (response.data && response.data.estimatedCost) {
        onRequestAnalysis(response.data.estimatedCost, {
          endpoint: "/summary",
          label: "Summary",
        });
      } else {
        alert("Failed to estimate the cost.");
      }
    } catch (error) {
      alert(
        `Error: ${error.response ? error.response.data.error : error.message}`
      );
    } finally {
      setIsEstimatingCost(false);
    }
  };

  return (
    <div className="summary-section">
      <h2>Step 2: Get Generalized Summary</h2>
      <button
        className="btn btn-primary"
        onClick={getSummaryEstimatedCost}
        disabled={isLoading || isEstimatingCost}
      >
        {isEstimatingCost ? "Estimating Cost..." : "Get Summary"}
      </button>
    </div>
  );
}

export default Summary;
