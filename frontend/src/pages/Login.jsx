import React, { useState } from 'react';
import { loginUser } from '../services/api'; 

function Login({ onLoginSuccess, switchToRegister }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      // Call the API to log in the user
      const { data } = await loginUser(formData);
      
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); 
      
      // App.jsx successfully logged in user 
      onLoginSuccess(data.user);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "The email address or password is incorrect!");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Login Page Layout
    <div className="min-h-screen relative flex items-center justify-center bg-[#030712] overflow-hidden px-4 select-none">
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse delay-700"></div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-8 shadow-2xl shadow-indigo-950/20 relative z-10">
        
        {/* Logo / Header Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white mb-4 text-2xl shadow-lg shadow-indigo-500/20">
            🎟️
          </div>
          <h2 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-400 mt-2">Enter your details to enter</p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs font-semibold text-rose-400 text-center flex items-center justify-center gap-2">
            🛑 {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3.5 bg-slate-950/60 border border-slate-800/80 focus:border-indigo-500 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3.5 bg-slate-950/60 border border-slate-800/80 focus:border-indigo-500 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm transition-all duration-300 transform active:scale-[0.98] shadow-xl shadow-indigo-600/20 cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Sign In to Account"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6 pt-5 border-t border-slate-800/40">
          <p className="text-sm text-slate-400">
            Don't have an account?{' '}
            <button 
              onClick={switchToRegister} 
              className="text-indigo-400 hover:text-indigo-300 font-bold transition bg-transparent border-none cursor-pointer hover:underline"
            >
              Register here
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;