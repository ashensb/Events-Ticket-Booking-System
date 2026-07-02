import React, { useState } from 'react';
import { registerUser } from '../services/api';

function Register({ switchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' 
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      // Call the API to register the user
      await registerUser(formData);
      
      setSuccessMsg("Registration Successful! තත්පරයකින් ඔයාව Login පේජ් එකට හරවා යවනවා...");
      
      // After successful registration, redirect to login page after a short delay
      setTimeout(() => {
        switchToLogin();
      }, 2000);
      
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "ලියාපදිංචි වීමට නොහැකි වුණා. නැවත උත්සාහ කරන්න.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#030712] overflow-hidden px-4 select-none">
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse delay-700"></div>

      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-8 shadow-2xl shadow-indigo-950/20 relative z-10">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white mb-4 text-2xl shadow-lg shadow-indigo-500/20">
            🚀
          </div>
          <h2 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Create Account
          </h2>
          <p className="text-sm text-slate-400 mt-2">Join Ticket-Craft today and explore events</p>
        </div>

        {/* Success Alert Box */}
        {successMsg && (
          <div className="mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-semibold text-emerald-400 text-center">
            ✅ {successMsg}
          </div>
        )}

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs font-semibold text-rose-400 text-center">
            🛑 {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800/80 focus:border-indigo-500 rounded-xl text-slate-100 text-sm focus:outline-none transition"
              placeholder="Ashen Sandeepa"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800/80 focus:border-indigo-500 rounded-xl text-slate-100 text-sm focus:outline-none transition"
              placeholder="ashen@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800/80 focus:border-indigo-500 rounded-xl text-slate-100 text-sm focus:outline-none transition"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Register As</label>
            <select 
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800/80 focus:border-indigo-500 rounded-xl text-slate-100 text-sm focus:outline-none transition"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
             
              <option value="user">🤵 Regular User (Ticket Buyer)</option>
              <option value="admin">⚡ System Administrator (Admin)</option>
            </select>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm transition transform active:scale-[0.98] shadow-xl shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>

        <div className="text-center mt-6 pt-5 border-t border-slate-800/40">
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <button 
              onClick={switchToLogin} 
              className="text-indigo-400 hover:text-indigo-300 font-bold transition bg-transparent border-none cursor-pointer hover:underline"
            >
              Login here
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;