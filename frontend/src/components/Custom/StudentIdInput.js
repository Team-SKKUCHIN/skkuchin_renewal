import React from 'react';

const StudentIdInput = ({ value, onChange, editable = true }) => {
  return (
    <input
      readOnly={!editable}
      variant="standard"
      placeholder=""
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        fontSize: '18px',
        color: '#3C3C3C',
        padding: '16px 0px 16px 12px',
        height: '56px',
        border: '1px solid #E2E2E2',
        borderRight: 'white',
        borderRadius: '8px 0 0 8px',
        width: '50%',
        outline: 'none'
      }}
    />
  );
};

export default StudentIdInput;
