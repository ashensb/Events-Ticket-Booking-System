import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData);
    navigate('/login');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/30 px-4">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 shadow-2xl shadow-indigo-950/20">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3 text-xl">
            🚀
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">Create Account</h2>
          <p className="text-sm text-slate-400 mt-1">Join Ticket-Craft today and explore events</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none transition-all duration-200"
              placeholder="Amal Perera"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none transition-all duration-200"
              placeholder="amal@gmail.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none transition-all duration-200"
              placeholder="••••••••"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Register As</label>
            <select 
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-100 text-sm focus:outline-none cursor-pointer transition-all duration-200"
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              value={formData.role}
            >
              <option value="user">🤵 Regular User (Ticket Buyer)</option>
              <option value="admin">🛠️ System Admin</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all duration-200 transform active:scale-[0.98] shadow-lg shadow-indigo-600/20 mt-2 cursor-pointer"
          >
            Register Now
          </button>
        </form>

        <div className="text-center mt-6 pt-5 border-t border-slate-800/60">
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition">
              Login here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;