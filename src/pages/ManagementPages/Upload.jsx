import React, { useState } from "react";
import * as XLSX from "xlsx";
import { formatData, validateData } from "../../services/dataFormatter";
import { uploadToFirebase } from "../../services/uploadService";

const Upload = ({ setTrigger }) => {
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");
  const [formattedData, setFormattedData] = useState(null);

  const handleFileUpload = async (event) => {
    setProgress(0);
    setError("");
    setUploadStatus("");
    setFormattedData(null);

    const file = event.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        setProgress(50);

        // Validate and Format Data
        validateData(sheetData);
        const formatted = formatData(sheetData);

        setFormattedData(formatted); // Store formatted data for upload
        setProgress(100);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      setError("Error processing file: " + error.message);
    }
  };

  const confirmUpload = async () => {
    if (!formattedData) {
      setError("No data available to upload");
      return;
    }

    try {
      setUploadStatus("Uploading...");
      const result = await uploadToFirebase(formattedData);

      const { schoolID } = result;

      if (schoolID) {
        localStorage.setItem("schoolID", schoolID);
        setTrigger((prev) => !prev); // Trigger re-fetch in Management Layout
        setUploadStatus("Upload Successful");
      } else {
        throw new Error("schoolID not found in upload result");
      }
    } catch (error) {
      setUploadStatus("Upload Failed");
      setError(error.message);
    }
  };



  return (
    <div className="h-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-[#FCD32D]">Upload Data</h1>
      <hr className="border-t-1 border-gray-300 my-5" />

      {/* Download Sample File */}
      <div className="mt-4 mb-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Download Sample Excel Sheet
        </h2>
        <p className="text-gray-600 mb-8">
          Click below to download a sample Excel file to use as a reference for
          uploading data.
        </p>
        <a
          href="/eGO_Bus_Flat_Structure.xlsx"
          download
          className="bg-[#FCD32D] font-semibold text-white py-3 px-4 rounded-lg hover:bg-yellow-400 transition duration-300"
        >
          Download Sample File
        </a>
      </div>

      <hr className="mt-12" />

      {/* Upload File Section */}
      <p className="text-slate-600 mb-5 mt-5">
        Please upload your Excel (.xlsx) file containing school data.{" "}
        <span className="text-black font-medium">
          Ensure all fields are properly filled.
        </span>
      </p>

      <div className="mb-6">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCD32D]"
        />
      </div>

      {/* Progress Indicator */}
      <div className="mb-4">
        <progress
          value={progress}
          max="100"
          className="w-full h-4 rounded-lg overflow-hidden"
          style={{ backgroundColor: "#F5F5F5" }}
        ></progress>
        {progress > 0 && (
          <p className="mt-2 text-gray-600">Progress: {progress}%</p>
        )}
      </div>

      {/* Confirm and Upload Button */}
      {formattedData && (
        <div className="mt-4">
          <button
            onClick={confirmUpload}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Confirm and Upload
          </button>
        </div>
      )}

      {/* Upload Status */}
      {uploadStatus && (
        <p className="mt-2 text-lg font-semibold text-green-500 ">
          {uploadStatus}
        </p>
      )}
      {error && <p className="mt-2 text-red-500">Error: {error}</p>}
    </div>
  );
};

export default Upload;
