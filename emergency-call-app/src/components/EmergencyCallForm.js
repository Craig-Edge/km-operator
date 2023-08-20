import React, { useState } from 'react';
import './EmergencyCallForm.css'; // Import the CSS file

function EmergencyCallForm({ onSubmit, medicalConditionOptions, severityOptions }) {
  const [patientGivenName, setPatientGivenName] = useState('');
  const [patientSurname, setPatientSurname] = useState('');
  const [nhsNumber, setNhsNumber] = useState('');
  const [location, setLocation] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [severity, setSeverity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      patientGivenName,
      patientSurname,
      nhsNumber,
      location,
      medicalCondition,
      severity,
    });
  };

  return (
    <div className="emergency-call-form">
      <h2>Emergency Call Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient Given Name:</label>
          <input
            type="text"
            value={patientGivenName}
            onChange={(e) => setPatientGivenName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Patient Surname:</label>
          <input
            type="text"
            value={patientSurname}
            onChange={(e) => setPatientSurname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>NHS Number:</label>
          <input
            type="text"
            value={nhsNumber}
            onChange={(e) => setNhsNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Medical Condition:</label>
          <select
            value={medicalCondition}
            onChange={(e) => setMedicalCondition(e.target.value)}
          >
            <option value="">Select</option>
            {medicalConditionOptions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Severity:</label>
          <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
            <option value="">Select</option>
            {severityOptions.map((severityRating) => (
              <option key={severityRating} value={severityRating}>
                {severityRating}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EmergencyCallForm;
