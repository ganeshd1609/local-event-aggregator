import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventForm = ({ onAddEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [eventType, setEventType] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDesc, setEventDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventName && eventDate) {
      onAddEvent({
        eventName,
        eventDate,
        eventType,
        eventLocation,
        eventDesc
      });
      setEventName('');
      setEventDate(null);
      setEventType('');
      setEventLocation('');
      setEventDesc('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form flex flex-col gap-4 bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <label className="text-lg font-semibold text-cyan-300 mb-1">Event Name</label>
      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        placeholder="Enter event name"
        className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4"
        required
      />
      <label className="text-lg font-semibold text-cyan-300 mb-1">Event Date</label>
      <DatePicker
        selected={eventDate}
        onChange={(date) => setEventDate(date)}
        className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4"
        placeholderText="Select event date"
        dateFormat="MMMM d, yyyy"
        required
      />
      <label className="text-lg font-semibold text-cyan-300 mb-1">Type</label>
      <input
        type="text"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
        placeholder="Enter event type (e.g. Tech, Sports)"
        className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4"
        required
      />
      <label className="text-lg font-semibold text-cyan-300 mb-1">Location</label>
      <input
        type="text"
        value={eventLocation}
        onChange={(e) => setEventLocation(e.target.value)}
        placeholder="Enter event location"
        className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4"
        required
      />
      <label className="text-lg font-semibold text-cyan-300 mb-1">Description</label>
      <textarea
        value={eventDesc}
        onChange={(e) => setEventDesc(e.target.value)}
        placeholder="Enter event description"
        className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4 resize-vertical min-h-[100px]"
        required
      />
      <button
        type="submit"
        className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 px-6 rounded transition-colors mt-2"
      >
        Submit
      </button>
    </form>
  );
};

export default EventForm; 