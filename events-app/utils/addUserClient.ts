export const addUser = async (user: Record<string, any>) => {
    try {
      const response = await fetch('https://events-api.org/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
      return response.status
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('Error adding user');
    }
  };