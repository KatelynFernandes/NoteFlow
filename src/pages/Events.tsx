"use client"; // Required for Next.js client components

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "../styles/Events.css";

const Events: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch events from API or database (replace with your API call)
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events"); // Adjust API route if needed
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const logout = () => {
    setIsAuthorized(false);
    router.push("/pages/Login");
  };

  return (
    <div className="page-container">

      {/* Main Content */}
      <main className="content">
        <h1 className="event-header">All Events</h1>
        <p className="event-head">Here are all the events happening:</p>

        <div className="event-list">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event._id} className="event-card">
                {/* Ribbon for featured events */}
                {event.isFeatured && <div className="ribbon">Featured</div>}

                <Image
                  src={event.eventImage || "https://via.placeholder.com/250x150"}
                  alt={event.eventName}
                  width={250}
                  height={150}
                  className="event-image"
                />
                <h3><strong>Title:</strong> {event.eventName}</h3>
                <p><strong>Event Date:</strong> {new Date(event.eventDate).toLocaleDateString()} at {event.eventTime}</p>
                <p><strong>Description:</strong> {event.eventDescription}</p>
                <p><strong>Submitted by:</strong> {event.user}</p>
                <p><strong>Contact:</strong> {event.contactInfo}</p>
                <p><strong>Location:</strong> {event.location}</p>
              </div>
            ))
          ) : (
            <p>{events.length === 0 ? "No events found." : "Loading events..."}</p>
          )}
        </div>

        <Link href="/pages/AddEvent">
          <button className="add-event-button" aria-label="Add a new event">Add Event</button>
        </Link>
      </main>

    </div>
  );
};

export default Events;
