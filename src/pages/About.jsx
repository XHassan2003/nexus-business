import React, { useState, useEffect, useRef } from "react";
import {
  Rocket,
  Shield,
  Users,
  Target,
  MessageSquare,
  ArrowUpRight,
  BarChart2,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  CartesianGrid,
} from "recharts";

const About = () => {
  // ===============================
  // Data Arrays
  // ===============================
  const stats = [
    { id: 1, label: "Startups Funded", value: 500, suffix: "+", color: "from-emerald-400 to-teal-500" },
    { id: 2, label: "Total Investment", value: 100, suffix: "M+", color: "from-amber-400 to-orange-500" },
    { id: 3, label: "Success Rate", value: 85, suffix: "%", color: "from-violet-400 to-purple-600" },
    { id: 4, label: "Active Investors", value: 1000, suffix: "+", color: "from-cyan-400 to-blue-500" },
  ];

  const values = [
    {
      icon: Rocket,
      title: "Innovation",
      description: "We embrace new ideas and technologies that help our users connect more effectively.",
      bg: "bg-gradient-to-br from-emerald-50 to-teal-100",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We maintain transparency and honesty in all our operations and communications.",
      bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "We strive to make startup funding accessible to entrepreneurs from all backgrounds.",
      bg: "bg-gradient-to-br from-violet-50 to-purple-100",
    },
    {
      icon: Target,
      title: "Impact",
      description: "We measure our success by the successful partnerships we help create.",
      bg: "bg-gradient-to-br from-cyan-50 to-blue-100",
    },
  ];

  const chartData = Array.from({ length: 7 }, (_, i) => {
    const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i];
    return {
      name: day,
      value: Math.floor(200 + Math.random() * 300),
    };
  });

  // ===============================
  // CountUp Animation
  // ===============================
  const CountUp = ({ end, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const increment = Math.ceil(end / (duration / 16));
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      }, { threshold: 0.2 });

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [end, duration]);

    return (
      <span ref={ref} className="font-mono">
        {count.toLocaleString()}
        {suffix}
      </span>
    );
  };

  // ===============================
  // JSX Layout
  // ===============================
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-16">

        {/* ===============================
            HERO SECTION
        =============================== */}
        <div className="text-center relative z-10 pb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm px-4 py-2 rounded-full mb-6">
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Trusted by Industry Leaders</span>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
            Transforming Vision into{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Market Success
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600">
            Founded in 2023, <strong>Nexus Business</strong> bridges the gap between
            innovative startups and visionary investors through data-driven matchmaking.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <a
              href="/register"
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center"
            >
              Join Platform
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="/demo"
              className="px-8 py-3 bg-white text-slate-900 font-medium rounded-lg border border-slate-200 shadow hover:shadow-md transition-all"
            >
              Request Demo
            </a>
          </div>
        </div>

        {/* ===============================
            STATISTICS SECTION
        =============================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-24">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-slate-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ===============================
            MISSION SECTION
        =============================== */}
        <div className="relative bg-white rounded-3xl shadow-xl p-10 mb-24">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-emerald-500 to-teal-500 rounded-l-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Rocket className="text-emerald-500" /> Our Mission
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              At Nexus Business, our mission is to empower founders and investors alike by providing
              a transparent, AI-driven platform that makes funding seamless, insightful, and impactful.
            </p>
          </div>
        </div>

        {/* ===============================
            MARKET INSIGHT CHART
        =============================== */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-24">
          <div className="flex items-center mb-6">
            <BarChart2 className="text-teal-500 h-6 w-6 mr-2" />
            <h2 className="text-2xl font-bold text-slate-900">Market Growth Insights</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#colorValue)" />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ===============================
            CORE VALUES SECTION
        =============================== */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div
                key={idx}
                className={`${value.bg} rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <value.icon className="h-10 w-10 mx-auto text-emerald-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===============================
            DASHBOARD & COMMUNITY SECTION
        =============================== */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl shadow-xl p-12 mb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="relative z-10 text-center">
            <MessageSquare className="mx-auto h-10 w-10 mb-4 text-emerald-200" />
            <h2 className="text-3xl font-bold mb-4">Join a Thriving Community</h2>
            <p className="max-w-2xl mx-auto text-emerald-100 mb-6">
              Connect with thousands of investors, innovators, and thought-leaders in our secure and dynamic platform.
            </p>
            <a
              href="/community"
              className="inline-flex items-center bg-white text-emerald-700 font-semibold px-6 py-3 rounded-lg shadow hover:scale-105 transition-transform"
            >
              Explore Community
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* ===============================
            CALL TO ACTION
        =============================== */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
            Ready to Transform Your Startup Journey?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Join Nexus Business and be part of a network that accelerates growth, fosters innovation, and builds trust.
          </p>
          <a
            href="/register"
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-transform hover:scale-105"
          >
            Get Started Today
          </a>
        </div>

      </div>
    </div>
  );
};

export default About;
