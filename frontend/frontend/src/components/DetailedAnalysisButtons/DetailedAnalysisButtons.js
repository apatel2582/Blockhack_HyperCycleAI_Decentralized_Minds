import React, { useState } from "react";
import axios from "axios";
import "./DetailedAnalysisButtons.css";

const analysisEndpoints = [
  { endpoint: "/analysis/solidity-version", label: "Solidity Version" },
  { endpoint: "/analysis/contract-type", label: "Contract Type" },
  { endpoint: "/analysis/contract-details", label: "Contract Details" },
  { endpoint: "/analysis/function-details", label: "Function Details" },
  { endpoint: "/analysis/token-handling", label: "Token Handling" },
  { endpoint: "/analysis/interactions", label: "Interactions" },
  { endpoint: "/analysis/vulnerabilities", label: "Vulnerabilities" },
  { endpoint: "/analysis/gas-efficiency", label: "Gas Efficiency" },
  { endpoint: "/analysis/hardcoded-addresses", label: "Hardcoded Addresses" },
];

function DetailedAnalysisButtons({
  contractDetails,
  onRequestAnalysis,
  onAnalysisButtonClick, // New prop
  isLoading,
}) {
  const [isEstimatingCost, setIsEstimatingCost] = useState(false);
  const [currentSelectedAnalysis, setCurrentSelectedAnalysis] = useState(null);

  const fetchAnalysisEstimatedCost = async (analysis) => {
    if (isLoading || isEstimatingCost) return;

    setIsEstimatingCost(true);
    setCurrentSelectedAnalysis(analysis.endpoint);
    try {
      const costResponse = await axios.post("/analysis/estimate-cost", {
        type: analysis.endpoint.split("/").pop(),
      });

      if (costResponse.data && costResponse.data.estimatedCost) {
        onRequestAnalysis(costResponse.data.estimatedCost, analysis);
      } else {
        alert("Failed to get the estimated cost.");
      }
    } catch (error) {
      alert(
        `Error: ${error.response ? error.response.data.error : error.message}`
      );
    } finally {
      setIsEstimatingCost(false);
      setCurrentSelectedAnalysis(null);
    }
    onAnalysisButtonClick(analysis); // New line
  };

  return (
    <div className="analysis-section">
      <h3 className="button-list">Detailed Analysis</h3>
      <div className="analysis-section2">
        {analysisEndpoints.map((analysis, index) => (
          <button
            key={index}
            className="btn btn-analysis"
            onClick={() => fetchAnalysisEstimatedCost(analysis)}
            disabled={
              isLoading ||
              (isEstimatingCost &&
                currentSelectedAnalysis === analysis.endpoint)
            }
          >
            {isEstimatingCost && currentSelectedAnalysis === analysis.endpoint
              ? "Estimating Cost..."
              : analysis.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DetailedAnalysisButtons;
