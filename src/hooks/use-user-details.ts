import { useState, useEffect } from 'react';

import { User } from '@prisma/client';

export default function useUserDetails() {
  const [userDetails, setUserDetails] = useState<User | null>(null);

  // Fetch user details
  useEffect(() => {
    fetch(`/api/v1/user/profile`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw null;
        }
      })
      .then((json) => json['data'] as User)
      .then((userDetails) => {
        setUserDetails(userDetails);
      })
      .catch(() => {
        setUserDetails(null);
      });
  }, []);

  return { userDetails };
}
