export const addUser = async (user) => {
    try {
        const response = await fetch('https://events-api.org/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create account');
        }
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error creating user');
    }
};