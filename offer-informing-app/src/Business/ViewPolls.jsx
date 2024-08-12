import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewPolls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/polls/business', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setPolls(response.data);
      setLoading(false);
    })
    .catch(err => {
      setError('Error fetching polls.');
      setLoading(false);
      console.error(err);
    });
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">My Polls</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.length > 0 ? (
          polls.map((poll) => (
            <div key={poll._id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-2">{poll.question}</h2>
              <ul className="list-disc pl-5">
                {poll.options.map((option, index) => (
                  <li key={index} className="text-gray-700 mb-2">
                    {option.text} - {option.votes} votes
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No polls available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewPolls;
