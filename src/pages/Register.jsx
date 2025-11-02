import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  Loader2,
  Building2,
  Briefcase,
} from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState('form');
  const [pendingUser, setPendingUser] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputRefs = useRef([]);

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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    };
    localStorage.setItem(`otp_${email}`, JSON.stringify(otpData));
    alert(`DEMO: Your verification code is ${otpCode}`);
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

    await new Promise((resolve) => setTimeout(resolve, 1000));

try {
  // Safely get existing users list
  const existingUsers = (() => {
    try {
      return JSON.parse(localStorage.getItem('users')) || [];
    } catch {
      return [];
    }
  })();

  // Check for duplicate email
  const emailExists = existingUsers.some((user) => user.email === email);
  if (emailExists) {
    setErrorMsg('Email already registered');
    return;
  }

  // Generate and send OTP
  const otpCode = generateOTP();
  simulateEmailSend(email, otpCode);

  // Temporarily save user info until OTP verified
  setPendingUser({ name, email, password, accountType });

  // Move to verification step
  setRegistrationStep('verify');
} catch (error) {
  console.error('Error during registration:', error);
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

    const storedOtpData = JSON.parse(localStorage.getItem(`otp_${pendingUser.email}`) || '{}');

    if (!storedOtpData || Date.now() > storedOtpData.expiresAt) {
      setErrorMsg('Verification code expired. Please register again.');
      setRegistrationStep('form');
      return;
    }

    if (enteredOtp !== storedOtpData.code) {
      setErrorMsg('Incorrect verification code');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    existingUsers.push(pendingUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    localStorage.removeItem(`otp_${pendingUser.email}`);

    alert('Account created successfully!');
    navigate('/login');
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 py-8 transition-all duration-700 ${
        isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-green-200">
        {registrationStep === 'form' ? (
          <>
            <div className="flex justify-center mb-6">
              <UserPlus className="w-12 h-12 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Create an Account
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Join as a startup or investor to explore new opportunities
            </p>

            {errorMsg && (
              <div className="flex items-center text-red-600 mb-4 text-sm bg-red-50 p-2 rounded-lg">
                <AlertCircle className="w-4 h-4 mr-2" /> {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
     {[
  { id: 'name', label: 'Full Name', type: 'text', icon: User, placeholder: 'John Doe' },
  { id: 'email', label: 'Email', type: 'email', icon: Mail, placeholder: 'you@example.com' },
  { id: 'password', label: 'Password', type: 'password', icon: Lock, placeholder: '********' },
  { id: 'confirmPassword', label: 'Confirm Password', type: 'password', icon: Lock, placeholder: '********' },
].map(({ id, label, type, icon, placeholder }) => (
  <div key={id}>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <div className="relative">
      {React.createElement(icon, { className: "absolute left-3 top-2.5 text-green-600 w-5 h-5" })}
      <input
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

              <div>
                <label className="block text-gray-700 font-medium mb-1">Account Type</label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="w-full pl-3 pr-3 py-2 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700"
                >
                  <option value="startup">Startup</option>
                  <option value="investor">Investor</option>
                </select>
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
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Verify Your Email</h2>
            <p className="text-center text-gray-600 mb-6">
              Enter the 6-digit code we sent to <strong>{pendingUser.email}</strong>
            </p>

            {errorMsg && (
              <div className="flex items-center text-red-600 mb-4 text-sm bg-red-50 p-2 rounded-lg">
                <AlertCircle className="w-4 h-4 mr-2" /> {errorMsg}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="flex flex-col items-center space-y-6">
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-10 h-12 text-center text-xl border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transform hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(0,255,128,0.4)] active:scale-[0.98] transition-all duration-300"
              >
                Verify Code
              </button>
            </form>
          </>
        )}
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
