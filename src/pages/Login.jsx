import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle, Loader2, Volume2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [voicePlayed, setVoicePlayed] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('Initializing voice system...');
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { signInUser, isLoading } = useAuth();

  // AI Voice Greeting Effect with debugging
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
        
        // Debug: Log all available voices
        console.log('Available voices:', voices);

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
            "Welcome back sir. Please login and enter your profile."
          );
          
          utterance.voice = selectedVoice;
          utterance.rate = 0.95;
          utterance.pitch = 1.0;
          utterance.volume = 0.8;
          
          // Add event listeners for debugging
          utterance.onstart = () => {
            setVoiceStatus('Voice started');
            console.log('Voice playback started');
          };
          
          utterance.onend = () => {
            setVoiceStatus('Voice completed');
            setVoicePlayed(true);
          };
          
          utterance.onerror = (event) => {
            setVoiceStatus(`Error: ${event.error}`);
            console.error('Voice error:', event);
          };

          // Speak after short delay
          setTimeout(() => {
            try {
              window.speechSynthesis.speak(utterance);
            } catch (e) {
              setVoiceStatus(`Speak error: ${e.message}`);
              console.error('Speak error:', e);
            }
          }, 1500);
        } else {
          setVoiceStatus('No suitable voices found');
        }
      } catch (error) {
        setVoiceStatus(`Error: ${error.message}`);
        console.error("Voice error:", error);
      }
    };

    // Voice loading logic
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

    // Cleanup
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

  // Existing mouse effect for 3D card (unchanged)
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

  // Existing form handling functions (unchanged)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const { success, accountType, error } = await signInUser(email, password);

    if (!success) {
      setErrorMsg(error?.message || 'Login failed');
    } else {
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      if (accountType === 'startup' || accountType === 'investor') {
        navigate('/dashboard');
      } else {
        setErrorMsg('Unknown account type.');
      }
    }
  };

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
     
      
      {/* Voice test button */}
     

      {/* Floating bubbles background */}
     
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
      </div>
    </div>
  );
};

export default Login;