// src/services/dataFormatter.js

/**
 * Format raw Excel data into the required structure.
 * @param {Array} data - The raw data from Excel.
 * @returns {Object} - Formatted data structure.
 */
export const formatData = (data) => {
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
      lat,
      long,
    };
  });
  return schools;
};

/**
 * Validate data for missing required fields.
 * @param {Array} data - Raw data to validate.
 * @throws {Error} If validation fails.
 */
export const validateData = (data) => {
  if (!Array.isArray(data)) {
    throw new Error("Invalid data format. Expected an array.");
  }

  data.forEach((row, index) => {
    if (!row.schoolID || !row.busID || !row.studentID) {
      throw new Error(
        `Missing mandatory fields at row ${index + 1}: schoolID, busID, or studentID`
      );
    }
  });
};
