import { Meta, StoryObj } from '@storybook/react';

import Office, { OfficeProps } from './office'; // Ensure this path matches your file structure

const meta: Meta<OfficeProps> = {
  title: 'Components/Office',
  component: Office,
  // Define any argTypes for props if necessary for documentation or control customization
};

export default meta;

export const Berlin: StoryObj<OfficeProps> = {
  args: {
    officeData: {
        city: "Berlin",
        country: "Germany",
        address: "Linienstraße 214, DE-10119",
        eployees: ["https://ukakaqjpfypyxhawaayy.supabase.co/storage/v1/object/sign/team_member/ChristianHerrmann.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZWFtX21lbWJlci9DaHJpc3RpYW5IZXJybWFubi5wbmciLCJpYXQiOjE3MDc3NDU5NDgsImV4cCI6MTcwODM1MDc0OH0.t80yLEfldz0Lt5MoDu_Bzd6lisKAtygTbqPJ_sugWeM&t=2024-02-12T13%3A52%3A28.569Z", "https://ukakaqjpfypyxhawaayy.supabase.co/storage/v1/object/sign/team_member/Jasper.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZWFtX21lbWJlci9KYXNwZXIucG5nIiwiaWF0IjoxNzA3NzQ1OTU3LCJleHAiOjE3MDgzNTA3NTd9.97x4lUP9e-ys411DjTJc0Tl3xo00Z-rIpxdLylbDL5A&t=2024-02-12T13%3A52%3A37.620Z", "https://ukakaqjpfypyxhawaayy.supabase.co/storage/v1/object/sign/team_member/Brett%20Sun.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZWFtX21lbWJlci9CcmV0dCBTdW4ucG5nIiwiaWF0IjoxNzA3NzQ2MzM4LCJleHAiOjE3MDgzNTExMzh9.q82EBDgWq0lPjl0uhIVuAEvJhNX_g50PyLYctkAb7vU&t=2024-02-12T13%3A58%3A58.749Z", "test", "test"],
        bgImage: "https://ukakaqjpfypyxhawaayy.supabase.co/storage/v1/object/sign/cities/berlin.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaXRpZXMvYmVybGluLmpwZWciLCJpYXQiOjE3MDc3Mzk4MTAsImV4cCI6MTcwODM0NDYxMH0.D1uZOP1n08DB2Czb6oZK9MsUpgw7VKLDpxfIM143t4g&t=2024-02-12T12%3A10%3A10.780Z"
    },
  },
};


export const London: StoryObj<OfficeProps> = {
  args: {
    officeData: {
        city: "London",
        country: "United Kingdom",
        address: "50-51 Wells St, London W1T 3PP, UK",
        eployees: ["https://ukakaqjpfypyxhawaayy.supabase.co/storage/v1/object/sign/team_member/ChristianHerrmann.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZWFtX21lbWJlci9DaHJpc3RpYW5IZXJybWFubi5wbmciLCJpYXQiOjE3MDc3NDU5NDgsImV4cCI6MTcwODM1MDc0OH0.t80yLEfldz0Lt5MoDu_Bzd6lisKAtygTbqPJ_sugWeM&t=2024-02-12T13%3A52%3A28.569Z", "https://ukakaqjpfypyxhawaayy.supabase.co/storage/v1/object/sign/team_member/Jasper.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZWFtX21lbWJlci9KYXNwZXIucG5nIiwiaWF0IjoxNzA3NzQ1OTU3LCJleHAiOjE3MDgzNTA3NTd9.97x4lUP9e-ys411DjTJc0Tl3xo00Z-rIpxdLylbDL5A&t=2024-02-12T13%3A52%3A37.620Z", "https://ukakaqjpfypyxhawaayy.supabase.co/storage/v1/object/sign/team_member/Brett%20Sun.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZWFtX21lbWJlci9CcmV0dCBTdW4ucG5nIiwiaWF0IjoxNzA3NzQ2MzM4LCJleHAiOjE3MDgzNTExMzh9.q82EBDgWq0lPjl0uhIVuAEvJhNX_g50PyLYctkAb7vU&t=2024-02-12T13%3A58%3A58.749Z", "test"],
        bgImage: "https://ukakaqjpfypyxhawaayy.supabase.co/storage/v1/object/sign/cities/berlin.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaXRpZXMvYmVybGluLmpwZWciLCJpYXQiOjE3MDc3Mzk4MTAsImV4cCI6MTcwODM0NDYxMH0.D1uZOP1n08DB2Czb6oZK9MsUpgw7VKLDpxfIM143t4g&t=2024-02-12T12%3A10%3A10.780Z"
    },
  },
};


export const Stockholm: StoryObj<OfficeProps> = {
  args: {
    officeData: {
        city: "Stockholm",
        country: "Sweden",
        address: "50-51 Wells St, London W1T 3PP, UK",
        eployees: ["https://ukakaqjpfypyxhawaayy.supabase.co/storage/v1/object/sign/team_member/ChristianHerrmann.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZWFtX21lbWJlci9DaHJpc3RpYW5IZXJybWFubi5wbmciLCJpYXQiOjE3MDc3NDU5NDgsImV4cCI6MTcwODM1MDc0OH0.t80yLEfldz0Lt5MoDu_Bzd6lisKAtygTbqPJ_sugWeM&t=2024-02-12T13%3A52%3A28.569Z", "https://ukakaqjpfypyxhawaayy.supabase.co/storage/v1/object/sign/team_member/Jasper.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZWFtX21lbWJlci9KYXNwZXIucG5nIiwiaWF0IjoxNzA3NzQ1OTU3LCJleHAiOjE3MDgzNTA3NTd9.97x4lUP9e-ys411DjTJc0Tl3xo00Z-rIpxdLylbDL5A&t=2024-02-12T13%3A52%3A37.620Z"],
        bgImage: "https://ukakaqjpfypyxhawaayy.supabase.co/storage/v1/object/sign/cities/berlin.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaXRpZXMvYmVybGluLmpwZWciLCJpYXQiOjE3MDc3Mzk4MTAsImV4cCI6MTcwODM0NDYxMH0.D1uZOP1n08DB2Czb6oZK9MsUpgw7VKLDpxfIM143t4g&t=2024-02-12T12%3A10%3A10.780Z"
    },
  },
};
