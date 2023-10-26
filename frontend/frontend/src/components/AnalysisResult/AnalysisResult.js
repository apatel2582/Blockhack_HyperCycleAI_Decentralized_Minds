import React from "react";

function AnalysisResult({ analysisType, detailedAnalysis }) {
  if (!analysisType || !detailedAnalysis) return null;

  return (
    <div>
      <h2 className="mt-4">Detailed Analysis - {analysisType.label}</h2>
      <pre className="formatted-text3">{detailedAnalysis}</pre>
    </div>
  );
}

export default AnalysisResult;
