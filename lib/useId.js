"use client";
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function useUniqueId() {
    useEffect(() => {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = uuidv4();
            localStorage.setItem('userId', userId);
            fetch('/api/new-field',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId })
            })
            .then(response => response.json())
            .then(data => console.log(data));
        }
    }, []);
}

export default useUniqueId;