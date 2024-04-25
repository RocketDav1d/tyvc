import { useState, useEffect } from 'react';

import { User } from '@prisma/client';

interface UserDetails extends User {
  onboardingData: Record<string, any>;
}

export default function useUserDetails() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  // Fetch user details
  useEffect(() => {
    console.log('Fetching user details');
    fetch(`/api/v1/client/user/profile`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw null;
        }
      })
      .then((json) => json['data'])
      .then((userDetails) => {
        setUserDetails(userDetails);
      })
      .catch(() => {
        setUserDetails(null);
      });
  }, []);

  return { userDetails };
}
