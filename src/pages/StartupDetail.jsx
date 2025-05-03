import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

const StartupDetail = () => {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartup = async () => {
      const { data, error } = await supabase
        .from("startups")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching startup:", error.message);
      } else {
        setStartup(data);
      }
      setLoading(false);
    };

    fetchStartup();
  }, [id]);

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (!startup) return <p className="p-6 text-red-600">Startup not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        {startup.name}
      </h1>
      <p><strong>Email:</strong> {startup.email}</p>
      <p><strong>Pitch:</strong> {startup.pitch}</p>
      <p><strong>Location:</strong> {startup.location}</p>
      <p><strong>Website:</strong> {startup.website}</p>
      <Link to="/dashboard">
  <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
    Back to Dashboard
  </button>
</Link>
    </div>
    
  );
};

export default StartupDetail;
