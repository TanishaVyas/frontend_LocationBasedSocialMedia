//userprofile.js
import React, { useEffect, useState } from 'react';

function UserProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('http://localhost:8080/auth/current_user', {
                credentials: 'include',
            });
            const userData = await response.json();
            setUser(userData);
        };

        fetchUser();
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Bio: {user.bio}</p>
            <p>Phone: {user.phone}</p>
            <p>Date of Birth: {user.dob}</p>
        </div>
    );
}

export default UserProfile;
