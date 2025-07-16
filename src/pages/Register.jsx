import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';

const Register = () => {
  const navigate = useNavigate();
  const { signUpNewUser, loading } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);
  const voiceRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'startup',
  });

  useEffect(() => {
    setIsAnimated(true);

    const timer = setTimeout(() => {
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.onvoiceschanged = () => {
          playWelcomeVoice();
        };
      } else {
        playWelcomeVoice();
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      if (voiceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playWelcomeVoice = () => {
    const message = new SpeechSynthesisUtterance(
      "Welcome to Nexus Business. Let's begin your premium journey by creating an account. Your future starts here."
    );

    message.rate = 0.9;
    message.pitch = 1.05;
    message.volume = 1;

    const voices = speechSynthesis.getVoices();
    const preferredVoices = [
      'Google UK English Female',
      'Google US English',
      'Microsoft Zira Desktop',
      'Microsoft David Desktop',
      'Samantha',
    ];

    const vipVoice = voices.find(voice => preferredVoices.includes(voice.name));
    if (vipVoice) {
      message.voice = vipVoice;
    }

    voiceRef.current = message;
    speechSynthesis.speak(message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const { name, email, password, confirmPassword, accountType } = formData;

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }

    try {
      const { success, error } = await signUpNewUser(email, password, name, accountType);

      if (success) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('account_type')
          .eq('id', success.id)
          .single();

        if (profileError) {
          setErrorMsg('Error fetching account type: ' + profileError.message);
          return;
        }

        navigate('/dashboard');
      } else {
        setErrorMsg(error?.message || 'Registration failed');
      }
    } catch (error) {
      setErrorMsg('An unexpected error occurred');
      console.error('Error during registration:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-green-50 to-green-100 flex items-center justify-center p-4">
      <div className={`w-full max-w-md bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl shadow-[0_10px_40px_rgba(0,255,128,0.15)] p-8 transition-transform duration-700 transform ${
        isAnimated ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        <div className="text-center">
          <div className="group mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-green-200 shadow-lg mb-4 transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,128,0.3)]">
            <UserPlus className="text-green-800 w-6 h-6 group-hover:rotate-12 transition-all duration-300" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Create Your Account</h2>
          <p className="text-sm text-green-700 mt-2">Join Nexus Business and start your premium journey</p>
        </div>

        {errorMsg && (
          <div className="mt-4 flex items-center p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg shadow animate-fade-in">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            {['startup', 'investor'].map(type => (
              <button
                key={type}
                type="button"
                onClick={() => handleChange({ target: { name: 'accountType', value: type } })}
                className={`group py-2 px-4 text-sm font-semibold rounded-lg border transition-all duration-300 transform ${
                  formData.accountType === type
                    ? 'bg-green-600 text-white shadow-md scale-105'
                    : 'bg-white text-green-700 border-green-300 hover:border-green-500 hover:bg-green-50 hover:shadow-lg'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {[ 
            { id: 'name', label: 'Full Name', icon: <User />, type: 'text', placeholder: 'John Doe' },
            { id: 'email', label: 'Email Address', icon: <Mail />, type: 'email', placeholder: 'you@example.com' },
            { id: 'password', label: 'Password', icon: <Lock />, type: 'password', placeholder: '••••••••' },
            { id: 'confirmPassword', label: 'Confirm Password', icon: <Lock />, type: 'password', placeholder: '••••••••' }
          ].map(({ id, label, icon, type, placeholder }) => (
            <div key={id}>
              <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-green-500">
                  {icon}
                </span>
                <input
                  id={id}
                  name={id}
                  type={type}
                  autoComplete={id}
                  required
                  value={formData[id]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm bg-white text-gray-700 placeholder-gray-400 transition-all duration-300 hover:shadow-[0_0_8px_rgba(0,255,128,0.3)]"
                />
              </div>
              {id === 'password' && (
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transform hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(0,255,128,0.4)] active:scale-[0.98] transition-all duration-300"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 mx-auto animate-spin" />
            ) : (
              <span className="flex justify-center items-center gap-2">
                Create Account
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-green-700 font-medium hover:underline">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
