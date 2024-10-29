import React, { useEffect } from 'react';

const LocationDisplay = () => {
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;

                    // Replace this with the actual user email
                    const userEmail = "nandita.singh.btech2022@sitpune.edu.in"; // This should be dynamically obtained

                    // Send latitude and longitude to the backend along with email
                    fetch('http://localhost:8080/user/update-location', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: userEmail, latitude, longitude }),
                    })
                    .then(res => res.json())
                    .then(response => {
                        console.log("Location saved successfully:", response);
                    })
                    .catch(error => {
                        console.error("Error sending location data:", error);
                    });

                    // Constructing URL for reverse geocoding API
                    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
                    fetch(url)
                        .then(res => res.json())
                        .then(data => {
                            console.table(data.address);
                            alert("Location: " + JSON.stringify(data.address, null, 2));
                            console.log("Latitude:", latitude);
                            console.log("Longitude:", longitude);
                        })
                        .catch(error => {
                            console.log("Error fetching data from API", error);
                        });
                },
                error => {
                    console.error("Error getting location:", error.message);
                    alert("Failed to retrieve location: " + error.message);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <div>
            <h2>Your Location Information</h2>
            {/* UI elements to display location */}
        </div>
    );
};

export default LocationDisplay;
