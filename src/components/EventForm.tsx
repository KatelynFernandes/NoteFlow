import React, { useState } from "react";

const EventForm: React.FC = () => {
  const [eventData, setEventData] = useState({
    venueName: "",
    location: "",
    date: "",
    time: "",
    contactInfo: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventData }),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Event data uploaded successfully! IPFS Hash:", result.ipfsHash);
      } else {
        console.error("Error uploading event data:", result.error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error uploading event data:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      <input
        type="text"
        placeholder="Venue Name"
        value={eventData.venueName}
        onChange={(e) => setEventData({ ...eventData, venueName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={eventData.location}
        onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
      />
      <input
        type="date"
        value={eventData.date}
        onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
      />
      <input
        type="time"
        value={eventData.time}
        onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
      />
      <input
        type="text"
        placeholder="Contact Info"
        value={eventData.contactInfo}
        onChange={(e) => setEventData({ ...eventData, contactInfo: e.target.value })}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default EventForm;