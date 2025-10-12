import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
all pages */}
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
                 <Route path="/Terms"element={<Terms />} />
          <Route path="/Privacypolicy"element={<Privacypolicy />} />  


            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
   
  );
}

export default App;
