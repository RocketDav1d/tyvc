import React from 'react';

import logo from './logo.svg';

type RejectEmailTemplateProps = {
  reason: string;
};

export const RejectEmailTemplate: React.FC<RejectEmailTemplateProps> = ({
  reason,
}) => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ alignSelf: 'flex-start' }}>
        <img
          src={logo}
          alt="Company Logo"
          style={{ maxWidth: '150px', marginBottom: '40px' }}
        />
      </div>
      <div>
        <h1>Application Rejected</h1>
        <p>Unfortunately, we can&apos;t onboard you at the moment.</p>
        <p>{reason}</p>
      </div>
      <footer style={{ alignSelf: 'center', marginTop: '40px' }}>
        <p>Your TYVC Team</p>
      </footer>
    </div>
  );
};
