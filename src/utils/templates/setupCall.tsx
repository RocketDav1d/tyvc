import React from 'react';

import Image from 'next/image';

// rest of your code

type ApproveEmailTemplateProps = {
  hostUrl: string;
};

export const SetupCallEmailTemplate: React.FC<ApproveEmailTemplateProps> = ({
  hostUrl,
}) => {

  const logoUrl = "https://ukakaqjpfypyxhawaayy.supabase.co/storage/v1/object/sign/logos/LOGO%20CMYK-01.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2dvcy9MT0dPIENNWUstMDEucG5nIiwiaWF0IjoxNzA3MjQwMjA1LCJleHAiOjE3Mzg3NzYyMDV9.epl79Ra0684YAWaSS1BRo_9LzErzdTcxSuVymWWZwFY&t=2024-02-06T17%3A23%3A25.357Z"

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
      <Image
        src={logoUrl}
        alt="Company Logo"
        width={150}
        height={150}
      />
      </div>
      <div>
        <h1>Only step away to complete your Onboarding!</h1>
        <p>Here you can book a call with the TYVC team:</p>

                <a
          href={`https://cal.com/david-korn-wpsogz/30min`}
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
          Book your Call
        </a>

      </div>
      <footer style={{ alignSelf: 'center', marginTop: '40px' }}>
        <p>Your TYVC Team</p>
      </footer>
    </div>
  );
};
