import React, { useEffect, useState } from 'react';
import { getAllBookingsForAdmin, approveBooking } from '../services/api';

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminBookings();
  }, []);

  const fetchAdminBookings = async () => {
    try {
      const { data } = await getAllBookingsForAdmin();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveBooking(id);
      alert("✅ Booking Approved Successfully!");
      fetchAdminBookings();
    } catch (error) {
      alert("❌ Failed to approve booking");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-100">Admin Control Panel</h1>
        <p className="text-sm text-slate-400 mt-1">Review and approve user ticket booking requests.</p>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-10">🔄 Loading pending requests...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center bg-slate-900 border border-slate-800 rounded-2xl p-10 text-slate-400">
          🎉 No booking requests to review!
        </div>
      ) : (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Event</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-sm text-slate-300">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-slate-900/40 transition">
                  <td className="p-4 font-medium text-slate-100">{booking.user?.name}</td>
                  <td className="p-4 text-slate-400">{booking.user?.email}</td>
                  <td className="p-4 text-indigo-400 font-semibold">{booking.event?.title}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'approved' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {booking.status === 'pending' && (
                      <button 
                        onClick={() => handleApprove(booking._id)}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition shadow-lg shadow-emerald-600/10 cursor-pointer"
                      >
                        ✓ Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;