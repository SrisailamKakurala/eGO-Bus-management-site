import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import * as XLSX from "xlsx";
import { app } from "../../configs/firebase.config";

const Upload = () => {
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");

  const formatData = (data) => {
    const schools = {};
    data.forEach((row) => {
      const {
        schoolID = "UnknownSchool",
        schoolName = "Unnamed School",
        address = "No Address",
        noOfBuses = 0,
        busID = "UnknownBus",
        busNo = 0,
        driverName = "No Driver",
        driverMobile = "0000000000",
        tripID = "UnknownTrip",
        studentID = "UnknownStudent",
        studentName = "No Name",
        standard = "Unknown",
        rollNo = 0,
        parentName = "No Parent",
        parentMobile = "0000000000",
        lat = "0",
        long = "0",
      } = row;

      if (!schools[schoolID]) {
        schools[schoolID] = {
          schoolName,
          address,
          noOfBuses: noOfBuses || 0,
          buses: {},
        };
      }

      if (!schools[schoolID].buses[busID]) {
        schools[schoolID].buses[busID] = {
          busNo,
          driverName,
          driverMobile,
          trips: {},
        };
      }

      if (!schools[schoolID].buses[busID].trips[tripID]) {
        schools[schoolID].buses[busID].trips[tripID] = { students: {} };
      }

      schools[schoolID].buses[busID].trips[tripID].students[studentID] = {
        studentName,
        standard,
        rollNo,
        parentName,
        parentMobile,
      };
    });
    return schools;
  };

  const validateData = (data) => {
    const isValid = JSON.stringify(data).indexOf("undefined") === -1;
    if (!isValid) throw new Error("Data contains undefined values!");
  };

  const uploadToFirebase = async (formattedData) => {
    try {
      validateData(formattedData);
      setUploadStatus("Uploading...");
      const db = getDatabase(app);
      await set(ref(db, "schools"), formattedData);
      setUploadStatus("Upload Successful!");
    } catch (error) {
      setUploadStatus("Upload Failed");
      setError(error.message);
    }
  };

  const handleFileUpload = async (event) => {
    setProgress(0);
    setError("");
    setUploadStatus("");

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

        const formattedData = formatData(sheetData);
        setProgress(80);
        uploadToFirebase(formattedData);

        setProgress(100);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      setError("Error processing file");
    }
  };

  return (
    <div className="h-auto p-6 bg-white rounded-lg shadow-md">

      <h1 className="text-4xl font-bold text-[#FCD32D]">Upload Data</h1>
      <hr className="border-t-1 border-gray-300 my-4" />

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
          className="bg-[#FCD32D] font-semibold text-white py-3 px-4  rounded-lg hover:bg-yellow-400 transition duration-300"
        >
          Download Sample File
        </a>
      </div>

      <hr className="mt-12" />



      {/* uploading file */}
      <p className="text-slate-600 mb-5 mt-8">
        Please upload your Excel (.xlsx) file containing school data.{" "}
        <span className="text-black font-medium">
          Ensure all fields are properly filled.
        </span>
      </p>

      {/* File Upload */}
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

      {/* Upload Status */}
      {uploadStatus && (
        <p className="mt-2 text-lg font-semibold text-green-500">
          {uploadStatus}
        </p>
      )}
      {error && <p className="mt-2 text-red-500">Error: {error}</p>}




    </div>
  );
};

export default Upload;
