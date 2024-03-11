export const useOnboardingProfile = () => {
    async function submitOnboardingProfile(role: string, data: any) {
      try {
        const response = await fetch('/api/v1/onboarding/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role,
            data,
          }),
        });
        const result = await response.json();
        if (response.ok) {
          console.log('Success:', result);
          // Redirect to the next page
        } else {
          console.error('Submission Error:', result);
          // Handle server errors or show error message
        }
      } catch (error) {
        console.error('Network Error:', error);
        // Handle network errors or show error message
      }
    }

    return { submitOnboardingProfile };
  };
