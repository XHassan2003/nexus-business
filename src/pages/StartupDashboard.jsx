import React, { useState} from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Briefcase,
  Calendar,
  Target,
  Award,
  Zap,
  PieChart,
  Activity,
  ArrowUpRight,
  CheckCircle,
  Edit,
  Plus,
  X,
  Save,
  Upload,
  Building,
  MapPin,
  Globe,
  Mail,
  Phone,
  Link,
  Eye,
} from "lucide-react";

const StartupDashboard = () => {
  const [startupData, setStartupData] = useState({
    name: "TechNova",
    industry: "Artificial Intelligence",
    fundingStage: "Seed",
    fundingGoal: "$500,000",
    valuation: "$5M",
    teamSize: 12,
    location: "San Francisco, CA",
    website: "https://technova.com",
    contactEmail: "info@technova.com",
    contactPhone: "+1 234 567 890",
    description:
      "TechNova is an AI startup focused on developing adaptive intelligence platforms that empower businesses with data-driven automation.",
    raised: "$160,000",
    expectedROI: "18%",
    matchScore: 87,
    daysLeft: 32,
  });

  const [formData, setFormData] = useState(startupData);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // ✅ Handle Edit Toggle
  const handleEdit = () => {
    if (isEditing) {
      setStartupData(formData); // Save changes
    }
    setIsEditing(!isEditing);
  };

  // ✅ Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Add New Startup Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`New startup "${formData.name}" added successfully!`);
    setStartupData(formData);
    setShowForm(false);
  };

  // ✅ Calculate funding progress percentage


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Startup Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your startup profile and track investor interest
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
              >
                {showForm ? (
                  <X className="h-4 w-4 mr-1" />
                ) : (
                  <Plus className="h-4 w-4 mr-1" />
                )}
                {showForm ? "Cancel" : "Add New"}
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
              >
                {isEditing ? (
                  <Save className="h-4 w-4 mr-1" />
                ) : (
                  <Edit className="h-4 w-4 mr-1" />
                )}
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          </div>
        </header>

        {/* Add New Startup Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Add Another Startup
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "name",
                  "industry",
                  "fundingStage",
                  "fundingGoal",
                  "valuation",
                  "teamSize",
                  "location",
                  "website",
                  "contactEmail",
                  "contactPhone",
                ].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                    >
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      id={field}
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300"
                >
                  Submit Startup Details
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Example Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Investor Views</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">248</p>
                <p className="text-green-600 text-xs mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12% this week
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          {/* Add 3 more cards... (as in your code) */}
        </div>

        {/* Profile + Sidebar */}
        {/* (Keep your profile and sidebar sections here, same as your original) */}
      </div>
    </div>
  );
};

export default StartupDashboard;
