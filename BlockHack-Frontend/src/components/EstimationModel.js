import React from 'react'
import "./EstimationModel.css"

const EstimationModel = ({ estimation, onAccept, onReject }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Cost Estimation</h2>
                <p>Estimated Cost: ${estimation}</p>
                <div className="button-wrapper">
                    <button  className="modal-button modal-button-accept" onClick={onAccept}>Accept</button>
                    <button  className="modal-button modal-button-reject"onClick={onReject}>Reject</button>
                </div>
            </div>
        </div>
    );
}

export default EstimationModel