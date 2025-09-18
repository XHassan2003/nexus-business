import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, Loader2, Volume2 } from 'lucide-react';

const StartupDashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Startup Dashboard</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Create New Project</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Projects</h2>
          <p className="text-gray-600">Manage your startup projects and track progress</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Investor Connections</h2>
          <p className="text-gray-600">Connect with potential investors for your startup</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Resources</h2>
          <p className="text-gray-600">Access tools and resources for your startup journey</p>
        </div>
      </div>
    </div>
  </div>
);

const InvestorDashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Investor Dashboard</h1>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">Find Startups</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
          <p className="text-gray-600">View and manage your investment portfolio</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Startup Matches</h2>
          <p className="text-gray-600">Discover promising startups that match your criteria</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Market Trends</h2>
          <p className="text-gray-600">Stay updated with the latest market trends and insights</p>
        </div>
      </div>
    </div>
  </div>
);

// Login Component
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [voicePlayed, setVoicePlayed] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('Initializing voice system...');
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  // Initialize demo accounts if none exist
  useEffect(() => {
    const existingUsers = localStorage.getItem('users');
    if (!existingUsers) {
      const demoUsers = [
        { 
          id: 1, 
          name: 'Demo User', 
          email: 'demo@example.com', 
          password: 'password123', 
          accountType: 'startup',
          createdAt: new Date().toISOString(),
          verified: true
        },
        { 
          id: 2, 
          name: 'Investor User', 
          email: 'investor@example.com', 
          password: 'password123', 
          accountType: 'investor',
          createdAt: new Date().toISOString(),
          verified: true
        }
      ];
      localStorage.setItem('users', JSON.stringify(demoUsers));
    }
  }, []);

  // AI Voice Greeting Effect
  useEffect(() => {
    const playWelcomeVoice = () => {
      if (voicePlayed) return;
      
      try {
        if (!window.speechSynthesis) {
          setVoiceStatus('Browser does not support speech synthesis');
          return;
        }

        const voices = window.speechSynthesis.getVoices();
        setVoiceStatus(`Found ${voices.length} voices`);
        
        const professionalVoices = voices.filter(voice => 
          voice.name.includes('Google') || 
          voice.name.includes('Samantha') ||
          voice.name.includes('Daniel') ||
          voice.name.includes('Karen') ||
          voice.name.includes('Microsoft David') ||
          voice.lang.includes('en')
        );
        
        const selectedVoice = professionalVoices[0] || voices[0];
        
        if (selectedVoice) {
          setVoiceStatus(`Selected voice: ${selectedVoice.name}`);
          
          const utterance = new SpeechSynthesisUtterance(
            "Welcome back. Please login to access your dashboard."
          );
          
          utterance.voice = selectedVoice;
          utterance.rate = 0.95;
          utterance.pitch = 1.0;
          utterance.volume = 0.8;
          
          utterance.onstart = () => {
            setVoiceStatus('Voice started');
          };
          
          utterance.onend = () => {
            setVoiceStatus('Voice completed');
            setVoicePlayed(true);
          };
          
          utterance.onerror = (event) => {
            setVoiceStatus(`Error: ${event.error}`);
          };

          setTimeout(() => {
            try {
              window.speechSynthesis.speak(utterance);
            } catch (e) {
              setVoiceStatus(`Speak error: ${e.message}`);
            }
          }, 1500);
        } else {
          setVoiceStatus('No suitable voices found');
        }
      } catch (error) {
        setVoiceStatus(`Error: ${error.message}`);
      }
    };

    if (window.speechSynthesis) {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        playWelcomeVoice();
      } else {
        setVoiceStatus('Waiting for voices to load...');
        window.speechSynthesis.onvoiceschanged = () => {
          setVoiceStatus('Voices loaded');
          playWelcomeVoice();
        };
      }
    } else {
      setVoiceStatus('Speech synthesis not supported');
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [voicePlayed]);

  // Test voice function
  const testVoice = () => {
    if (!window.speechSynthesis) {
      setVoiceStatus('Speech synthesis not supported');
      return;
    }
    
    try {
      const utterance = new SpeechSynthesisUtterance("Testing voice system");
      utterance.volume = 0.8;
      utterance.rate = 1.0;
      
      utterance.onstart = () => setVoiceStatus('Test voice started');
      utterance.onend = () => setVoiceStatus('Test voice completed');
      utterance.onerror = (e) => setVoiceStatus(`Test error: ${e.error}`);
      
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      setVoiceStatus(`Test error: ${error.message}`);
    }
  };

  // 3D card effect
  useEffect(() => {
    setIsAnimated(true);
    
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = (x - centerX) / 25;
      const rotateX = (centerY - y) / 25;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      if (cardRef.current) {
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      }
    };
    
    const card = cardRef.current;
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user with matching credentials
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Check if user is verified
        if (!user.verified) {
          setErrorMsg('Please verify your email before logging in.');
          setIsLoading(false);
          return;
        }
        
        // Login successful
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        // Store current session
        localStorage.setItem('currentUser', JSON.stringify({
          email: user.email,
          name: user.name,
          accountType: user.accountType
        }));
        
        // Navigate based on account type
        if (user.accountType === 'startup') {
          navigate('/startup-dashboard');
        } else if (user.accountType === 'investor') {
          navigate('/investor-dashboard');
        } else {
          setErrorMsg('Unknown account type.');
        }
      } else {
        setErrorMsg('Invalid email or password.');
      }
    } catch (error) {
      setErrorMsg('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check for remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-green-50 to-green-100 flex items-center justify-center p-4">
      {/* Voice status panel */}
      <div className="fixed top-4 right-4 bg-black/80 text-white text-xs p-2 rounded-md opacity-70 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <Volume2 size={14} />
          <span>{voiceStatus}</span>
        </div>
      </div>
      
      {/* Voice test button */}
      <button 
        onClick={testVoice}
        className="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 transition-colors"
        title="Test voice system"
      >
        <Volume2 size={18} />
      </button>

      {/* Floating bubbles background */}
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
      
      <div 
        ref={cardRef}
        className={`max-w-md w-full bg-white p-10 rounded-2xl shadow-2xl transition-all duration-700 ${isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} 
        border border-white/80 backdrop-blur-sm bg-gradient-to-br from-white to-gray-50
        transform-gpu`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.25), 0 0 15px rgba(16, 185, 129, 0.1)',
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-green-400/10 blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-cyan-400/10 blur-xl"></div>
        
        <div 
          className="text-center mb-8 relative"
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-green-500/10 blur-lg"></div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 relative">
            <span className="text-3xl font-bold text-gray-800 tracking-tight">
              Welcome back
            </span>
          </h2>
          <p className="text-sm text-green-700 mt-2">
            Please sign in to your account
          </p>
        </div>

        {errorMsg && (
          <div 
            className="flex items-center p-4 mb-6 text-sm text-red-800 rounded-xl bg-red-50 border border-red-100 animate-fade-in shadow-inner"
            role="alert"
            style={{ transform: 'translateZ(20px)' }}
          >
            <AlertCircle className="inline w-5 h-5 mr-2 flex-shrink-0" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        <form 
          onSubmit={handleSubmit}
          className={`space-y-6 transition-all duration-700 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="space-y-5">
            <div 
              className="relative group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <label 
                htmlFor="email-address" 
                className="block text-sm font-medium text-gray-700 mb-1 ml-1 transition-all duration-300 group-hover:text-green-600 group-focus-within:text-green-600"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 group-hover:scale-110">
                  <Mail className="h-5 w-5 text-gray-400 group-hover:text-green-500 group-focus-within:text-green-500 transition-colors" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:shadow-md hover:border-green-300 bg-white/70 backdrop-blur-sm group-hover:bg-white"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ transform: 'translateZ(10px)' }}
                />
                <div className="absolute inset-0 rounded-xl bg-green-500/5 -z-10 group-hover:opacity-100 opacity-0 blur-md transition-opacity duration-300"></div>
              </div>
            </div>
            
            <div 
              className="relative group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-1 ml-1 transition-all duration-300 group-hover:text-green-600 group-focus-within:text-green-600"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 group-hover:scale-110">
                  <Lock className="h-5 w-5 text-gray-400 group-hover:text-green-500 group-focus-within:text-green-500 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:shadow-md hover:border-green-300 bg-white/70 backdrop-blur-sm group-hover:bg-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ transform: 'translateZ(10px)' }}
                />
                <div className="absolute inset-0 rounded-xl bg-green-500/5 -z-10 group-hover:opacity-100 opacity-0 blur-md transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          <div 
            className="flex items-center justify-between"
            style={{ transform: 'translateZ(15px)' }}
          >
            <div className="flex items-center group">
              <div className="relative flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-all duration-300 group-hover:scale-110 appearance-none checked:bg-green-500 checked:border-transparent focus:outline-none"
                />
                <div className="absolute inset-0 bg-green-500/10 rounded group-hover:opacity-30 opacity-0 transition-opacity -z-10"></div>
              </div>
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link 
                to="/forgot-password" 
                className="font-medium text-green-600 hover:text-green-500 transition-all duration-300 hover:underline hover:underline-offset-4 group"
              >
                <span className="group-hover:translate-x-0.5 transition-transform inline-block">Forgot password?</span>
              </Link>
            </div>
          </div>

          <div
            style={{ transformStyle: 'preserve-3d' }}
          >
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl active:scale-[0.98] overflow-hidden"
              style={{ transform: 'translateZ(20px)' }}
            >
              {/* Animated background */}
              <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 group-hover:from-green-700 group-hover:to-green-600 transition-all duration-500"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              
              {/* Shine effect */}
              <span className="absolute inset-0 overflow-hidden">
                <span className="absolute -inset-y-full -left-20 w-40 bg-gradient-to-r from-white/30 via-white/0 to-white/30 opacity-40 group-hover:animate-shine"></span>
              </span>
              
              {/* Button content */}
              <span className="relative z-10 flex items-center">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span>Sign in</span>
                    <span className="flex justify-center items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </>
                )}
              </span>
            </button>
          </div>
        </form>

        <div 
          className={`mt-8 text-center transition-all duration-700 delay-200 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: 'translateZ(15px)' }}
        >
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="font-medium text-green-600 hover:text-green-500 transition-all duration-300 hover:underline hover:underline-offset-4 group inline-flex items-center"
            >
              <span className="group-hover:translate-x-0.5 transition-transform">Create one now</span>
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </p>
        </div>

        {/* Demo credentials hint */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600">
          <p className="font-medium mb-1">Demo credentials:</p>
          <p>Startup: demo@example.com / password123</p>
          <p>Investor: investor@example.com / password123</p>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes shine {
            to { left: 100%; }
          }
        `}
      </style>
    </div>
  );
};



// App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<div>Register Page - Implement your registration component here</div>} />
        <Route path="/StartupDashboard" element={<StartupDashboard />} />
        <Route path="/InvestorDashboard" element={<InvestorDashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;