// ... (imports remain same)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';

const Register = () => {
  const navigate = useNavigate();
  const { signUpNewUser, loading } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'startup',
  });

  useEffect(() => {
    setIsAnimated(true);
  }, []);

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 m-2 px-4 sm:px-6 lg:px-8">
      <div
        className={`max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-2xl transition-all duration-700 transform ${
          isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } hover:rotate-[0.5deg] hover:scale-[1.01] hover:shadow-green-200`}
      >
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100 mb-4 shadow-md hover:scale-110 transform transition-transform duration-300">
            <UserPlus className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">Create an account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our platform to connect startups and investors
          </p>
        </div>

        {errorMsg && (
          <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 animate-fade-in" role="alert">
            <AlertCircle className="inline w-5 h-5 mr-2 flex-shrink-0" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">

            {/* Account Type Buttons */}
            <div className="relative">
              <label htmlFor="account-type" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                {['startup', 'investor'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 ${
                      formData.accountType === type
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleChange({ target: { name: 'accountType', value: type } })}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Fields */}
            {[
              { id: 'name', label: 'Full Name', icon: <User />, type: 'text', placeholder: 'John Doe' },
              { id: 'email', label: 'Email address', icon: <Mail />, type: 'email', placeholder: 'you@example.com' },
              { id: 'password', label: 'Password', icon: <Lock />, type: 'password', placeholder: '••••••••' },
              { id: 'confirmPassword', label: 'Confirm Password', icon: <Lock />, type: 'password', placeholder: '••••••••' }
            ].map(({ id, label, icon, type, placeholder }) => (
              <div className="relative" key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icon}
                  </div>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    required
                    autoComplete={id}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 transition-all duration-200 sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transform focus:scale-[1.01]"
                    placeholder={placeholder}
                    value={formData[id]}
                    onChange={handleChange}
                  />
                </div>
                {id === 'password' && (
                  <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters long</p>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Create Account
                  <span className="absolute right-3 inset-y-0 flex items-center pl-3 transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </>
              )}
            </button>
          </div>
        </form>

        <div
          className={`mt-6 text-center transition-all duration-500 delay-200 ${
            isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500 transition-colors">
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
