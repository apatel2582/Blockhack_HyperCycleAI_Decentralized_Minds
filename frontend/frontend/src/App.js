import React, { useState } from "react";
import axios from "axios";
import "./axiosConfig";
import FileUpload from "./components/FileUpload/FileUpload";
import ExtractDetails from "./components/ExtractDetails/ExtractDetails";
import Summary from "./components/Summary/Summary";
import DetailedAnalysisButtons from "./components/DetailedAnalysisButtons/DetailedAnalysisButtons";
import ConfirmationDialog from "./components/ConfirmationDialog/ConfirmationDialog";
import AnalysisResult from "./components/AnalysisResult/AnalysisResult"; // New import
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedDetails, setExtractedDetails] = useState(null);
  const [summary, setSummary] = useState(null);
  const [detailedAnalysis, setDetailedAnalysis] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRequestAnalysis, setCurrentRequestAnalysis] = useState(null);
  const [analysisType, setAnalysisType] = useState(null); // New state variable

  const extractDetailsAutomatically = async (fileURL) => {
    try {
      const response = await axios.post("http://localhost:3000/files/extract", {
        filePath: fileURL,
      });
      if (response.data && response.data.extractedDetails) {
        setExtractedDetails(response.data.extractedDetails);
      } else {
        alert("Failed to extract details from file.");
      }
    } catch (error) {
      alert(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  const handleAnalysisRequest = (estimatedCost, analysis) => {
    setEstimatedCost(estimatedCost);
    setCurrentRequestAnalysis(analysis); // Store the entire analysis object
    setShowConfirmationDialog(true);
  };

  const handleConfirmation = (isConfirmed) => {
    setShowConfirmationDialog(false);
    if (isConfirmed) {
      fetchAnalysis(); // Fetch the analysis (either summary or detailed) when user confirms.
    }
    // setCurrentRequestAnalysis(null); // Reset the stored analysis object
  };

  const fetchAnalysis = async () => {
    if (!currentRequestAnalysis) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        currentRequestAnalysis.endpoint,
        extractedDetails
      );
      if (response.data) {
        if (currentRequestAnalysis.endpoint === "/summary") {
          setSummary(response.data.summary.analysis); // Updated this line
        } else {
          setDetailedAnalysis(response.data.analysis);
        }
      } else {
        alert("Failed to get the analysis result.");
      }
    } catch (error) {
      alert(
        `Error: ${error.response ? error.response.data.error : error.message}`
      );
    } finally {
      setIsLoading(false);
      setCurrentRequestAnalysis(null); // Reset the stored analysis object here.
    }
  };

  const handleAnalysisButtonClick = (analysis) => {
    setAnalysisType(analysis);
    handleAnalysisRequest(estimatedCost, analysis); // existing logic
  };

  return (
    <div className="App container mt-5">
      <h1 className="mb-4">AI audited Smart Contracts</h1>
      <FileUpload
        onFileUploaded={setUploadedFile}
        onFileUploadSuccess={extractDetailsAutomatically}
      />
      {uploadedFile && !extractedDetails && (
        <ExtractDetails
          file={uploadedFile}
          onDetailsExtracted={setExtractedDetails}
        />
      )}
      {extractedDetails && !summary && (
        <Summary
          contractDetails={extractedDetails}
          onSummaryGenerated={setSummary}
          onRequestAnalysis={handleAnalysisRequest}
          isLoading={isLoading}
        />
      )}
      {summary && (
        <div>
          <h2 className="mt-4">Summary</h2>
          <pre className="formatted-text2">{summary}</pre>
          <DetailedAnalysisButtons
            contractDetails={extractedDetails}
            onAnalysisButtonClick={handleAnalysisButtonClick} // New prop
            onRequestAnalysis={handleAnalysisRequest}
            isLoading={isLoading}
          />
        </div>
      )}
      {/* New Analysis Result component */}
      <AnalysisResult
        analysisType={analysisType}
        detailedAnalysis={detailedAnalysis}
      />
      {showConfirmationDialog && (
        <ConfirmationDialog
          show={showConfirmationDialog}
          estimatedCost={estimatedCost}
          onConfirm={() => handleConfirmation(true)}
          onCancel={() => handleConfirmation(false)}
        />
      )}
    </div>
  );
}

export default App;
