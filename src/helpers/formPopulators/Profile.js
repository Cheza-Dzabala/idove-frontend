import React from "react";

export const areaOfExpertise = () => {
  const areas = [
    { value: "default", label: "Select Areat of Expertise", key: 1 },
    { value: "PM", label: "Policy Maker", key: 2 },
    { value: "CW", label: "Community Worker", key: 3 },
    { value: "AR", label: "Acedemic / Researcher", key: 4 },
    { value: "CR", label: "Creative", key: 5 },
    { value: "OT", label: "Other", key: 6 },
  ];

  return areas;
};

export const genders = () => {
  const genders = [
    { label: "Select Gender", value: "default", key: 1 },
    { label: "Male", value: "M", key: 2 },
    { label: "Female", value: "F", key: 3 },
    { label: "NB", value: "NB", key: 4 },
  ];

  return genders;
};

export const maritalStatus = () => {
  const maritalStatus = [
    { label: "Select Marital Status", value: "default", key: 1 },
    { label: "Single", value: "Single", key: 2 },
    { label: "Married", value: "Married", key: 3 },
    { label: "Divorced", value: "Divorced", key: 4 },
    { label: "Prefer Not To Say", value: "Prefer Not To Say", key: 5 },
  ];

  return maritalStatus;
};

export const generalMapper = (array) => {
  return array.map((item) => {
    return (
      <option value={item.value} key={item.key}>
        {item.label}
      </option>
    );
  });
};
