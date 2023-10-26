import React from "react";
import "./ConfirmationDialog.css";

function ConfirmationDialog({ show, estimatedCost, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-dialog">
        <h4>Confirmation</h4>
        <p>
          You're about to initiate an analysis that will cost approximately: $
          {estimatedCost}. Do you wish to proceed?
        </p>
        <div className="confirmation-buttons">
          <button className="btn btn-confirm" onClick={onConfirm}>
            Confirm
          </button>
          <button className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
