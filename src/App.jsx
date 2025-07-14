import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import './App.css';
import Navbar from './Navbar';
import EventForm from './components/EventForm';
import EventSuggestions from './components/EventSuggestions';



function App() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    type: '',
    location: '',
    desc: ''
  });
  const [filter, setFilter] = useState('All');

  const fetchEvents = async () => {
    const eventCollection = collection(db, "events");
    const snapshot = await getDocs(eventCollection);
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Add event from EventForm
  const handleAddEvent = async ({ eventName, eventDate, eventType, eventLocation, eventDesc }) => {
    // Map to Firestore schema
    const newEvent = {
      title: eventName,
      date: eventDate ? eventDate.toISOString().split('T')[0] : '',
      type: eventType || '',
      location: eventLocation || '',
      desc: eventDesc || ''
    };
    try {
      await addDoc(collection(db, "events"), newEvent);
      fetchEvents(); // refresh list
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  // Get unique event types from the events array
  const eventTypes = Array.from(new Set(events.map(event => event.type).filter(Boolean)));

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
        <EventSuggestions />
        <div className="filter-bar flex justify-center w-full mb-4">
          <label htmlFor="type-filter" className="mr-2">Filter by type:</label>
          <select id="type-filter" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="All">All</option>
            {eventTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">Local Events</h1>
        <EventForm onAddEvent={handleAddEvent} />
        <hr className="my-8 w-full" />
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center w-full">
            {events
              .filter(event => filter === 'All' || event.type === filter)
              .map(event => (
                <div key={event.id} className="event-card w-full max-w-md mx-auto">
                  <h2 className="text-xl font-bold text-cyan-300 mb-2 text-center">{event.title}</h2>
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Type:</strong> {event.type}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p>{event.desc}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
