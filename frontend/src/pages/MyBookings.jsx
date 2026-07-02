import React, { useEffect, useState } from 'react';
import { getUserBookings, cancelBooking } from '../services/api';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const { data } = await getUserBookings();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      setLoading(false);
    }
  };

  // Function to handle booking cancellation
  const handleCancelBooking = async (id) => {
    if (window.confirm("⚠️ Are you sure you want to cancel this booking request?")) {
      try {
        await cancelBooking(id);
        alert("❌ Booking Cancelled Successfully!");
        fetchMyBookings(); // Refresh the bookings list after cancellation
      } catch (error) {
        alert(error.response?.data?.message || "Failed to cancel booking");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-100">My Tickets & Bookings</h1>
        <p className="text-sm text-slate-400 mt-1">Track or manage the approval status of your booked experiences.</p>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-10">🔄 Fetching your tickets...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center bg-slate-900 border border-slate-800 rounded-2xl p-10 text-slate-400">
          🎟️ You haven't booked any tickets yet! Go to Dashboard to book.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition relative group">
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-slate-500">📅 Booked: {new Date(booking.createdAt || Date.now()).toLocaleDateString()}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    booking.status === 'approved' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {booking.status === 'approved' ? '✅ Approved' : '⏳ Pending'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-1">{booking.event?.title || "Event Name"}</h3>
                <p className="text-xs text-indigo-400 font-medium">📅 Event Date: {booking.event?.date}</p>
              </div>

              <div className="border-t border-slate-900 pt-3 mt-4 flex justify-between items-center text-sm">
                <div>
                  <span className="text-xs text-slate-500 block uppercase">Price</span>
                  <span className="font-black text-emerald-400">Rs. {booking.event?.price}</span>
                </div>

                {/* Cancel Booking Button */}
                <button 
                  onClick={() => handleCancelBooking(booking._id)}
                  className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-600 border border-rose-900 hover:border-rose-500 text-rose-400 hover:text-white text-xs font-bold rounded-lg transition cursor-pointer"
                >
                  🗑️ Cancel Booking
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;