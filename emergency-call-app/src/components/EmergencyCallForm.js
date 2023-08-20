import React, { useState } from 'react';

function EmergencyCallForm({ onSubmit, medicalConditionOptions, severityOptions }) {
  const [patientGivenName, setPatientGivenName] = useState('');
  const [patientSurname, setPatientSurname] = useState('');
  const [nhsNumber, setNhsNumber] = useState('');
  const [location, setLocation] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [severity, setSeverity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ patientGivenName, patientSurname, nhsNumber, location, medicalCondition, severity });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Patient Given Name:
        <input type="text" value={patientGivenName} onChange={(e) => setPatientGivenName(e.target.value)} />
      </label>
      <br />
      <label>
        Patient Surname:
        <input type="text" value={patientSurname} onChange={(e) => setPatientSurname(e.target.value)} />
      </label>
      <br />
      <label>
        NHS Number:
        <input type="text" value={nhsNumber} onChange={(e) => setNhsNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Address:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <br />
      <label>
        Medical Condition:
        <select value={medicalCondition} onChange={(e) => setMedicalCondition(e.target.value)}>
          <option value="">Select</option>
          {medicalConditionOptions.map((condition) => (
            <option key={condition} value={condition}>{condition}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Severity:
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="">Select</option>
          {severityOptions.map((severityRating) => (
            <option key={severityRating} value={severityRating}>{severityRating}</option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default EmergencyCallForm;
