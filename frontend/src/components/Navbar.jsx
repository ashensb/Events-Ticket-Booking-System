import React from 'react';

function Navbar({ user, onLogout, setPage }) {
  return (
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-900 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('dashboard')}>
          <span className="text-2xl">🎟️</span>
          <span className="text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 uppercase">
            TICKET-CRAFT
          </span>
        </div>

        {user && (
          <div className="flex items-center gap-6">
            <button onClick={() => setPage('dashboard')} className="text-sm font-medium text-slate-300 hover:text-white transition cursor-pointer">
              Dashboard
            </button>

           
            {user.role === 'admin' ? (
              <>
                <button onClick={() => setPage('create-event')} className="text-sm font-medium text-slate-300 hover:text-white transition cursor-pointer">
                  + Create Event
                </button>
                <button onClick={() => setPage('admin-approvals')} className="text-sm font-medium text-amber-400 hover:text-amber-300 transition cursor-pointer">
                  ⚙ Approvals
                </button>
              </>
            ) : (
              
              <button onClick={() => setPage('my-bookings')} className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition cursor-pointer font-bold">
                🎫 My Bookings
              </button>
            )}

            <button 
              onClick={onLogout}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-rose-400 text-xs font-bold rounded-xl border border-slate-800 transition cursor-pointer"
            >
              🚪 Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;