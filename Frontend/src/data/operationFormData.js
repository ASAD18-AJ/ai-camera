export const operationForms = {
  "Vehicle Search": [
    {
      name: "vehicleColor",
      label: "Color",
      type: "select",
      rules: { required: "Color is required" },
      options: [
        { value: "red", label: "Red" },
        { value: "blue", label: "Blue" },
        { value: "green", label: "Green" },
        { value: "black", label: "Black" },
        { value: "white", label: "White" },
        { value: "yellow", label: "Yellow" },
        { value: "orange", label: "Orange" },
      ],
    },
    {
      name: "licenseNumber",
      label: "License Number",
      type: "text",
      rules: { required: "License Number is required" },
    },
    {
      name: "ownerName",
      label: "Owner Name",
      type: "text",
    },
    {
      name: "startTime",
      label: "Start Time",
      type: "datetime-local",
      rules: { required: "Start Time is required" },
    },
    {
      name: "endTime",
      label: "End Time",
      type: "datetime-local",
      rules: { required: "End Time is required" },
    },
  ],
  "Suspect Search": [
    {
      name: "suspectColor",
      label: "Color",
      type: "select",
      rules: { required: "Color is required" },
      options: [
        { value: "red", label: "Red" },
        { value: "blue", label: "Blue" },
        { value: "green", label: "Green" },
        { value: "black", label: "Black" },
        { value: "white", label: "White" },
        { value: "yellow", label: "Yellow" },
        { value: "orange", label: "Orange" },
      ],
    },
    {
      name: "suspectClass",
      label: "Class",
      type: "select",
      rules: { required: "Class is required" },
      options: [
        { value: "apache", label: "Apache" },
        { value: "auto", label: "Auto" },
        { value: "bike-rider", label: "Bike Rider" },
        { value: "bolero", label: "Bolero" },
        { value: "bullet", label: "Bullet" },
        { value: "bus", label: "Bus" },
        { value: "car", label: "Car" },
        { value: "child", label: "Child" },
        { value: "hatchback", label: "Hatchback" },
        { value: "helmet", label: "Helmet" },
        { value: "jcb", label: "JCB" },
        { value: "license-plate", label: "License Plate" },
        { value: "man", label: "Man" },
        { value: "motorbike", label: "Motorbike" },
        { value: "motorbike-rider", label: "Motorbike Rider" },
        { value: "no-helmet", label: "No Helmet" },
        { value: "omni", label: "Omni" },
        { value: "person", label: "Person" },
        { value: "pickup", label: "Pickup" },
        { value: "pulsar", label: "Pulsar" },
        { value: "scooty", label: "Scooty" },
        { value: "scooty-rider", label: "Scooty Rider" },
        { value: "scorpio", label: "Scorpio" },
        { value: "sedan", label: "Sedan" },
        { value: "suv", label: "SUV" },
        { value: "swift", label: "Swift" },
        { value: "thar", label: "Thar" },
        { value: "tractor", label: "Tractor" },
        { value: "truck", label: "Truck" },
        { value: "van", label: "Van" },
        { value: "woman", label: "Woman" },
      ],
    },
    {
      name: "passengerCount",
      label: "Number of Passengers",
      type: "number",
    },
    {
      name: "clothColor",
      label: "Cloth Color",
      type: "text",
    },
  ],
  "Restricted Vehicle": [
    {
      name: "class",
      label: "Class",
      type: "select",
      rules: { required: "Class is required" },
      options: [
        { value: "car", label: "Car" },
        { value: "bike", label: "Bike" },
        { value: "truck", label: "Truck" },
      ],
    },
    {
      name: "startTime",
      label: "Start Time",
      type: "datetime-local",
      rules: { required: "Start Time is required" },
    },
    {
      name: "endTime",
      label: "End Time",
      type: "datetime-local",
      rules: { required: "End Time is required" },
    },
  ],
  "Crowd Restriction": [
    {
      name: "threshold",
      label: "Threshold",
      type: "number",
      rules: { required: "Threshold is required" },
    },
    {
      name: "startTime",
      label: "Start Time",
      type: "datetime-local",
      rules: { required: "Start Time is required" },
    },
    {
      name: "endTime",
      label: "End Time",
      type: "datetime-local",
      rules: { required: "End Time is required" },
    },
  ],
};
