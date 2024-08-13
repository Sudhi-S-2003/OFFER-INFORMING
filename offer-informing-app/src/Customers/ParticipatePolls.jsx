import { useEffect, useState } from 'react';
import axios from 'axios';

// Loading component
const Loading = () => (
  <div className="text-center py-4">Loading...</div>
);

// Alert component
const Alert = ({ status, children }) => (
  <div className={`p-4 mb-4 text-white ${status === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-lg`}>
    {children}
  </div>
);

// ParticipatePolls component
const ParticipatePolls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Fetch polls from the API with authorization header
    axios.get('http://localhost:5000/api/polls', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      setPolls(response.data);
      setLoading(false);
    })
    .catch((error) => {
      setError('Failed to fetch polls');
      setLoading(false);
    });
  }, []);

  const handleVote = (pollId, optionId) => {
    const token = localStorage.getItem('token');

    // Post vote to the API with authorization header
    axios.post(`http://localhost:5000/api/polls/vote/${pollId}`, { optionId }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      alert('Vote submitted successfully');
      // Update local state with new poll data
      setPolls(polls.map((poll) =>
        poll._id === pollId
          ? { ...poll, options: poll.options.map(option =>
              option._id === optionId
                ? { ...option, votes: option.votes + 1 }
                : option
            )}
          : poll
      ));
    })
    .catch((error) => {
      alert('Failed to submit vote');
    });
  };

  return (
    <div className="container mx-auto p-4">
      {loading && <Loading />}
      {error && <Alert status="error">{error}</Alert>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {polls.map((poll) => (
          <div key={poll._id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold">{poll.question}</h2>
            <div className="mt-4">
              {poll.options.map((option) => (
                <button
                  key={option._id}
                  className="btn btn-outline btn-sm m-1 border border-gray-300 rounded-lg py-2 px-4 text-gray-700 hover:bg-gray-200"
                  onClick={() => handleVote(poll._id, option._id)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipatePolls;
