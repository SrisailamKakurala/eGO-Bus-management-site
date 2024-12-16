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
      pickupPointID = "UnknownPickupPoint",
      lat,
      long,
      pickupTime = "00:00",
      studentID = "UnknownStudent",
      studentName = "No Name",
      standard = "Unknown",
      rollNo = 0,
      parentName = "No Parent",
      parentMobile = "0000000000",
    } = row;

    // Debugging logs
    console.log(`Row Data: ${JSON.stringify(row)}`);
    console.log(`Lat: ${lat}, Long: ${long}`);

    // Ensure lat and long are valid before forming pickupLocation
    const pickupLocation =
      (lat && long && `${lat},${long}`) || "0,0";

    console.log(`PickupLocation: ${pickupLocation}`);

    // Ensure school-level structure
    if (!schools[schoolID]) {
      schools[schoolID] = {
        schoolName,
        address,
        schoolLocation: "",
        noOfBuses: 0,
        buses: {},
        parentNotification: {
          msg: "notification to all parents",
        },
        sos: {
          driverName: "No Driver",
          msg: "No message",
        },
        missingItemsFound: {},
        missingItemsReturned: {},
        studentsPresent: 0,
        studentsAbsent: 0,
        totalSosMsgs: 0,
        totalNotificationsSent: 0,
      };
    }

    // Ensure bus-level structure
    if (!schools[schoolID].buses[busID]) {
      schools[schoolID].noOfBuses += 1;
      schools[schoolID].buses[busID] = {
        busNo,
        driverName,
        driverMobile,
        managementNotification: "",
        driverNotification: "",
        missingItemNotification: {},
        trips: {},
      };
    }

    // Ensure trip-level structure
    const currentBus = schools[schoolID].buses[busID];
    if (!currentBus.trips[tripID]) {
      currentBus.trips[tripID] = {
        tripActiveStatus,
        parentNotification: "",
        pickupPoints: [],
        students: {}, // For all students under the trip
      };
    }

    const currentTrip = currentBus.trips[tripID];

    // Ensure pickup point exists for the trip
    let pickupPoint = currentTrip.pickupPoints.find(
      (point) => point.pickupPointID === pickupPointID
    );

    if (!pickupPoint) {
      pickupPoint = {
        pickupPointID,
        pickupLocation,
        pickupTime,
        students: [],
      };
      currentTrip.pickupPoints.push(pickupPoint);
    }

    // Add student to the pickup point
    pickupPoint.students.push({
      studentID,
      deviceToken: "", // Placeholder for device token
    });

    // Add student to the trip's `students` object (deduplicated by studentID)
    if (!currentTrip.students[studentID]) {
      currentTrip.students[studentID] = {
        studentName,
        standard,
        rollNo,
        parentName,
        parentMobile,
        pickupPointID,
        pickupLocation,
        pickupTime,
        attendance: []
      };
    }
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
