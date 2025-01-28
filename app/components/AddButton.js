import { useEffect, useState } from 'react';

const AddButton = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      setUserId(storedUserId);
    }
  }, []);

  const handleClick = async () => {
    if (!userId) {
      console.error('No userId found in localStorage');
      return;
    }

    const response = await fetch('/api/new-field', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      console.log('Data inserted successfully');
    } else {
      console.error('Failed to insert data');
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Insert Data</button>
    </div>
  );
};

export default AddButton;