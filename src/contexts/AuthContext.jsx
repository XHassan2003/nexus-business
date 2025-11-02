import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// Create the context
const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check session & listen for auth changes
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error('Error getting session:', error);
      setSession(data?.session || null);
      setUser(data?.session?.user || null);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ Sign up new user & insert profile
  const signUpNewUser = async (email, password, name, accountType) => {
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) return { success: null, error: signUpError.message };

      const user = signUpData?.user;
      if (!user) return { success: null, error: 'User not returned after signup' };

      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: user.id,
          name,
          email,
          account_type: accountType,
        },
      ]);

      if (profileError) return { success: null, error: profileError.message };

      setUser(user);
      return { success: user, error: null };
    } catch (err) {
      console.error('Sign-up error:', err);
      return { success: null, error: err.message };
    }
  };

  // ✅ Sign in user & get profile type
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { success: false, error: error.message };

      setSession(data.session);
      setUser(data.user);

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('account_type')
        .eq('id', data.user.id)
        .single();

      if (profileError) return { success: false, error: profileError.message };

      return { success: true, accountType: profile.account_type };
    } catch (error) {
      console.error('Sign-in error:', error);
      return { success: false, error: error.message };
    }
  };

  // ✅ Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Sign-out error:', error);
    setUser(null);
    setSession(null);
  };

  // ✅ Provide auth context to children
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUpNewUser,
        signInUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook for easy access
export const useAuth = () => useContext(AuthContext);
