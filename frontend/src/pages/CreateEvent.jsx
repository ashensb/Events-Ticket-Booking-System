import React, { useState } from 'react';
import { createEvent } from '../services/api';

function CreateEvent({ setPage }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    price: '',
    totalTickets: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    // Call the API to create a new event
      await createEvent({
        ...formData,
        price: Number(formData.price),
        totalTickets: Number(formData.totalTickets)
      });
      alert("🎯 Event Created Successfully!");
      setPage('dashboard'); // Redirect to dashboard after successful creation
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl">
      <h2 className="text-2xl font-black text-slate-100 mb-2">✨ Create New Event</h2>
      <p className="text-xs text-slate-400 mb-6">Fill in the details to publish a new premium live experience.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Event Title</label>
          <input type="text" required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Daddy Live in Concert" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Description</label>
          <textarea required rows="3" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe the experience..."></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Date</label>
            <input type="date" required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Ticket Price (Rs.)</label>
            <input type="number" required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="4000" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Total Tickets</label>
            <input type="number" required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              onChange={(e) => setFormData({ ...formData, totalTickets: e.target.value })} placeholder="300" />
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-slate-900">
          <button type="button" onClick={() => setPage('dashboard')} className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl text-sm transition cursor-pointer text-center">
            Cancel
          </button>
          <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl text-sm transition shadow-lg cursor-pointer">
            📢 Publish Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;