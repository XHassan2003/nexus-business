import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login"
import Register from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Chatbot from "./components/Chatbot";
import Marketsurge from "./components/Marketsurge";
import CursorFollower from './components/CursorFollower';
import InvestorDashboard from "./pages/InvestorDashboard";
import StartupDashboard from "./pages/StartupDashboard";



 

function App() {
  return (
     
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Chatbot/>
          <CursorFollower />
           {/* Floating chatbot button on all pages */}
          <main className="flex-grow bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Marketsurge" element={<Marketsurge />} />
                <Route path="/InvestorDashboard" element={<InvestorDashboard />} />
                  <Route path="/StartupDashboard" element={<StartupDashboard />} />


            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
   
  );
}

export default App;
