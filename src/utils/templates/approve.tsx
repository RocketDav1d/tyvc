import React from 'react';

import logo from './logo.svg';

type ApproveEmailTemplateProps = {
  hostUrl: string;
};

export const ApproveEmailTemplate: React.FC<ApproveEmailTemplateProps> = ({
  hostUrl,
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
        <h1>Welcome Onboard!</h1>
        <p>Here you can find the platform:</p>
        <a
          href={`${hostUrl}/app/dashboard`}
          style={{
            display: 'inline-block',
            backgroundColor: '#22c55e',
            color: 'white',
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            marginTop: '20px',
          }}
        >
          Go to Dashboard
        </a>
      </div>
      <footer style={{ alignSelf: 'center', marginTop: '40px' }}>
        <p>Your TYVC Team</p>
      </footer>
    </div>
  );
};
