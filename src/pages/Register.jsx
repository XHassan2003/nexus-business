import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ArrowRight, AlertCircle, Loader2, Building2, Briefcase } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState('form');
  const [pendingUser, setPendingUser] = useState(null);
 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'startup',
  });

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputRefs = useRef([]);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const simulateEmailSend = (email, otpCode) => {
    console.log(`Sending OTP ${otpCode} to ${email}`);
    
    const otpData = {
      code: otpCode,
      email: email,
      expiresAt: Date.now() + 10 * 60 * 1000,
    };
    
    localStorage.setItem(`otp_${email}`, JSON.stringify(otpData));
    alert(`DEMO: Your verification code is ${otpCode}. Check your email in a real application.`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const { name, email, password, confirmPassword, accountType } = formData;

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    if (!name || !email) {
      setErrorMsg('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      const emailExists = existingUsers.some(user => user.email === email);
      if (emailExists) {
        setErrorMsg('Email already registered');
        setIsLoading(false);
        return;
      }
      
      const otpCode = generateOTP();
      simulateEmailSend(email, otpCode);
      
      setPendingUser({
        name,
        email,
        password,
        accountType,
      });
      
      setRegistrationStep('verify');
    } catch (error) {
      setErrorMsg('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setErrorMsg('Please enter the complete verification code');
      return;
    }
    
    const otpData = JSON.parse(localStorage.getItem(`otp_${pendingUser.email}`) || '{}');
    
    if (!otpData.code || !otpData.expiresAt) {
      setErrorMsg('Verification code expired. Please try registering again.');
      return;
    }
    
    if (Date.now() > otpData.expiresAt) {
      setErrorMsg('Verification code has expired. Please request a new one.');
      localStorage.removeItem(`otp_${pendingUser.email}`);
      return;
    }
    
    if (enteredOtp !== otpData.code) {
      setErrorMsg('Invalid verification code. Please try again.');
      return;
    }
    
    completeRegistration();
  };

  const completeRegistration = () => {
    setIsLoading(true);
    
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      const newUser = {
        id: Date.now(),
        name: pendingUser.name,
        email: pendingUser.email,
        password: pendingUser.password,
        accountType: pendingUser.accountType,
        createdAt: new Date().toISOString(),
        verified: true
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      localStorage.setItem('currentUser', JSON.stringify({
        email: newUser.email,
        name: newUser.name,
        accountType: newUser.accountType
      }));
      
      localStorage.removeItem(`otp_${pendingUser.email}`);
      
      // Redirect based on account type
      if (newUser.accountType === 'startup') {
        navigate('/StartupDashboard');
      } else {
        navigate('/InvestorDashboard');
      }
    } catch (error) {
      setErrorMsg('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = () => {
    const otpCode = generateOTP();
    simulateEmailSend(pendingUser.email, otpCode);
  };

  if (registrationStep === 'verify') {
    
    return (
      <div className="min-h-screen bg-gradient-to-tr from-white via-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-green-200/20"
              style={{
                width: Math.random() * 60 + 20,
                height: Math.random() * 60 + 20,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        
        <div className={`w-full max-w-md bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl shadow-[0_10px_40px_rgba(0,255,128,0.15)] p-8 transition-transform duration-700 transform ${
          isAnimated ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}>
          <div className="text-center">
            <div className="group mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-green-200 shadow-lg mb-4 transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,128,0.3)]">
              <Mail className="text-green-800 w-6 h-6 group-hover:rotate-12 transition-all duration-300" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Verify Your Email</h2>
            <p className="text-sm text-green-700 mt-2">
              We've sent a verification code to <span className="font-medium">{pendingUser?.email}</span>
            </p>
          </div>

          {errorMsg && (
            <div className="mt-4 flex items-center p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg shadow animate-fade-in">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form className="mt-6 space-y-5" onSubmit={handleVerifyOtp}>
            <div>
              <label className="text-sm font-medium text-gray-700">Verification Code</label>
              <div className="flex justify-between mt-2 space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Enter the 6-digit code sent to your email</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transform hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(0,255,128,0.4)] active:scale-[0.98] transition-all duration-300"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 mx-auto animate-spin" />
              ) : (
                <span className="flex justify-center items-center gap-2">
                  Verify & Complete Registration
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={resendOtp}
              className="text-sm text-green-700 font-medium hover:underline"
            >
              Didn't receive the code? Resend
            </button>
          </div>

          <p className="text-sm text-center text-gray-600 mt-6">
            Wrong email?{' '}
            <button 
              onClick={() => setRegistrationStep('form')}
              className="text-green-700 font-medium hover:underline"
            >
              Go back
            </button>
          </p>
        </div>

        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(5deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-200/20"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      <div className={`w-full max-w-md bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl shadow-[0_10px_40px_rgba(0,255,128,0.15)] p-8 transition-transform duration-700 transform ${
        isAnimated ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        <div className="text-center">
          <div className="group mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-green-200 shadow-lg mb-4 transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,128,0.3)]">
            <UserPlus className="text-green-800 w-6 h-6 group-hover:rotate-12 transition-all duration-300" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Create Your Account</h2>
          <p className="text-sm text-green-700 mt-2">Join our platform and start your journey</p>
        </div>

        {errorMsg && (
          <div className="mt-4 flex items-center p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg shadow animate-fade-in">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleChange({ target: { name: 'accountType', value: 'startup' } })}
              className={`group py-3 px-4 text-sm font-semibold rounded-lg border transition-all duration-300 transform flex flex-col items-center justify-center ${
                formData.accountType === 'startup'
                  ? 'bg-green-600 text-white shadow-md scale-105'
                  : 'bg-white text-green-700 border-green-300 hover:border-green-500 hover:bg-green-50 hover:shadow-lg'
              }`}
            >
              <Building2 className="w-5 h-5 mb-1" />
              <span>Startup</span>
            </button>
            <button
              type="button"
              onClick={() => handleChange({ target: { name: 'accountType', value: 'investor' } })}
              className={`group py-3 px-4 text-sm font-semibold rounded-lg border transition-all duration-300 transform flex flex-col items-center justify-center ${
                formData.accountType === 'investor'
                  ? 'bg-green-600 text-white shadow-md scale-105'
                  : 'bg-white text-green-700 border-green-300 hover:border-green-500 hover:bg-green-50 hover:shadow-lg'
              }`}
            >
              <Briefcase className="w-5 h-5 mb-1" />
              <span>Investor</span>
            </button>
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
            disabled={isLoading}
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transform hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(0,255,128,0.4)] active:scale-[0.98] transition-all duration-300"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 mx-auto animate-spin" />
            ) : (
              <span className="flex justify-center items-center gap-2">
                Create Account
                <ArrowRight className="w-4 w-4" />
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

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Register;