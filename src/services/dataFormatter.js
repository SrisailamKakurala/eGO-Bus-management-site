// src/services/dataFormatter.js

export const formatData = (data) => {
  const schools = {};

  data.forEach((row) => {
    const {
      schoolID = "UnknownSchool",
      schoolName = "Unnamed School",
      address = "No Address",
      busID = "UnknownBus",
      busNo = 0,
      driverName = "No Driver",
      driverMobile = "0000000000",
      tripID = "UnknownTrip",
      tripActiveStatus = "false",
      studentID = "UnknownStudent",
      studentName = "No Name",
      standard = "Unknown",
      rollNo = 0,
      parentName = "No Parent",
      parentMobile = "0000000000",
      lat = "0",
      long = "0",
    } = row;

    // Ensure parentNotification is under the schoolID root level
    if (!schools[schoolID]) {
      schools[schoolID] = {
        schoolName,
        address,
        noOfBuses: 0, // We'll calculate this automatically
        buses: {},
        parentNotification: {
          msg: "notification to all parents"
        },  
        sos: {
          driverName: "No Driver",
          msg: "No message",
        },
      };
    }

    // Increment number of buses
    if (!schools[schoolID].buses[busID]) {
      schools[schoolID].noOfBuses += 1;
      schools[schoolID].buses[busID] = {
        busNo,
        driverName,
        driverMobile,
        managementNotification: "",  // New field
        driverNotification: "",  // New field
        trips: {},
      };
    }

    if (!schools[schoolID].buses[busID].trips[tripID]) {
      schools[schoolID].buses[busID].trips[tripID] = {
        parentNotification: "",  // Add parentNotification at the trip level
        missingItemNotification: { image: "", msg: "" },  // New field
        students: {},
        tripActiveStatus,
      };
    }

    schools[schoolID].buses[busID].trips[tripID].students[studentID] = {
      studentName,
      standard,
      rollNo,
      parentName,
      parentMobile,
      profilePic: "",
      lat,
      long,
      attendance: [],
      present: true,
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
