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