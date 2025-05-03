import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const InvestorDetail = () => {
  const { id } = useParams();
  const [investor, setInvestor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestor = async () => {
      const { data, error } = await supabase
        .from("investors")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching investor:", error.message);
      } else {
        setInvestor(data);
      }
      setLoading(false);
    };

    fetchInvestor();
  }, [id]);

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (!investor) return <p className="p-6 text-red-600">Investor not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        {investor.name}
      </h1>
      <p><strong>Email:</strong> {investor.email}</p>
      <p><strong>Focus:</strong> {investor.focus}</p>
      <p><strong>Location:</strong> {investor.location}</p>
      <p><strong>Bio:</strong> {investor.bio}</p>
      <Link to="/dashboard">
  <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
    Back to Dashboard
  </button>
</Link>
    </div>
  );
};

export default InvestorDetail;
