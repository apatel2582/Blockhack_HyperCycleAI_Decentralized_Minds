import React, { useRef } from "react";
import axios from "axios";
import "./FileUpload.css";

function FileUpload({ onFileUploaded, onFileUploadSuccess }) {
  const fileInputRef = useRef(null);

  const uploadFile = async () => {
    // Set the base URL for Axios
    axios.defaults.baseURL = "http://localhost:3000";

    const formData = new FormData();
    formData.append("contractFile", fileInputRef.current.files[0]);

    try {
      const response = await axios.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.filePath) {
        onFileUploaded(response.data.filePath);
        // Extract the file name from the filePath
        const fileName = response.data.filePath.split("/").pop();

        // Form the URL to access the file
        // const fileURL = `http://localhost:3000/uploads/${fileName}`;
        const fileRelativePath = `/${fileName}`;

        // Automatically trigger the extraction process with the file's URL
        onFileUploadSuccess(fileRelativePath);
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      alert(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  return (
    <div className="file-upload">
      <h2>Step 1: Upload your .sol file & Exract Data Automatically</h2>
      <div className="mb-3">
        <input type="file" ref={fileInputRef} accept=".sol" />
      </div>
      <button className="btn btn-primary" onClick={uploadFile}>
        Upload
      </button>
    </div>
  );
}

export default FileUpload;
