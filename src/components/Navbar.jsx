import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import {
  Menu,
  X,
  User,
  Briefcase,
  Phone,
  Home,
  LogIn,
  UserPlus,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);

  const dashboardRef = useRef(null);
  const accountRef = useRef(null);

  // Scroll + click-outside handlers
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (
        dashboardRef.current &&
        !dashboardRef.current.contains(event.target)
      ) {
        setIsDashboardDropdownOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    // initialize scroll state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hideOnRoutes = ["/Login", "/Register"];
  if (hideOnRoutes.includes(location.pathname)) return null;

  // Navigation items
  const navItems = [
    { path: "/", label: "Home", icon: <Home size={16} /> },
    { path: "/about", label: "About", icon: <Briefcase size={16} /> },
    { path: "/contact", label: "Contact", icon: <Phone size={16} /> },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleDashboardDropdown = () =>
    setIsDashboardDropdownOpen(!isDashboardDropdownOpen);

  const handleDashboardOptionClick = (path) => {
    navigate(path);
    setIsDashboardDropdownOpen(false);
    closeMenu();
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            onMouseEnter={() => setHoveredItem("logo")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <motion.div
              className="relative"
              animate={{
                rotate: hoveredItem === "logo" ? [0, 10, -10, 5, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </motion.div>

            <motion.span
              className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent"
              animate={{
                x: hoveredItem === "logo" ? [0, 3, -3, 1, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              Nexus
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                  location.pathname === item.path
                    ? "text-emerald-600 font-medium"
                    : "text-slate-700 hover:text-emerald-600"
                }`}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.icon}
                <span>{item.label}</span>

                {location.pathname === item.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                    layoutId="navIndicator"
                  />
                )}

                {hoveredItem === item.path && (
                  <motion.div
                    className="absolute inset-0 bg-emerald-50 rounded-lg -z-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}

            {/* Dashboard Dropdown */}
            <div className="relative" ref={dashboardRef}>
              <button
                onClick={toggleDashboardDropdown}
                className={`relative px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                  isDashboardDropdownOpen ||
                  location.pathname.includes("/dashboard")
                    ? "text-emerald-600 font-medium"
                    : "text-slate-700 hover:text-emerald-600"
                }`}
              >
                <User size={16} />
                <span>Dashboard</span>
                <motion.div
                  animate={{ rotate: isDashboardDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </button>

              <AnimatePresence>
                {isDashboardDropdownOpen && (
                  <motion.div
                    className="absolute left-0 mt-2 w-48 origin-top-left rounded-xl bg-white shadow-xl border border-slate-200 overflow-hidden z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="py-2 bg-gradient-to-b from-white to-slate-50">
                      <button
                        onClick={() => handleDashboardOptionClick("/Register")}
                        className="flex items-center w-full px-4 py-3 text-slate-700 hover:bg-emerald-50 group transition-colors"
                      >
                        <Briefcase className="h-5 w-5 text-emerald-600 mr-3 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium text-left">Startups</div>
                          <div className="text-sm text-slate-500">
                            Start your startup
                          </div>
                        </div>
                      </button>

                      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-4"></div>

                      <button
                        onClick={() => handleDashboardOptionClick("/Register")}
                        className="flex items-center w-full px-4 py-3 text-slate-700 hover:bg-emerald-50 group transition-colors"
                      >
                        <User className="h-5 w-5 text-emerald-600 mr-3 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium text-left">Investors</div>
                          <div className="text-sm text-slate-500">
                            Join as investor
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Account Dropdown */}
            <div className="ml-4 flex items-center space-x-3 relative" ref={accountRef}>
              <div
                className="relative group"
                onMouseEnter={() => setIsAccountDropdownOpen(true)}
                onMouseLeave={() => setIsAccountDropdownOpen(false)}
              >
                <motion.button
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 text-white font-medium flex items-center space-x-2 shadow-lg"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <User size={16} />
                  <span>Account</span>
                  <motion.div
                    animate={{ rotate: isAccountDropdownOpen ? 180 : 0 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isAccountDropdownOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl border border-slate-200 overflow-hidden z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="py-1 bg-gradient-to-b from-white to-slate-50">
                        <Link
                          to="/Login"
                          className="flex items-center px-4 py-3 text-slate-700 hover:bg-emerald-50 group transition-colors"
                        >
                          <LogIn className="h-5 w-5 text-emerald-600 mr-3" />
                          <div>
                            <div className="font-medium">Login</div>
                            <div className="text-sm text-slate-500">
                              Access your account
                            </div>
                          </div>
                        </Link>

                        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-4"></div>

                        <Link
                          to="/Register"
                          className="flex items-center px-4 py-3 text-slate-700 hover:bg-emerald-50 group transition-colors"
                        >
                          <UserPlus className="h-5 w-5 text-emerald-600 mr-3" />
                          <div>
                            <div className="font-medium">Register</div>
                            <div className="text-sm text-slate-500">
                              Create new account
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="relative w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="text-slate-700" size={24} />
              ) : (
                <Menu className="text-slate-700" size={24} />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          >
            <motion.div
              className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-24 flex items-center px-6 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span className="ml-3 text-xl font-bold text-slate-900">
                  Nexus
                </span>
              </div>

              <div className="py-6 px-4">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                        location.pathname === item.path
                          ? "bg-emerald-50 text-emerald-600"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                      onClick={closeMenu}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          location.pathname === item.path
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}

                  {/* Dashboard Section (Mobile) */}
                  <div className="px-4 py-3 rounded-xl bg-emerald-50">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                        <User size={16} />
                      </div>
                      <span className="font-medium text-emerald-600">
                        Dashboard
                      </span>
                    </div>

                    <div className="mt-2 ml-11 space-y-2">
                      <button
                        onClick={() =>
                          handleDashboardOptionClick("/startup-registration")
                        }
                        className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-slate-700 hover:bg-emerald-100 transition-colors"
                      >
                        <Briefcase size={16} />
                        <span className="font-medium">Startups</span>
                      </button>

                      <button
                        onClick={() =>
                          handleDashboardOptionClick("/investor-registration")
                        }
                        className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-slate-700 hover:bg-emerald-100 transition-colors"
                      >
                        <User size={16} />
                        <span className="font-medium">Investors</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Auth Buttons (Mobile) */}
                <div className="mt-8 px-4 space-y-4">
                  <Link
                    to="/Login"
                    className="block w-full py-3.5 text-center bg-gradient-to-r from-slate-800 to-slate-900 text-white font-medium rounded-xl shadow-lg flex items-center justify-center space-x-2"
                    onClick={closeMenu}
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </Link>

                  <Link
                    to="/Register"
                    className="block w-full py-3.5 text-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl shadow-lg flex items-center justify-center space-x-2"
                    onClick={closeMenu}
                  >
                    <UserPlus size={18} />
                    <span>Register</span>
                  </Link>
                </div>
              </div>

              {/* Bottom Gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  </motion.nav>
  );
};

export default Navbar;
