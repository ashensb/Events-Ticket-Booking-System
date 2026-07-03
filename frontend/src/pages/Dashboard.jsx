import React, { useEffect, useState } from 'react';
import { getEvents, bookTicket, deleteEvent, updateEvent } from '../services/api';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get the logged-in user from localStorage to determine if they are an admin
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
  try {
    // Call the API to get all events
    const { data } = await getEvents(); 
    setEvents(data); 
    setLoading(false);
  } catch (error) {
    console.error("Error fetching events:", error);
    setLoading(false);
  }
};

  const handleBook = async (id) => {
    try {
      const response = await bookTicket(id);
      alert(response.data.message);
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed!");
    }
  };

 const handleDelete = async (id) => {
    if (window.confirm("⚠️ Delete this event?")) {
      try {
        await deleteEvent(id);
        alert("Event Deleted!");
        fetchEvents();
      } catch (error) {
        
        alert(error.response?.data?.message || "Failed to delete event");
      }
    }
  };

  const handleUpdate = async (event) => {
    const newTitle = window.prompt("Edit Title:", event.title);
    const newPrice = window.prompt("Edit Price:", event.price);

    if (newTitle && newPrice) {
      try {
        // Call the API to update the event with new title and price
        await updateEvent(event._id, { 
          title: newTitle, 
          price: Number(newPrice),
          description: event.description,
          date: event.date,
          totalTickets: event.totalTickets
        });
        alert("Event Updated!");
        fetchEvents();
      } catch (error) {
        // Alert the user if the update fails
        alert(error.response?.data?.message || "Failed to update event");
      }
    }
  };

  return (
    <div>
      <div className="text-center md:text-left mb-8">
        <h1 className="text-3xl font-extrabold text-slate-100 sm:text-4xl">Trending Live Events</h1>
        <p className="mt-2 text-sm text-slate-400">Discover and manage premium live experiences.</p>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-10">🔄 Loading awesome events...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 relative group flex flex-col justify-between">
              
             
              {user?.role === 'admin' && (
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 p-1 rounded-lg">
                  <button onClick={() => handleUpdate(event)} className="p-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-md cursor-pointer">✏️</button>
                  <button onClick={() => handleDelete(event._id)} className="p-1.5 text-xs bg-slate-800 hover:bg-rose-950 text-rose-400 rounded-md cursor-pointer">🗑️</button>
                </div>
              )}

              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 text-xs font-semibold bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">🎵 Live Event</span>
                  <span className="text-sm text-slate-400">📅 {event.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{event.title}</h3>
                <p className="text-sm text-slate-400 mb-6 line-clamp-2">{event.description}</p>
              </div>

              <div className="border-t border-slate-900 pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Price</p>
                    <p className="text-lg font-black text-emerald-400">Rs. {event.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase">Availability</p>
                    <p className="text-sm font-bold text-indigo-400">{event.availableTickets} / {event.totalTickets} Left</p>
                  </div>
                </div>

               
                <button 
                  onClick={() => handleBook(event._id)}
                  disabled={event.availableTickets === 0 || user?.role === 'admin'}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition ${
                    user?.role === 'admin'
                      ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                      : event.availableTickets > 0 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {user?.role === 'admin' ? '🔒 Booking Disabled for Admin' : event.availableTickets > 0 ? '🎟️ Book Ticket Now' : '🚫 Sold Out'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;