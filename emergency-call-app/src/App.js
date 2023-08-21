import React, { useState } from 'react';
import './App.css';
import EmergencyCallForm from './components/EmergencyCallForm';
import axios from 'axios';

const severityOptions = [
  "critical",
  "serious",
  "stable",
  "minor"
];

const medicalConditionOptions = [
  "head trauma",
  "bone fracture",
  'burn',
  "internal injury"
]

function App() {
  const [searchResult, setSearchResult] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [dispatchResponseData, setDispatchResponseData] = useState({});

  const handleFormSubmit = async (formData) => {
    const patientConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {},
    };
  
    if (formData.patientGivenName) {
      patientConfig.params["first_name"] = formData.patientGivenName;
    }
    if (formData.patientSurname) {
      patientConfig.params["last_name"] = formData.patientSurname;
    }
    if (formData.nhsNumber) {
      patientConfig.params["nhs_number"] = formData.nhsNumber;
    }

    const hospitalConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {},
    };

    const dispatchPayload = {
      "severity": formData.severity,
      "medical_condition": formData.medicalCondition,
      "location": formData.location,
      "nhs_number": formData.nhsNumber
    };

    try {
      const response = await axios.get("http://localhost:8000/api/patients/", patientConfig);
      const dispatchResponse = await axios.post("http://localhost:8001/api/dispatch-ambulance/", dispatchPayload, hospitalConfig);

      console.log("API Response:", response.data);
      console.log("Dispatch Response:", dispatchResponse.data);

      setSearchResult(response.data.length > 0 ? 'Match Found' : 'No Match Found');
      setResponseData(response.data);
      setDispatchResponseData(dispatchResponse.data);
    } catch (error) {
      console.error("API Error:", error);
    }

    console.log('Form data submitted:', formData);
  };

  return (
    <div className="App">
      <h1>Emergency Call Operator</h1>
      <EmergencyCallForm
        onSubmit={handleFormSubmit}
        medicalConditionOptions={medicalConditionOptions}
        severityOptions={severityOptions}
        patientData={responseData}
      />
      <p className="search-result">{searchResult}</p>
      <div className="patient-details">
        <h2>Patient Details:</h2>
        <ul>
          {responseData.map((patient) => (
            <li key={patient.id}>
              {patient.first_name} {patient.last_name} - NHS Number: {patient.nhs_number}
              <br/>
              <h3><strong>Chosen Hospital : {dispatchResponseData.chosen_hospital}</strong></h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
