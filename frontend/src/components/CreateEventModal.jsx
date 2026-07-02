import React, { useState } from 'react';
import { createEvent } from '../services/api';

function CreateEventModal({ isOpen, onClose, onEventCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    price: '',
    totalTickets: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent({
        ...formData,
        price: Number(formData.price),
        totalTickets: Number(formData.totalTickets)
      });
      alert('🎯 New Event Created Successfully!');
      onEventCreated(); // trigger parent to refresh events list
      onClose(); // close the modal after successful creation
      setFormData({ title: '', description: '', date: '', price: '', totalTickets: '' }); 
    } catch (error) {
      alert('❌ Failed to create event');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition">
          ✕
        </button>

        <h2 className="text-xl font-bold text-slate-100 mb-4">🚀 Create New Event</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Event Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition" 
              placeholder="e.g. Daddy Live in Concert" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows="3"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition" 
              placeholder="Event details..." />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Price (Rs.)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition" 
                placeholder="3000" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Total Tickets</label>
              <input type="number" name="totalTickets" value={formData.totalTickets} onChange={handleChange} required min="1"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition" 
                placeholder="500" />
            </div>
          </div>

          <button type="submit" 
            className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-indigo-500/20 cursor-pointer">
            ➕ Add Event Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEventModal;